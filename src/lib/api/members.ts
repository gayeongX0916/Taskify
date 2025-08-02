import { getDashboardMemberListType } from "@/types/members";
import { api } from "./axios";

// 대시보드 멤버 목록 조회
export const getDashboardMemberList = ({
  size,
  dashboardId,
}: getDashboardMemberListType) =>
  api.get(`/members?page=1&size=${size}&dashboardId=${dashboardId}`);

// 대시보드 멤버 삭제
export const deleteDashboardMember = ({ memberId }: { memberId: number }) =>
  api.delete(`/members/${memberId}`);
