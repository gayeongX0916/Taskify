import { SignupType, UserChangeType } from "@/types/users";
import { api } from "./axios";

// 회원가입
export const postSignUp = (data: SignupType) => api.post("/users", data);

// 내 정보 조회
export const getMyInfo = () => api.get("/users/me");

// 내 정보 수정
export const putMyInfo = (data: UserChangeType) => api.put("/users/me", data);

// 프로필 이미지 업로드
export const postProfileImg = (file: File) => {
  const formData = new FormData();
  formData.append("image", file);

  return api.post("/users/me/image", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
