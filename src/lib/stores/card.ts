import { getCardType } from "@/types/cards";
import { create } from "zustand";

interface CardState {
  cardsByDashboard: Record<number, Record<number, getCardType[]>>; // [dashboardId][columnId] = cards[]
  countsByDashboard: Record<number, Record<number, number>>; // [dashboardId][columnId] = count
  setCardList: (
    dashboardId: number,
    columnId: number,
    cards: getCardType[],
    count: number
  ) => void;
  addCard: (dashboardId: number, columnId: number, card: getCardType) => void;
  removeCard: (dashboardId: number, columnId: number, cardId: number) => void;
  updateCard: (
    dashboardId: number,
    oldColumnId: number,
    card: getCardType
  ) => void;
}

export const useCardStore = create<CardState>((set) => ({
  cardsByDashboard: {},
  countsByDashboard: {},
  setCardList: (dashboardId, columnId, cards, count) =>
    set((state) => ({
      cardsByDashboard: {
        ...state.cardsByDashboard,
        [dashboardId]: {
          ...(state.cardsByDashboard[dashboardId] || {}),
          [columnId]: cards,
        },
      },
      countsByDashboard: {
        ...state.countsByDashboard,
        [dashboardId]: {
          ...(state.countsByDashboard[dashboardId] || {}),
          [columnId]: count,
        },
      },
    })),

  addCard: (dashboardId, columnId, card) =>
    set((state) => {
      const prev = (state.cardsByDashboard[dashboardId] || {})[columnId] || [];
      return {
        cardsByDashboard: {
          ...state.cardsByDashboard,
          [dashboardId]: {
            ...(state.cardsByDashboard[dashboardId] || {}),
            [columnId]: [card, ...prev],
          },
        },
        countsByDashboard: {
          ...state.countsByDashboard,
          [dashboardId]: {
            ...(state.countsByDashboard[dashboardId] || {}),
            [columnId]:
              ((state.countsByDashboard[dashboardId] || {})[columnId] || 0) + 1,
          },
        },
      };
    }),

  removeCard: (dashboardId, columnId, cardId) =>
    set((state) => {
      const prev = (state.cardsByDashboard[dashboardId] || {})[columnId] || [];
      const newCol = prev.filter((c) => c.id !== cardId);
      return {
        cardsByDashboard: {
          ...state.cardsByDashboard,
          [dashboardId]: {
            ...(state.cardsByDashboard[dashboardId] || {}),
            [columnId]: newCol,
          },
        },
        countsByDashboard: {
          ...state.countsByDashboard,
          [dashboardId]: {
            ...(state.countsByDashboard[dashboardId] || {}),
            [columnId]: Math.max(
              ((state.countsByDashboard[dashboardId] || {})[columnId] || 1) - 1,
              0
            ),
          },
        },
      };
    }),

  updateCard: (dashboardId, oldColumnId, card) =>
    set((state) => {
      const newColumnId = card.columnId;
      const dbCards = { ...(state.cardsByDashboard[dashboardId] || {}) };
      const dbCounts = { ...(state.countsByDashboard[dashboardId] || {}) };

      if (oldColumnId === newColumnId) {
        const list = dbCards[newColumnId] || [];
        dbCards[newColumnId] = list.map((c) => (c.id === card.id ? card : c));
      } else {
        const oldList = dbCards[oldColumnId] || [];
        dbCards[oldColumnId] = oldList.filter((c) => c.id !== card.id);
        dbCounts[oldColumnId] = Math.max((dbCounts[oldColumnId] || 1) - 1, 0);

        const newList = dbCards[newColumnId] || [];
        dbCards[newColumnId] = [card, ...newList];
        dbCounts[newColumnId] = (dbCounts[newColumnId] || 0) + 1;
      }

      return {
        cardsByDashboard: { ...state.cardsByDashboard, [dashboardId]: dbCards },
        countsByDashboard: {
          ...state.countsByDashboard,
          [dashboardId]: dbCounts,
        },
      };
    }),
}));
