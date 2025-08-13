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
import { getInvitationType, InviteUser } from "@/types/invite";
import { InviteModal } from "@/components/Modal/Base/InviteModal";
import {
  deleteDashboardMember,
  getDashboardMemberList,
} from "@/lib/api/members";
import { useDashboardStore } from "@/lib/stores/dashboard";
import { useLoadingStore } from "@/lib/stores/loading";
import { isAxiosError } from "axios";
import { useInviteStore } from "@/lib/stores/invite";
import { getDashboardMemberListType } from "@/types/members";

type MemberTableProps = {
  mode: "member" | "invite";
  dashboardId: number;
};

type InviteButtonProps = {
  className?: string;
  onClick: () => void;
  isLoading: boolean;
};

function InviteButton({ className, onClick, isLoading }: InviteButtonProps) {
  return (
    <button
      className={`px-[12px] py-[4px] rounded-[4px] bg-violet_5534DA flex gap-x-[6px] items-center justify-center ${className}`}
      onClick={onClick}
      disabled={isLoading}
    >
      <Image src={addBoxWhiteIcon} alt="초대하기" width={16} height={16} />
      <span className="text-white_FFFFFF text-xs md:text-md">초대하기</span>
    </button>
  );
}

export function MemberOrInviteTable({ mode, dashboardId }: MemberTableProps) {
  const key = "MemberOrInviteTable";
  const start = useLoadingStore((s) => s.startLoading);
  const stop = useLoadingStore((s) => s.stopLoading);
  const isLoading = useLoadingStore((s) => s.loadingMap[key] ?? false);
  const setDashboardMemberList = useDashboardStore(
    (state) => state.setDashboardMembers
  );
  const removeDashboardMember = useDashboardStore(
    (state) => state.removeDashboardMember
  );
  const setSentInvites = useInviteStore((state) => state.setSentInvites);
  const removeSentInvite = useInviteStore((state) => state.removeSentInvite);
  const addToast = useToastStore.getState().addToast;
  const [sentInvitesList, setSentInvitesList] = useState<InviteUser[]>([]);
  const [memberList, setMemberList] = useState<getDashboardMemberListType[]>(
    []
  );
  const [isOpen, setIsOpen] = useState(false);
  const [inviteTotalCount, setInviteTotalCount] = useState(0);
  const [memberTotalCount, setMemberTotalCount] = useState(0);
  const inviteTotalPages = Math.ceil(inviteTotalCount / 5);
  const memberTotalPages = Math.ceil(memberTotalCount / 4);
  const [invitePage, setInvitePage] = useState(1);
  const [memberPage, setMemberPage] = useState(1);

  const filledMemberList = Array.from({ length: 4 }).map(
    (_, i) => memberList[i] ?? { id: `empty-${i}`, nickname: "", isEmpty: true }
  );

  const filledInviteList = Array.from({ length: 5 }).map(
    (_, i) =>
      sentInvitesList[i] ?? {
        invitationId: `empty-${i}`,
        email: "",
        isEmpty: true,
      }
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        start(key);
        const res = await getDashboardMemberList({
          size: 4,
          dashboardId: dashboardId,
          page: memberPage,
        });
        setDashboardMemberList(dashboardId, res.data.members);
        setMemberList(res.data.members);
        setMemberTotalCount(res.data.totalCount);
      } catch (error) {
        if (isAxiosError(error)) {
          addToast(
            error.response?.data.message || "담당자 목록 조회에 실패했습니다."
          );
        } else {
          addToast("알 수 없는 오류가 발생했습니다.");
        }
      } finally {
        stop(key);
      }
    };
    fetchData();
  }, [memberPage]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        start(key);
        const res = await getInviteDashboard({
          dashboardId: dashboardId,
          size: 5,
          page: invitePage,
        });
        const users = res.data.invitations.map(
          (invitation: getInvitationType) => ({
            email: invitation.invitee.email,
            invitationId: invitation.id,
          })
        );
        setSentInvites(users);
        setSentInvitesList(users);
        setInviteTotalCount(res.data.totalCount);
      } catch (error) {
        if (isAxiosError(error)) {
          addToast(
            error.response?.data.message ||
              "대시보드 초대 목록 불러오는데 실패했습니다."
          );
        } else {
          addToast("알 수 없는 오류가 발생했습니다.");
        }
      } finally {
        stop(key);
      }
    };
    fetchData();
  }, [dashboardId, isOpen, invitePage]);

  const handleCancelInvitation = async (invitationId: number) => {
    try {
      start(key);
      await deleteInviteDashboard({
        dashboardId,
        invitationId,
      });
      removeSentInvite(invitationId);
      addToast("초대 취소에 성공했습니다.", "success");
    } catch (error) {
      if (isAxiosError(error)) {
        addToast(error.response?.data.message || "초대 취소에 실패했습니다.");
      } else {
        addToast("알 수 없는 오류가 발생했습니다.");
      }
    } finally {
      stop(key);
    }
  };

  const handleDeleteMemberList = async (memberId: number) => {
    try {
      start(key);
      await deleteDashboardMember({ memberId });
      removeDashboardMember(dashboardId, memberId);
      addToast("대시보드 멤버 삭제에 성공했습니다.", "success");
    } catch (error) {
      if (isAxiosError(error)) {
        addToast(
          error.response?.data.message || "대시보드 멤버 삭제에 실패했습니다."
        );
      } else {
        addToast("알 수 없는 오류가 발생했습니다.");
      }
    } finally {
      stop(key);
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
            {mode === "member" ? memberTotalPages : inviteTotalPages} 페이지 중
            {mode === "member" ? memberPage : invitePage}
          </span>
          <PaginationButton
            currentPage={mode === "member" ? memberPage : invitePage}
            totalPages={mode === "member" ? memberTotalPages : inviteTotalPages}
            onPageChange={mode === "member" ? setMemberPage : setInvitePage}
          />
          {mode === "invite" && (
            <InviteButton
              className="hidden md:flex md:h-full md:w-[105px]"
              onClick={() => setIsOpen(true)}
              isLoading={isLoading}
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
            isLoading={isLoading}
          />
        )}
      </div>

      <div className="flex flex-col">
        {mode === "member"
          ? filledMemberList.map((member) => (
              <div
                key={member.id}
                className="flex justify-between items-center py-[12px] border-b border-gray_EEEEEE"
              >
                {!member.isEmpty ? (
                  <>
                    <div className="flex gap-x-[8px] items-center">
                      <Avatar username={member.nickname} />
                      <span className="text-md text-black_333236 md:text-lg">
                        {member.nickname}
                      </span>
                    </div>
                    <ActionButton
                      className="md:text-md"
                      onClick={() => handleDeleteMemberList(member.id)}
                      disabled={isLoading}
                    >
                      삭제
                    </ActionButton>
                  </>
                ) : (
                  <div className="w-full h-[35px] " />
                )}
              </div>
            ))
          : filledInviteList.map((user) => (
              <div
                key={user.invitationId}
                className="flex justify-between items-center py-[12px] border-b border-gray_EEEEEE"
              >
                {!user.isEmpty ? (
                  <>
                    <span className="text-md text-black_333236 md:text-lg">
                      {user.email}
                    </span>
                    <ActionButton
                      className="md:text-md"
                      onClick={() => handleCancelInvitation(user.invitationId)}
                      disabled={isLoading}
                    >
                      취소
                    </ActionButton>
                  </>
                ) : (
                  <div className="w-full h-[40px]" />
                )}
              </div>
            ))}
      </div>
    </div>
  );
}
