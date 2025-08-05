import { getDashboardListType } from "@/types/dashboards";
import { create } from "zustand";

interface DashboardState {
  dashboardList: getDashboardListType[];
  setDashboardList: (list: getDashboardListType[]) => void;
  addDashboard: (dashboard: getDashboardListType) => void;
  removeDashboard: (id: number) => void;
}

export const useDashboardStore = create<DashboardState>((set) => ({
  dashboardList: [],
  setDashboardList: (list) => set({ dashboardList: list }),
  addDashboard: (dashboard) =>
    set((state) => ({ dashboardList: [dashboard, ...state.dashboardList] })),
  removeDashboard: (id) =>
    set((state) => ({
      dashboardList: state.dashboardList.filter((d) => d.id !== id),
    })),
}));
