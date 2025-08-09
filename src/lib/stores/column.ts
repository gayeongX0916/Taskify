import { getColumnListType } from "@/types/columns";
import { create } from "zustand";

interface ColumnState {
  columnsById: Record<number, getColumnListType>;
  setColumnList: (list: getColumnListType[]) => void;
  addColumn: (column: getColumnListType) => void;
  removeColumn: (id: number) => void;
  updateColumn: (id: number, title: string) => void;
}

export const useColumnStore = create<ColumnState>((set) => ({
  columnsById: {},

  setColumnList: (list) =>
    set(() => ({
      columnsById: list.reduce((acc, col) => {
        acc[col.id] = col;
        return acc;
      }, {} as Record<number, getColumnListType>),
    })),

  addColumn: (column) =>
    set((state) => ({
      columnsById: {
        ...state.columnsById,
        [column.id]: column,
      },
    })),

  removeColumn: (id) =>
    set((state) => {
      const newColumns = { ...state.columnsById };
      delete newColumns[id];
      return { columnsById: newColumns };
    }),

  updateColumn: (id, title) =>
    set((state) => ({
      columnsById: {
        ...state.columnsById,
        [id]: { ...state.columnsById[id], title },
      },
    })),
}));
