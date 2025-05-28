import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { UserService, RegisteredUser, UserData } from '@/lib/userService';

interface UserState {
  currentUser: RegisteredUser | null;
  isLoading: boolean;
  error: string | null;

  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (userData: UserData) => Promise<boolean>;
  
  updateUser: (updatedData: Partial<UserData>) => Promise<boolean>;
  refreshUser: () => void;
  clearError: () => void;
  
  // Estado de inicialização
  initialize: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      // Estado inicial
      currentUser: null,
      isLoading: false,
      error: null,

      // Inicializar store com dados do localStorage
      initialize: () => {
        const user = UserService.getCurrentUser();
        set({ currentUser: user });
      },

      // Login do usuário
      login: async (email: string, password: string) => {
        set({ isLoading: true, error: null });
        
        try {
          const result = await UserService.loginUser(email, password);
          
          if (result.success && result.user) {
            set({ 
              currentUser: result.user, 
              isLoading: false,
              error: null 
            });
            return true;
          } else {
            set({ 
              error: result.error || 'Erro no login',
              isLoading: false 
            });
            return false;
          }
        } catch {
          set({ 
            error: 'Erro interno do servidor',
            isLoading: false 
          });
          return false;
        }
      },

      // Logout do usuário
      logout: () => {
        UserService.logout();
        set({ 
          currentUser: null, 
          error: null 
        });
      },

      // Registro de novo usuário
      register: async (userData: UserData) => {
        set({ isLoading: true, error: null });
        
        try {
          const result = await UserService.registerUser(userData);
          
          if (result.success && result.user) {
            set({ 
              currentUser: result.user, 
              isLoading: false,
              error: null 
            });
            return true;
          } else {
            set({ 
              error: result.error || 'Erro no registro',
              isLoading: false 
            });
            return false;
          }
        } catch {
          set({ 
            error: 'Erro interno do servidor',
            isLoading: false 
          });
          return false;
        }
      },

      // Atualizar dados do usuário
      updateUser: async (updatedData: Partial<UserData>) => {
        const { currentUser } = get();
        
        if (!currentUser) {
          set({ error: 'Usuário não está logado' });
          return false;
        }

        set({ isLoading: true, error: null });
        
        try {
          const result = UserService.updateUser(currentUser.id, updatedData);
          
          if (result.success && result.user) {
            set({ 
              currentUser: result.user, 
              isLoading: false,
              error: null 
            });
            return true;
          } else {
            set({ 
              error: result.error || 'Erro ao atualizar usuário',
              isLoading: false 
            });
            return false;
          }
        } catch {
          set({ 
            error: 'Erro interno do servidor',
            isLoading: false 
          });
          return false;
        }
      },

      // Atualizar dados do usuário atual do localStorage
      refreshUser: () => {
        const user = UserService.getCurrentUser();
        set({ currentUser: user });
      },

      // Limpar erro
      clearError: () => {
        set({ error: null });
      },
    }),
    {
      name: 'user-store',
      // Apenas persistir o currentUser, não o estado de loading/error
      partialize: (state) => ({ currentUser: state.currentUser }),
    }
  )
);

// Hook para verificar se o usuário está logado
export const useIsAuthenticated = () => {
  const currentUser = useUserStore((state) => state.currentUser);
  return !!currentUser;
};

// Hook para obter dados específicos do usuário
export const useUserData = () => {
  const currentUser = useUserStore((state) => state.currentUser);
  return {
    user: currentUser,
    personalData: currentUser?.personalData,
    experiences: currentUser?.experiences || [],
    education: currentUser?.education || [],
    professionalSummary: currentUser?.professionalSummary || '',
  };
}; 