import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export type SessionType = 'guest' | 'authenticated';
export type UserType = 'candidate' | 'company';

interface SessionState {
  sessionType: SessionType;
  userType: UserType | null;
  setSession: (sessionType: SessionType, userType?: UserType) => void;
  clearSession: () => void;
  isAuthenticated: () => boolean;
  isGuest: () => boolean;
  _hasHydrated: boolean;
  setHasHydrated: (state: boolean) => void;
}

export const useSessionStore = create<SessionState>()(
  persist(
    (set, get) => ({
      sessionType: 'guest',
      userType: null,
      _hasHydrated: false,
      
      setSession: (sessionType: SessionType, userType?: UserType) => {
        set({ 
          sessionType, 
          userType: sessionType === 'authenticated' ? userType || null : null 
        });
      },
      
      clearSession: () => {
        set({ sessionType: 'guest', userType: null });
      },
      
      isAuthenticated: () => {
        return get().sessionType === 'authenticated';
      },
      
      isGuest: () => {
        return get().sessionType === 'guest';
      },

      setHasHydrated: (state: boolean) => {
        set({ _hasHydrated: state });
      }
    }),
    {
      name: 'session-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ 
        sessionType: state.sessionType, 
        userType: state.userType 
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
); 