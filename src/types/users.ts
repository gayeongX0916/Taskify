import { LoginType } from "./auth";

export interface SignupType extends LoginType {
  nickname: string;
}

export interface UserChangeType {
  nickname: string;
  profileImageUrl: string | null;
}

export interface getUserType {
  id: number;
  email: string;
  nickname: string;
  profileImageUrl: string | null;
  createdAt: string;
  updateAt: string;
}
