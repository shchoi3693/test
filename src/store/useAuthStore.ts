import { create } from 'zustand';

interface AuthState {
  userId: string | null;
  isInitialized: boolean;
  setUserId: (id: string | null) => void;
  setInitialized: (val: boolean) => void;
}

export const useAuthStore = create<AuthState>(set => ({
  userId: null,
  isInitialized: false,
  setUserId: id => set({ userId: id }),
  setInitialized: val => set({ isInitialized: val }),
}));
