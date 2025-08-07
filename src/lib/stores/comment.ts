import { getCommentType } from "@/types/comments";
import { create } from "zustand";

interface CommentState {
  commentsByCard: Record<number, getCommentType[]>;
  setCommentList: (cardId: number, comments: getCommentType[]) => void;
  addComment: (cardId: number, comment: getCommentType) => void;
  removeComment: (cardId: number, commentId: number) => void;
  updateComment: (cardId: number, commentId: number, content: string) => void;
}

export const useCommentStore = create<CommentState>((set) => ({
  commentsByCard: {},
  setCommentList: (cardId, comments) =>
    set((state) => ({
      commentsByCard: { ...state.commentsByCard, [cardId]: comments },
    })),
  addComment: (cardId, comment) =>
    set((state) => {
      const prev = state.commentsByCard[cardId] || [];
      return {
        commentsByCard: {
          ...state.commentsByCard,
          [cardId]: [comment, ...prev],
        },
      };
    }),
  removeComment: (cardId, commentId) =>
    set((state) => {
      const prev = state.commentsByCard[cardId] || [];
      return {
        commentsByCard: {
          ...state.commentsByCard,
          [cardId]: prev.filter((c) => c.id !== commentId),
        },
      };
    }),
  updateComment: (cardId, commentId, content) =>
    set((state) => {
      const prev = state.commentsByCard[cardId] || [];
      return {
        commentsByCard: {
          ...state.commentsByCard,
          [cardId]: prev.map((c) =>
            c.id === commentId ? { ...c, content } : c
          ),
        },
      };
    }),
}));
