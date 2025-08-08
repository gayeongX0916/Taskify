import { getDashboardListType } from "@/types/dashboards";
import { getDashboardMemberListType } from "@/types/members";
import { create } from "zustand";

interface DashboardState {
  dashboardList: getDashboardListType[];
  dashboardMemberList: getDashboardMemberListType[];
  setDashboardList: (list: getDashboardListType[]) => void;
  setDashboardMemberList: (members: getDashboardMemberListType[]) => void;
  addDashboard: (dashboard: getDashboardListType) => void;
  removeDashboard: (id: number) => void;
  updateDashboard: (id: number, title: string, color: string) => void;
}

export const useDashboardStore = create<DashboardState>((set) => ({
  dashboardList: [],
  dashboardMemberList: [],
  setDashboardList: (list) => set({ dashboardList: list }),
  setDashboardMemberList: (members) => set({ dashboardMemberList: members }),
  addDashboard: (dashboard) =>
    set((state) => ({ dashboardList: [dashboard, ...state.dashboardList] })),
  removeDashboard: (id) =>
    set((state) => ({
      dashboardList: state.dashboardList.filter((d) => d.id !== id),
    })),
  updateDashboard: (id, title, color) =>
    set((state) => ({
      dashboardList: state.dashboardList.map((d) =>
        d.id === id ? { ...d, title, color } : d
      ),
    })),
}));
