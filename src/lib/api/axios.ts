import axios from "axios";
import { useAuthStore } from "@/lib/stores/auth";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "",
});

export const attachInterceptors = (router: { push: (s: string) => void }) => {
  const reqId = api.interceptors.request.use((config) => {
    const token = useAuthStore.getState().accessToken;
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  });

  const resId = api.interceptors.response.use(
    (res) => res,
    (err) => {
      if (err.response?.status === 401) {
        useAuthStore.getState().clearAuth();
        router.push("/login");
      }
      return Promise.reject(err);
    }
  );
  return () => {
    api.interceptors.request.eject(reqId);
    api.interceptors.response.eject(resId);
  };
};
