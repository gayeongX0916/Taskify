import { create } from "zustand";
import { getDashboardListType } from "@/types/dashboards";
import { getDashboardMemberListType } from "@/types/members";

interface DashboardState {
  dashboardsById: Record<number, getDashboardListType>;
  orderedIds: number[];
  totalCount: number;

  membersByDashboardId: Record<number, getDashboardMemberListType[]>;

  mergeListPage: (list: getDashboardListType[], totalCount: number) => void;

  addDashboard: (dashboard: getDashboardListType) => void;
  removeDashboard: (id: number) => void;
  updateDashboard: (id: number, title: string, color: string) => void;

  setDashboardMembers: (
    dashboardId: number,
    members: getDashboardMemberListType[]
  ) => void;
  removeDashboardMember: (dashboardId: number, memberId: number) => void;

  reset: () => void;
}

export const useDashboardStore = create<DashboardState>((set) => ({
  dashboardsById: {},
  orderedIds: [],
  totalCount: 0,

  membersByDashboardId: {},

  mergeListPage: (list, totalCount) =>
    set((state) => {
      const dashboardsById = { ...state.dashboardsById };
      // 새 데이터 덮어쓰기
      list.forEach((d) => (dashboardsById[d.id] = d));

      const seen = new Set<number>();
      const nextOrdered = [
        ...state.orderedIds,
        ...list.map((d) => d.id),
      ].filter((id) => {
        // 중복 제거 때문에
        if (seen.has(id)) return false;
        seen.add(id);
        return true;
      });

      return { dashboardsById, orderedIds: nextOrdered, totalCount };
    }),

  addDashboard: (dashboard) =>
    set((state) => {
      const dashboardsById = {
        ...state.dashboardsById,
        [dashboard.id]: dashboard,
      };
      const next = [
        dashboard.id,
        ...state.orderedIds.filter((id) => id !== dashboard.id),
      ];
      return {
        dashboardsById,
        orderedIds: next,
        totalCount: state.totalCount + 1,
      };
    }),

  removeDashboard: (id) =>
    set((state) => {
      const dashboardsById = { ...state.dashboardsById };
      delete dashboardsById[id];
      return {
        dashboardsById,
        orderedIds: state.orderedIds.filter((x) => x !== id),
        totalCount: Math.max(0, state.totalCount - 1),
      };
    }),

  updateDashboard: (id, title, color) =>
    set((state) => ({
      dashboardsById: {
        ...state.dashboardsById,
        [id]: { ...state.dashboardsById[id], title, color },
      },
    })),

  setDashboardMembers: (dashboardId, members) =>
    set((state) => ({
      membersByDashboardId: {
        ...state.membersByDashboardId,
        [dashboardId]: members,
      },
    })),

  removeDashboardMember: (dashboardId, memberId) =>
    set((state) => {
      const cur = state.membersByDashboardId[dashboardId] || [];
      return {
        membersByDashboardId: {
          ...state.membersByDashboardId,
          [dashboardId]: cur.filter((m) => m.id !== memberId),
        },
      };
    }),

  reset: () =>
    set({
      dashboardsById: {},
      orderedIds: [],
      totalCount: 0,
      membersByDashboardId: {},
    }),
}));
