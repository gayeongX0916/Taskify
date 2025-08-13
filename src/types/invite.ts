export interface putInvitationAnswerType {
  invitationId: number;
  inviteAccepted: boolean;
}

export interface getInvitationType {
  id: number;
  inviter: {
    id: number;
    email: string;
    nickname: string;
  };
  teamId: string;
  dashboard: {
    id: number;
    title: string;
  };
  invitee: {
    id: number;
    email: string;
    nickname: string;
  };
  inviteAccepted: boolean | null;
  createdAt: string;
  updatedAt: string;
}

export interface InviteUser {
  email: string;
  invitationId: number;
  isEmpty?: string;
}
