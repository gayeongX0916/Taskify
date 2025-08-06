import addBoxWhiteIcon from "@/assets/add_box_white.svg";
import Image from "next/image";
import { ActionButton } from "@/components/common/Button/ActionButton";
import { PaginationButton } from "@/components/common/Button/PaginationButton";
import { Avatar } from "@/components/common/Avatar";
import { useEffect, useState } from "react";
import {
  deleteInviteDashboard,
  getInviteDashboard,
} from "@/lib/api/dashboards";
import { useToastStore } from "@/lib/stores/toast";
import { getInvitationType, InviteUser } from "@/types/invitation";
import { InviteModal } from "@/components/Modal/Base/InviteModal";
import { getDashboardMemberListType } from "@/types/members";
import { getDashboardMemberList } from "@/lib/api/members";

type MemberTableProps = {
  mode: "member" | "invite";
  dashboardId: number;
};

function InviteButton({
  className,
  onClick,
}: {
  className?: string;
  onClick: () => void;
}) {
  return (
    <button
      className={`px-[12px] py-[4px] rounded-[4px] bg-violet_5534DA flex gap-x-[6px] items-center justify-center ${className}`}
      onClick={onClick}
    >
      <Image src={addBoxWhiteIcon} alt="초대하기" width={16} height={16} />
      <span className="text-white_FFFFFF text-xs md:text-md">초대하기</span>
    </button>
  );
}

export function MemberOrInviteTable({ mode, dashboardId }: MemberTableProps) {
  const [inviteUserList, setInviteUserList] = useState<InviteUser[]>([]);
  const [memberList, setMemberList] = useState<getDashboardMemberListType[]>(
    []
  );
  const addToast = useToastStore.getState().addToast;
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getInviteDashboard({
          dashboardId: Number(dashboardId),
          size: 6,
        });
        const users = res.data.invitations.map(
          (invitation: getInvitationType) => ({
            email: invitation.invitee.email,
            invitationId: invitation.id,
          })
        );

        setInviteUserList(users);
      } catch (error) {
        addToast("대시보드 초대 목록 불러오는데 실패했습니다.");
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getDashboardMemberList({ size: 6, dashboardId });
        const members = res.data.members.filter(
          (member: getDashboardMemberListType) => !member.isOwner
        );

        setMemberList(members);
      } catch (error) {
        addToast("대시보드 멤버 목록 불러오는데 실패했습니다.");
      }
    };
    fetchData();
  }, []);

  const handleCancelInvitation = async (invitationId: number) => {
    try {
      await deleteInviteDashboard({
        dashboardId,
        invitationId,
      });
      setInviteUserList((prev) =>
        prev.filter((user) => user.invitationId !== invitationId)
      );
    } catch (error) {
      addToast("초대 취소에 실패했습니다.");
    }
  };

  return (
    <div className="bg-white_FFFFFF pt-[24px] px-[20px] pb-[12px] rounded-[8px] md:px-[26px] md:pt-[28px] md:pb-[20px]">
      <InviteModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        dashboardId={dashboardId}
      />
      <header className="flex justify-between mb-[18px] md:mb-[27px]">
        <h1 className="text-xl text-black_333236 font-bold md:text-2xl">
          {mode === "member" ? "구성원" : "초대 내역"}
        </h1>

        <div className="flex items-center gap-x-[12px] md:gap-x-[16px]">
          <span className="text-xs text-black_333236 md:text-md">
            1 페이지 중 1
          </span>
          <PaginationButton />
          {mode === "invite" && (
            <InviteButton
              className="hidden md:flex md:h-full md:w-[105px]"
              onClick={() => setIsOpen(true)}
            />
          )}
        </div>
      </header>

      <div
        className={`flex items-center justify-between ${
          mode === "member" ? "mb-[13px]" : "mb-[26px]"
        }`}
      >
        <span className="text-md md:text-lg text-gray_9FA6B2">
          {mode === "member" ? "이름" : "이메일"}
        </span>
        {mode === "invite" && (
          <InviteButton
            className="flex md:hidden"
            onClick={() => setIsOpen(true)}
          />
        )}
      </div>

      <div className="flex flex-col">
        {mode === "member"
          ? memberList.map((member) => (
              <div
                key={member.id}
                className="flex justify-between items-center py-[12px] border-b border-gray_EEEEEE"
              >
                <div className="flex gap-x-[8px] items-center">
                  <Avatar username={member.nickname} />
                  <span className="text-md text-black_333236 md:text-lg">
                    {member.nickname}
                  </span>
                </div>

                <ActionButton className="md:text-md">삭제</ActionButton>
              </div>
            ))
          : inviteUserList.map((user) => (
              <div
                key={user.invitationId}
                className="flex justify-between items-center py-[12px] border-b border-gray_EEEEEE"
              >
                <span className="text-md text-black_333236 md:text-lg">
                  {user.email}
                </span>
                <ActionButton
                  className="md:text-md"
                  onClick={() => handleCancelInvitation(user.invitationId)}
                >
                  취소
                </ActionButton>
              </div>
            ))}
      </div>
    </div>
  );
}
