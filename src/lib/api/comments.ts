import {
  postCommentType,
  putCommentType,
} from "@/types/comments";
import { api } from "./axios";

// 댓글 생성
export const postComment = (data: postCommentType) =>
  api.post("/comments", data);

// 댓글 목록 조회
export const getComment = ({
  size,
  cardId,
}: {
  size: number;
  cardId: number;
}) => api.get(`/comments?size=${size}&cardId=${cardId}`);

// 댓글 수정
export const putComment = ({ commentId, content }: putCommentType) =>
  api.put(`/comments/${commentId}`, { content });

// 댓글 삭제
export const deleteComment = ({ commentId }: { commentId: number }) =>
  api.delete(`/comments/${commentId}`);
