import { create } from "zustand";
import { InviteUser, getInvitationType } from "@/types/invite";

type InviteState = {
  sentInvites: InviteUser[]; // 내가 보낸 초대 목록
  receivedInvites: getInvitationType[]; // 내가 받은 초대 목록
  setSentInvites: (list: InviteUser[]) => void;
  addSentInvite: (invite: InviteUser) => void; // 초대하기 누르면
  removeSentInvite: (invitationId: number) => void; // 취소 누르면
  setReceivedInvites: (list: getInvitationType[]) => void;
  removeReceivedInvite: (invitationId: number) => void;
};

export const useInviteStore = create<InviteState>((set) => ({
  sentInvites: [],
  receivedInvites: [],

  setSentInvites: (list) => set({ sentInvites: list }),
  addSentInvite: (invite) =>
    set((state) => ({ sentInvites: [...state.sentInvites, invite] })),
  removeSentInvite: (invitationId) =>
    set((state) => ({
      sentInvites: state.sentInvites.filter(
        (u) => u.invitationId !== invitationId
      ),
    })),

  setReceivedInvites: (list) => set({ receivedInvites: list }),
  removeReceivedInvite: (invitationId) =>
    set((state) => ({
      receivedInvites: state.receivedInvites.filter(
        (i) => i.id !== invitationId
      ),
    })),
}));
