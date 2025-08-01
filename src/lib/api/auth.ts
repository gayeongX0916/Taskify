import { LoginType, PasswordChangeType } from "@/types/users";
import { api } from "./axios";

export const postLogin = (data: LoginType) => api.post("/auth/login", data);

export const putPasswordChange = (data: PasswordChangeType) =>
  api.put("/auth/password", data);
