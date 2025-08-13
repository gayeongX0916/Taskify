import {
  deleteInviteDashboardType,
  postDashboardType,
  postInviteDashboardType,
  putDashboardType,
} from "@/types/dashboards";
import { api } from "./axios";

// 대시보드 생성
export const postDashboard = (data: postDashboardType) =>
  api.post("/dashboards", data);

// 대시보드 목록 조회
export const getDashboardList = ({ page }: { page: number }) =>
  api.get(`/dashboards?navigationMethod=pagination&page=${page}&size=5`);

// 대시보드 상세 조회
export const getDashboardDetail = ({ dashboardId }: { dashboardId: number }) =>
  api.get(`/dashboards/${dashboardId}`);

// 대시보드 수정
export const putDashboard = ({ dashboardId, ...data }: putDashboardType) =>
  api.put(`/dashboards/${dashboardId}`, data);

// 대시보드 삭제
export const deleteDashboard = ({ dashboardId }: { dashboardId: number }) =>
  api.delete(`/dashboards/${dashboardId}`);

// 대시보드 초대하기
export const postInviteDashboard = ({
  dashboardId,
  email,
}: postInviteDashboardType) =>
  api.post(`/dashboards/${dashboardId}/invitations`, { email });

// 대시보드 초대 불러오기
export const getInviteDashboard = ({
  dashboardId,
  size,
}: {
  dashboardId: number;
  size: number;
}) => api.get(`/dashboards/${dashboardId}/invitations?page=1&size=${size}`);

// 대시보드 초대 취소
export const deleteInviteDashboard = ({
  dashboardId,
  invitationId,
}: deleteInviteDashboardType) =>
  api.delete(`/dashboards/${dashboardId}/invitations/${invitationId}`);
