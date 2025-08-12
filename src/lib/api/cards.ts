import {
  getCardListType,
  getCardType,
  postCardType,
  putCardType,
} from "@/types/cards";
import { api } from "./axios";

// 카드 생성
export const postCard = (data: postCardType) => api.post("/cards", data);

// 카드 목록 조회
export const getCardList = ({ size, columnId }: getCardListType) =>
  api.get(`/cards?size=${size}&columnId=${columnId}`);

// 카드 수정
export const putCard = ({ id, ...data }: getCardType) =>
  api.put(`/cards/${id}`, data);

// 카드 상세 조회
export const getCardDetail = ({ cardId }: { cardId: number }) =>
  api.get(`/cards/${cardId}`);

// 카드 삭제
export const deleteCardDetail = ({ cardId }: { cardId: number }) =>
  api.delete(`/cards/${cardId}`);
