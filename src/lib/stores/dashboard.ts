import { getDashboardListType } from "@/types/dashboards";
import { getDashboardMemberListType } from "@/types/members";
import { create } from "zustand";

interface DashboardState {
  dashboardsById: Record<number, getDashboardListType>;
  membersByDashboardId: Record<number, getDashboardMemberListType[]>;

  setDashboardList: (list: getDashboardListType[]) => void;
  setDashboardMembers: (
    dashboardId: number,
    members: getDashboardMemberListType[]
  ) => void;
  addDashboard: (dashboard: getDashboardListType) => void;
  removeDashboard: (id: number) => void;
  updateDashboard: (id: number, title: string, color: string) => void;
  removeDashboardMember: (dashboardId: number, memberId: number) => void;
}

export const useDashboardStore = create<DashboardState>((set) => ({
  dashboardsById: {},
  membersByDashboardId: {},

  setDashboardList: (list) =>
    set((state) => ({
      dashboardsById: {
        ...state.dashboardsById,
        ...list.reduce((acc, d) => {
          acc[d.id] = d;
          return acc;
        }, {} as Record<number, getDashboardListType>),
      },
    })),

  setDashboardMembers: (dashboardId, members) =>
    set((state) => ({
      membersByDashboardId: {
        ...state.membersByDashboardId,
        [dashboardId]: members,
      },
    })),

  addDashboard: (dashboard) =>
    set((state) => ({
      dashboardsById: {
        ...state.dashboardsById,
        [dashboard.id]: dashboard,
      },
    })),

  removeDashboard: (id) =>
    set((state) => {
      const newDashboards = { ...state.dashboardsById };
      delete newDashboards[id];
      const newMembers = { ...state.membersByDashboardId };
      delete newMembers[id];
      return {
        dashboardsById: newDashboards,
        membersByDashboardId: newMembers,
      };
    }),

  updateDashboard: (id, title, color) =>
    set((state) => ({
      dashboardsById: {
        ...state.dashboardsById,
        [id]: { ...state.dashboardsById[id], title, color },
      },
    })),

  removeDashboardMember: (dashboardId, memberId) =>
    set((state) => {
      const currentMembers = state.membersByDashboardId[dashboardId] || [];
      return {
        membersByDashboardId: {
          ...state.membersByDashboardId,
          [dashboardId]: currentMembers.filter((m) => m.id !== memberId),
        },
      };
    }),
}));
