import { putInvitationAnswerType } from "@/types/invite";
import { api } from "./axios";

// 내가 받은 초대 목록 조회
export const getInvitationList = ({ size }: { size: number }) =>
  api.get(`/invitations?size=${size}`);

// 초대 응답
export const putInvitationAnswer = ({
  invitationId,
  inviteAccepted,
}: putInvitationAnswerType) =>
  api.put(`/invitations/${invitationId}`, { inviteAccepted });
