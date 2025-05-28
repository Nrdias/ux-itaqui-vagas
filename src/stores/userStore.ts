import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { useSessionStore } from './sessionStore';
import { User } from '@/types/user';

interface UserState {
  user: User | null;
  isLoggedIn: boolean;
  setUser: (user: User) => void;
  clearUser: () => void;
  updateUser: (updates: Partial<User>) => void;
  initializeFromStorage: () => void;
  _hasHydrated: boolean;
  setHasHydrated: (state: boolean) => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      user: null,
      isLoggedIn: false,
      _hasHydrated: false,
      
      setUser: (user: User) => {
        set({ user, isLoggedIn: true });
        // Atualiza a sessão quando o usuário faz login
        useSessionStore.getState().setSession('authenticated', user.type);
      },
      
      clearUser: () => {
        set({ user: null, isLoggedIn: false });
        // Limpa a sessão quando o usuário faz logout
        useSessionStore.getState().clearSession();
      },
      
      updateUser: (updates: Partial<User>) => {
        const currentUser = get().user;
        if (currentUser) {
          const updatedUser = { ...currentUser, ...updates };
          set({ user: updatedUser });
          // Atualiza a sessão se o tipo de usuário mudou
          if (updates.type) {
            useSessionStore.getState().setSession('authenticated', updates.type);
          }
        }
      },
      
      initializeFromStorage: () => {
        // Esta função será chamada para sincronizar com localStorage se necessário
        if (typeof window === 'undefined') return;
        
        // Verifica se já foi inicializado para evitar loops
        const currentState = get();
        if (currentState.user && currentState.isLoggedIn) {
          return; // Já inicializado
        }
        
        try {
          const storedUser = localStorage.getItem('currentUser');
          if (storedUser) {
            const user = JSON.parse(storedUser);
            // Verifica se o usuário tem as propriedades mínimas necessárias
            if (user && user.id && user.email && user.name) {
              set({ user, isLoggedIn: true });
              // NÃO atualiza a sessão aqui - deixa a sessionStore gerenciar seu próprio estado
            } else {
              localStorage.removeItem('currentUser');
            }
          }
        } catch (error) {
          console.error('Erro ao carregar usuário do localStorage:', error);
          localStorage.removeItem('currentUser');
        }
      },

      setHasHydrated: (state: boolean) => {
        set({ _hasHydrated: state });
      }
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ 
        user: state.user, 
        isLoggedIn: state.isLoggedIn 
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
); 