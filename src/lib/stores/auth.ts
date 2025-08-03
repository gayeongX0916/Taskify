import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  accessToken: string | null;
  userId: number | null;
  setAuth: (token: string, userId: number) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      userId: null,

      setAuth: (token, userId) =>
        set(() => ({
          accessToken: token,
          userId: userId,
        })),

      clearAuth: () =>
        set(() => ({
          accessToken: null,
          userId: null,
        })),
    }),
    { name: "auth-storage" }
  )
);
