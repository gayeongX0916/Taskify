import { getUserType } from "@/types/users";
import { create } from "zustand";

interface UserState {
  myInfo: getUserType | null;
  setMyInfo: (info: getUserType) => void;
  updateMyInfo: (partial: Partial<getUserType>) => void;
}

export const useUserStore = create<UserState>((set) => ({
  myInfo: null,
  setMyInfo: (info) => set({ myInfo: info }),
  updateMyInfo: (partial) =>
    set((state) => ({
      myInfo: state.myInfo ? { ...state.myInfo, ...partial } : null,
    })),
}));
