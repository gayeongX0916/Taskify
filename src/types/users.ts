export interface LoginType {
  email: string;
  password: string;
}

export interface PasswordChangeType {
  password: string;
  newPassword: string;
}

export interface SignupType extends LoginType {
  nickname: string;
}

export interface UserChangeType {
  nickname: string;
  profileImageUrl: string;
}
