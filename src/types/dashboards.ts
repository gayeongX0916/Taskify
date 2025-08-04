export interface postDashboardType {
  title: string;
  color: string;
}

export interface putDashboardType extends postDashboardType {
  dashboardId: number;
}

export interface deleteInviteDashboardType {
  dashboardId: number;
  invitationId: number;
}

export interface getDashboardListTYpe {
  id: number;
  title: string;
  color: string;
  createdAt:string;
  updatedAt:string;
  createdByMe: boolean;
  userId: number;
}
