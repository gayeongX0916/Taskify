import { SignupType, UserChangeType } from "@/types/users";
import { api } from "./axios";

export const postSignUp = (data: SignupType) => api.post("/users", data);

export const getMyInfo = () => api.get("/users/me");

export const putMyInfo = (data: UserChangeType) => api.put("/users/me", data);

export const postProfileImg = (file: File) => {
  const formData = new FormData();
  formData.append("image", file);

  return api.post("/users/me/image", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
