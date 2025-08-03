import { LoginType } from "./auth";

export interface SignupType extends LoginType {
  nickname: string;
}

export interface UserChangeType {
  nickname: string;
  profileImageUrl: string;
}
