import Image from "next/image";
import settingIcon from "@/assets/setting_icon.svg";
import addBoxIcon from "@/assets/add_box.svg";
import Avatar from "../../Avatar";
import InvitedUserList from "./InvitedUserList";
import { useParams, usePathname, useRouter } from "next/navigation";
import  InviteModal  from "@/components/Modal/Base/InviteModal";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useDashboardStore } from "@/lib/stores/dashboard";
import { getDashboardDetail } from "@/lib/api/dashboards";
import crownIcon from "@/assets/crown.svg";
import { getMyInfo } from "@/lib/api/users";
import { useToastStore } from "@/lib/stores/toast";
import { getDashboardMemberList } from "@/lib/api/members";
import { useUserStore } from "@/lib/stores/user";
import { isAxiosError } from "axios";
import { useLoadingStore } from "@/lib/stores/loading";
import { useAuthStore } from "@/lib/stores/auth";
import React from "react";

const SettingIcon = React.memo(() => (
  <Image
    src={settingIcon}
    alt="관리"
    width={20}
    height={20}
    className="hidden md:flex md:w-[18px] md:h-[18px] lg:w-[20px] lg:h-[20px]"
  />
));

const AddBoxIcon = React.memo(() => (
  <Image
    src={addBoxIcon}
    alt="초대하기"
    width={20}
    height={20}
    className="hidden md:flex md:w-[18px] md:h-[18px] lg:w-[20px] lg:h-[20px]"
  />
));

const CronwIcon = React.memo(() => (
  <Image
    src={crownIcon}
    alt="주인"
    width={20}
    height={20}
    className="hidden lg:block"
  />
));

export default function DashboardHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const { dashboardId } = useParams();
  const dashboardNum = Number(dashboardId);
  const key = "dashboardHeader";
  const start = useLoadingStore((s) => s.startLoading);
  const stop = useLoadingStore((s) => s.stopLoading);
  const isLoading = useLoadingStore((s) => s.loadingMap[key] ?? false);
  const addToast = useToastStore.getState().addToast;
  const router = useRouter();
  const pathname = usePathname();
  const isMyDashboardPage =
    pathname === "/mydashboard" || pathname === "/mypage";

  const myInfo = useUserStore((state) => state.myInfo);
  const setMyInfo = useUserStore((state) => state.setMyInfo);

  const dashboardMemberList = useDashboardStore(
    (state) => state.membersByDashboardId
  );
  const setDashboardMemberList = useDashboardStore(
    (state) => state.setDashboardMembers
  );
  const dashboard = useDashboardStore(
    (state) => state.dashboardsById[dashboardNum]
  );
  const addDashboard = useDashboardStore((state) => state.addDashboard);
  const member = dashboardMemberList[dashboardNum] || [];
  const userId = useAuthStore((state) => state.userId);
  const visibleMembers = useMemo(() => member.map(m => m.nickname), [member]);

  useEffect(() => {
    if (!isMyDashboardPage && !dashboard && dashboardId) {
      const fetchDashboard = async () => {
        try {
          start(key);
          const res = await getDashboardDetail({
            dashboardId: Number(dashboardId),
          });
          addDashboard(res.data);
        } catch (error) {
          if (isAxiosError(error)) {
            addToast(
              error.response?.data.message ||
                "대시보드를 불러오는데 실패했습니다."
            );
          } else {
            addToast("알 수 없는 오류가 발생했습니다.");
          }
        } finally {
          stop(key);
        }
      };

      fetchDashboard();
    }
  }, [dashboardId, dashboard, isMyDashboardPage]);

  useEffect(() => {
    if (!myInfo) {
      const fetchData = async () => {
        try {
          start(key);
          const res = await getMyInfo();
          setMyInfo(res.data);
        } catch (error) {
          if (isAxiosError(error)) {
            addToast(
              error.response?.data.message ||
                "내 정보를 가져오는데 실패했습니다."
            );
          } else {
            addToast("알 수 없는 오류가 발생했습니다.");
          }
        } finally {
          stop(key);
        }
      };
      fetchData();
    }
  }, []);

  useEffect(() => {
    if (!isMyDashboardPage) {
      const fetchData = async () => {
        try {
          start(key);
          const res = await getDashboardMemberList({
            size: 10,
            dashboardId: dashboardNum,
          });
          setDashboardMemberList(dashboardNum, res.data.members);
        } catch (error) {
          if (isAxiosError(error)) {
            addToast(
              error.response?.data.message || "멤버 목록 조회에 실패했습니다."
            );
          } else {
            addToast("알 수 없는 오류가 발생했습니다.");
          }
        } finally {
          stop(key);
        }
      };
      fetchData();
    }
  }, [dashboardId, isMyDashboardPage]);

  const handleOpen = useCallback(() => setIsOpen(true), []);

  if (!isMyDashboardPage && !dashboard && isLoading) {
    return (
      <header className="flex items-center justify-center py-4 h-[70px]">
        <span className="text-gray_787486">대시보드 정보를 불러오는 중...</span>
      </header>
    );
  }

  return (
    <header
      className={`flex items-center border-b border-[#d9d9d9] pl-[16px] pr-[8px] py-[13px] md:pl-[40px] md:pr-[32px] md:py-[15px] ${
        member.length > 0 && !isMyDashboardPage
          ? "justify-end lg:justify-between"
          : "justify-between"
      }`}
    >
      <InviteModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        dashboardId={dashboardNum}
      />
      <div className="flex items-center gap-x-[8px]">
        <h1
          className={`text-lg font-bold text-black_333236 md:text-2lg ${
            !isMyDashboardPage ? "hidden lg:flex" : ""
          }`}
        >
          {isMyDashboardPage ? "내 대시보드" : dashboard?.title}
        </h1>
        {dashboard?.createdByMe && <CronwIcon />}
      </div>
      <div className="flex items-center gap-x-[16px] md:gap-x-[32px] lg:gap-x-[40px]">
        {!isMyDashboardPage && dashboard?.createdByMe && (
          <div className="flex gap-x-[6px] md:gap-x-[16px]">
            <button
              onClick={() => router.push(`/dashboard/${dashboardId}/edit`)}
              className="px-[12px] py-[3px] text-md text-gray_787486 border border-gray_D9D9D9 rounded-[6px] flex items-center gap-x-[8px] lg:text-lg md:px-[16px] md:py-[7px]"
            >
              <SettingIcon />
              관리
            </button>
            <button
              onClick={handleOpen}
              className="px-[12px] py-[6px] text-md text-gray_787486 border border-gray_D9D9D9 rounded-[6px] flex items-center gap-x-[8px] lg:text-lg md:px-[16px] md:py-[7px]"
            >
              <AddBoxIcon />
              초대하기
            </button>
          </div>
        )}

        <div className="flex items-center gap-x-[16px] md:gap-x-[24px] lg:gap-x-[36px]">
          {member && !isMyDashboardPage && (
            <InvitedUserList users={visibleMembers} />
          )}

          <div className="h-[34px] border-l border-gray_D9D9D9"></div>

          <button
            className="flex items-center gap-x-[12px]"
            onClick={() => router.push("/mypage")}
            disabled={myInfo?.id !== userId}
          >
            {myInfo?.nickname && (
              <>
                <Avatar
                  username={myInfo.nickname}
                  profileImageUrl={myInfo.profileImageUrl || null}
                />
                <span className="hidden md:flex md:text-lg md:text-black_333236">
                  {myInfo.nickname}
                </span>
              </>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
