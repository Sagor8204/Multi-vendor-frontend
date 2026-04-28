import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '@/types/api/auth';
import { clearStoredTokens } from '@/lib/auth/token';

interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    setUser: (user: User | null) => void;
    clearAuth: () => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            isAuthenticated: false,
            setUser: (user) => set({ user, isAuthenticated: !!user }),
            clearAuth: () => {
                clearStoredTokens();
                set({ user: null, isAuthenticated: false });
            },
            logout: () => {
                clearStoredTokens();
                set({ user: null, isAuthenticated: false });
            },
        }),
        {
            name: 'auth-storage',
        }
    )
);
