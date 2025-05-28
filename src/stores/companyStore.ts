import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { useSessionStore } from './sessionStore';
import { Company } from '@/types/company';

interface CompanyState {
  company: Company | null;
  isLoggedIn: boolean;
  setCompany: (company: Company) => void;
  clearCompany: () => void;
  updateCompany: (updates: Partial<Company>) => void;
  initializeFromStorage: () => void;
  _hasHydrated: boolean;
  setHasHydrated: (state: boolean) => void;
}

export const useCompanyStore = create<CompanyState>()(
  persist(
    (set, get) => ({
      company: null,
      isLoggedIn: false,
      _hasHydrated: false,
      
      setCompany: (company: Company) => {
        set({ company, isLoggedIn: true });
        // Atualiza a sessão quando a empresa faz login
        useSessionStore.getState().setSession('authenticated', 'company');
      },
      
      clearCompany: () => {
        set({ company: null, isLoggedIn: false });
        // Limpa a sessão quando a empresa faz logout
        useSessionStore.getState().clearSession();
      },
      
      updateCompany: (updates: Partial<Company>) => {
        const currentCompany = get().company;
        if (currentCompany) {
          const updatedCompany = { ...currentCompany, ...updates };
          set({ company: updatedCompany });
        }
      },
      
      initializeFromStorage: () => {
        // Esta função será chamada para sincronizar com localStorage se necessário
        if (typeof window === 'undefined') return;
        
        // Verifica se já foi inicializado para evitar loops
        const currentState = get();
        if (currentState.company && currentState.isLoggedIn) {
          return; // Já inicializado
        }
        
        try {
          const storedCompany = localStorage.getItem('currentCompany');
          if (storedCompany) {
            const company = JSON.parse(storedCompany);
            // Verifica se a empresa tem as propriedades mínimas necessárias
            if (company && company.id && company.email && company.companyName) {
              set({ company, isLoggedIn: true });
              // NÃO atualiza a sessão aqui - deixa a sessionStore gerenciar seu próprio estado
            } else {
              localStorage.removeItem('currentCompany');
            }
          }
        } catch (error) {
          console.error('Erro ao carregar empresa do localStorage:', error);
          localStorage.removeItem('currentCompany');
        }
      },

      setHasHydrated: (state: boolean) => {
        set({ _hasHydrated: state });
      }
    }),
    {
      name: 'company-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ 
        company: state.company, 
        isLoggedIn: state.isLoggedIn 
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
); 