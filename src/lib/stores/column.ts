import { getColumnListType } from "@/types/columns";
import { create } from "zustand";

interface ColumnState {
  columnsByDashboard: Record<number, Record<number, getColumnListType>>;
  setColumnList: (dashboardId: number, list: getColumnListType[]) => void;
  addColumn: (dashboardId: number, column: getColumnListType) => void;
  removeColumn: (dashboardId: number, id: number) => void;
  updateColumn: (dashboardId: number, id: number, title: string) => void;
}

export const useColumnStore = create<ColumnState>((set) => ({
  columnsByDashboard: {},

  setColumnList: (dashboardId, list) =>
    set((state) => ({
      columnsByDashboard: {
        ...state.columnsByDashboard,
        [dashboardId]: list.reduce((acc, col) => {
          acc[col.id] = col;
          return acc;
        }, {} as Record<number, getColumnListType>),
      },
    })),

  addColumn: (dashboardId, column) =>
    set((state) => {
      const prevColumns = state.columnsByDashboard[dashboardId] || {};
      return {
        columnsByDashboard: {
          ...state.columnsByDashboard,
          [dashboardId]: {
            ...prevColumns,
            [column.id]: column,
          },
        },
      };
    }),

  removeColumn: (dashboardId, id) =>
    set((state) => {
      const prevColumns = { ...(state.columnsByDashboard[dashboardId] || {}) };
      delete prevColumns[id];
      return {
        columnsByDashboard: {
          ...state.columnsByDashboard,
          [dashboardId]: prevColumns,
        },
      };
    }),

  updateColumn: (dashboardId, id, title) =>
    set((state) => {
      const prevColumns = state.columnsByDashboard[dashboardId] || {};
      return {
        columnsByDashboard: {
          ...state.columnsByDashboard,
          [dashboardId]: {
            ...prevColumns,
            [id]: { ...prevColumns[id], title },
          },
        },
      };
    }),
}));
