import { getColumnListType } from "@/types/columns";
import { create } from "zustand";

interface ColumnState {
  columnList: getColumnListType[];
  setColumnList: (list: getColumnListType[]) => void;
  addColumn: (column: getColumnListType) => void;
  removeColumn: (id: number) => void;
  updateColumn: (id: number, title: string) => void;
}

export const useColumnStore = create<ColumnState>((set) => ({
  columnList: [],
  setColumnList: (list) => set({ columnList: list }),
  addColumn: (column) =>
    set((state) => ({
      columnList: [...state.columnList, column],
    })),
  removeColumn: (id) =>
    set((state) => ({
      columnList: state.columnList.filter((d) => d.id !== id),
    })),
  updateColumn: (id, title) =>
    set((state) => ({
      columnList: state.columnList.map((col) =>
        col.id === id ? { ...col, title } : col
      ),
    })),
}));
