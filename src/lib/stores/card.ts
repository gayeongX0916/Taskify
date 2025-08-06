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
  updateCard: (oldColumnId, card) =>
    set((state) => {
      const newColumnId = card.columnId;
      const newCardsByColumn = { ...state.cardsByColumn };
      const newCountsByColumn = { ...state.countsByColumn };

      const oldCards = newCardsByColumn[oldColumnId] || [];
      newCardsByColumn[oldColumnId] = oldCards.filter((c) => c.id !== card.id);
      newCountsByColumn[oldColumnId] = Math.max(
        (newCountsByColumn[oldColumnId] || 1) - 1,
        0
      );

      const newCards = newCardsByColumn[newColumnId] || [];
      newCardsByColumn[newColumnId] = [card, ...newCards];
      newCountsByColumn[newColumnId] =
        (newCountsByColumn[newColumnId] || 0) + 1;

      return {
        cardsByColumn: newCardsByColumn,
        countsByColumn: newCountsByColumn,
      };
    }),
}));
