import { LoginType, PasswordChangeType } from "@/types/users";
import { api } from "./axios";

// 로그인
export const postLogin = (data: LoginType) => api.post("/auth/login", data);

// 비밀번호 변경
export const putPasswordChange = (data: PasswordChangeType) =>
  api.put("/auth/password", data);
