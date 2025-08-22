import { create } from "zustand";
import { persist } from "zustand/middleware";
import { setCookie, deleteCookie } from "@/lib/utils/cookie";

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
        set(() => {
          setCookie("accessToken", token);
          return { accessToken: token, userId };
        }),

      clearAuth: () =>
        set(() => {
          deleteCookie("accessToken");
          return { accessToken: null, userId: null };
        }),
    }),
    { name: "auth-storage" }
  )
);
