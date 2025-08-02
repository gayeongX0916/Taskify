export interface postDashboardType {
  title: string;
  color: string;
}

export interface putDashboardType extends postDashboardType {
  dashboardId: number;
}

export interface deleteInviteDashboardType{
  dashboardId:number;
  invitationId:number;
}