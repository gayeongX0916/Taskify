import { api } from "./axios";

// 대시보드 멤버 목록 조회
export const getDashboardMemberList = ({
  page = 1,
  size,
  dashboardId,
}: {
  page?: number;
  size: number;
  dashboardId: number;
}) => api.get(`/members?page=${page}&size=${size}&dashboardId=${dashboardId}`);

// 대시보드 멤버 삭제
export const deleteDashboardMember = ({ memberId }: { memberId: number }) =>
  api.delete(`/members/${memberId}`);
