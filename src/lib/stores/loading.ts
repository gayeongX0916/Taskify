import { create } from "zustand";

type LoadingMap = Record<string, boolean>;

interface LoadingState {
  loadingMap: LoadingMap;
  startLoading: (key?: string) => void;
  stopLoading: (key?: string) => void;
  isLoading: (key?: string) => boolean;
}

export const useLoadingStore = create<LoadingState>((set, get) => ({
  loadingMap: {},
  startLoading: (key = "global") =>
    set((state) => ({ loadingMap: { ...state.loadingMap, [key]: true } })),
  stopLoading: (key = "global") =>
    set((state) => ({ loadingMap: { ...state.loadingMap, [key]: false } })),
  isLoading: (key = "global") => Boolean(get().loadingMap[key]),
}));
