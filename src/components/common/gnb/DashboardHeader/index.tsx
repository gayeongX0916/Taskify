import Image from "next/image";
import settingIcon from "@/assets/setting_icon.svg";
import addBoxIcon from "@/assets/add_box.svg";
import { Avatar } from "../../Avatar";
import { InvitedUserList } from "./InvitedUserList";
import { useParams, usePathname, useRouter } from "next/navigation";
import { InviteModal } from "@/components/Modal/Base/InviteModal";
import { useEffect, useState } from "react";
import { useDashboardStore } from "@/lib/stores/dashboard";
import { getDashboardDetail } from "@/lib/api/dashboards";
import crownIcon from "@/assets/crown.svg";

export default function DashboardHeader() {
  const { dashboardId } = useParams();
  const router = useRouter();
  const pathname = usePathname();
  const isMyDashboardPage = pathname === "/mydashboard";
  const users = ["김가영", "이가병", "김나희", "rld", "김가ㅏ", "김나나"];
  const [isOpen, setIsOpen] = useState(false);

  const dashboard = useDashboardStore((state) =>
    state.dashboardList.find((d) => d.id === Number(dashboardId))
  );
  const addDashboard = useDashboardStore((state) => state.addDashboard);

  useEffect(() => {
    if (!isMyDashboardPage && !dashboard && dashboardId) {
      const fetchDashboard = async () => {
        try {
          const res = await getDashboardDetail({
            dashboardId: Number(dashboardId),
          });
          addDashboard(res.data);
        } catch (error) {
          console.error("대시보드 정보를 불러오는 데 실패했습니다.", error);
        }
      };

      fetchDashboard();
    }
  }, [dashboardId, dashboard, isMyDashboardPage, addDashboard]);

  if (!isMyDashboardPage && !dashboard) {
    return (
      <header className="flex items-center justify-center py-4">
        <span className="text-gray_787486">대시보드 정보를 불러오는 중...</span>
      </header>
    );
  }

  return (
    <header
      className={`flex items-center border-b border-[#d9d9d9] pl-[16px] pr-[8px] py-[13px] md:pl-[40px] md:pr-[32px] md:py-[15px] ${
        users.length > 0 && !isMyDashboardPage
          ? "justify-end lg:justify-between"
          : "justify-between"
      }`}
    >
      <InviteModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        dashboardId={Number(dashboardId)}
      />
      <div className="flex items-center gap-x-[8px]">
        <h1
          className={`text-lg font-bold text-black_333236 md:text-2lg ${
            !isMyDashboardPage && "hidden lg:flex"
          }`}
        >
          {isMyDashboardPage
            ? "내 대시보드"
            : dashboard?.title ?? "대시보드 정보를 불러오는 중..."}
        </h1>
        {dashboard?.createdByMe && (
          <Image
            src={crownIcon}
            alt="주인"
            width={20}
            height={20}
            className="hidden lg:block"
          />
        )}
      </div>
      <div className="flex items-center gap-x-[16px] md:gap-x-[32px] lg:gap-x-[40px]">
        <div className="flex gap-x-[6px] md:gap-x-[16px]">
          <button
            onClick={() => router.push(`/dashboard/${dashboardId}/edit`)}
            className="px-[12px] py-[3px] text-md text-gray_787486 border border-gray_D9D9D9 rounded-[6px] flex items-center gap-x-[8px] lg:text-lg md:px-[16px] md:py-[7px]"
          >
            <Image
              src={settingIcon}
              alt="관리"
              width={20}
              height={20}
              className="hidden md:flex md:w-[18px] md:h-[18px] lg:w-[20px] lg:h-[20px]"
            />
            관리
          </button>
          <button
            onClick={() => setIsOpen(true)}
            className="px-[12px] py-[6px] text-md text-gray_787486 border border-gray_D9D9D9 rounded-[6px] flex items-center gap-x-[8px] lg:text-lg md:px-[16px] md:py-[7px]"
          >
            <Image
              src={addBoxIcon}
              alt="초대하기"
              width={20}
              height={20}
              className="hidden md:flex md:w-[18px] md:h-[18px] lg:w-[20px] lg:h-[20px]"
            />
            초대하기
          </button>
        </div>

        <div className="flex items-center gap-x-[16px] md:gap-x-[24px] lg:gap-x-[36px]">
          {users && !isMyDashboardPage && <InvitedUserList users={users} />}

          <div className="h-[34px] border-l border-gray_D9D9D9"></div>

          <button
            className="flex items-center gap-x-[12px]"
            onClick={() => router.push("/mypage")}
          >
            <Avatar username="김가영" />
            <span className="hidden md:flex md:text-lg md:text-black_333236">
              배유철
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
