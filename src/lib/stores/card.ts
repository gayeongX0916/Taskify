import { getCardType } from "@/types/cards";
import { create } from "zustand";

interface CardState {
  cardsByColumn: Record<number, getCardType[]>;
  countsByColumn: Record<number, number>;
  setCardList: (columnId: number, cards: getCardType[], count: number) => void;
  addCard: (columnId: number, card: getCardType) => void;
  removeCard: (columnId: number, cardId: number) => void;
  updateCard: (columnId: number, card: getCardType) => void;
}

export const useCardStore = create<CardState>((set) => ({
  cardsByColumn: {},
  countsByColumn: {},
  setCardList: (columnId, cards, count) =>
    set((state) => ({
      cardsByColumn: { ...state.cardsByColumn, [columnId]: cards },
      countsByColumn: { ...state.countsByColumn, [columnId]: count },
    })),
  addCard: (columnId, card) =>
    set((state) => {
      const prev = state.cardsByColumn[columnId] || [];
      return {
        cardsByColumn: { ...state.cardsByColumn, [columnId]: [card, ...prev] },
        countsByColumn: {
          ...state.countsByColumn,
          [columnId]: (state.countsByColumn[columnId] || 0) + 1,
        },
      };
    }),
  removeCard: (columnId, cardId) =>
    set((state) => {
      const prev = state.cardsByColumn[columnId] || [];
      return {
        cardsByColumn: {
          ...state.cardsByColumn,
          [columnId]: prev.filter((c) => c.id !== cardId),
        },
        countsByColumn: {
          ...state.countsByColumn,
          [columnId]: Math.max((state.countsByColumn[columnId] || 1) - 1, 0),
        },
      };
    }),
  updateCard: (columnId, card) =>
    set((state) => {
      const prev = state.cardsByColumn[columnId] || [];
      return {
        cardsByColumn: {
          ...state.cardsByColumn,
          [columnId]: prev.map((c) => (c.id === card.id ? card : c)),
        },
        countsByColumn: state.countsByColumn,
      };
    }),
}));
