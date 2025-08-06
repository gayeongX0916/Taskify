import {
  postCardImgType,
  postColumnType,
  putColumnType,
} from "@/types/columns";
import { api } from "./axios";

// 컬럼 생성
export const postColumn = (data: postColumnType) => api.post("/columns", data);

// 컬럼 목록 조회
export const getColumnList = ({ dashboardId }: { dashboardId: number }) =>
  api.get(`/columns?dashboardId=${dashboardId}`);

// 컬럼 수정
export const putColumn = ({ columnId, title }: putColumnType) =>
  api.put(`/columns/${columnId}`, { title });

// 컬럼 삭제
export const deleteColumn = ({ columnId }: { columnId: number }) =>
  api.delete(`/columns/${columnId}`);

// 카드 이미지 업로드
export const postCardImg = ({ columnId, image }: postCardImgType) => {
  const formData = new FormData();
  formData.append("image", image);

  return api.post(`/columns/${columnId}/card-image`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
