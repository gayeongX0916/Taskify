import Image from "next/image";
import settingIcon from "@/assets/setting_icon.svg";
import addBoxIcon from "@/assets/add_box.svg";
import { Avatar } from "../../Avatar";
import { InvitedUserList } from "./InvitedUserList";
import { usePathname } from "next/navigation";

type DashboardHeaderProps = {
  dashboardName: string;
};

export default function DashboardHeader({
  dashboardName,
}: DashboardHeaderProps) {
  const pathname = usePathname();
  const isMyDashboardPage = pathname === "/mydashboard";
  const users = ["김가영", "이가병", "김나희", "rld", "김가ㅏ", "김나나"];

  return (
    <header
      className={`flex items-center border-b border-[#d9d9d9] pl-[84px] pr-[8px] py-[13px] md:pl-[200px] md:pr-[32px] md:py-[15px] lg:pl-[340px] ${
        users.length > 0 && !isMyDashboardPage
          ? "justify-end lg:justify-between"
          : "justify-between"
      }`}
    >
      <h1
        className={`text-lg font-bold text-black_333236 md:text-xl ${
          !isMyDashboardPage && "hidden lg:flex"
        }`}
      >
        {isMyDashboardPage ? "내 대시보드" : dashboardName}
      </h1>
      <div className="flex items-center gap-x-[16px] md:gap-x-[32px] lg:gap-x-[40px]">
        <div className="flex gap-x-[6px] md:gap-x-[16px]">
          <button className="px-[12px] py-[3px] text-md text-gray_787486 border border-gray_D9D9D9 rounded-[6px] flex items-center gap-x-[8px] md:text-lg md:px-[16px] md:py-[7px]">
            <Image
              src={settingIcon}
              alt="관리"
              width={20}
              height={20}
              className="hidden md:flex"
            />
            관리
          </button>
          <button className="px-[12px] py-[6px] text-md text-gray_787486 border border-gray_D9D9D9 rounded-[6px] flex items-center gap-x-[8px] md:text-lg md:px-[16px] md:py-[7px]">
            <Image
              src={addBoxIcon}
              alt="초대하기"
              width={20}
              height={20}
              className="hidden md:flex"
            />
            초대하기
          </button>
        </div>

        <div className="flex items-center gap-x-[16px] md:gap-x-[24px] lg:gap-x-[36px]">
          {users && !isMyDashboardPage && <InvitedUserList users={users} />}

          <div className="h-[34px] border-l border-gray_D9D9D9"></div>

          <div className="flex items-center gap-x-[12px]">
            <Avatar username="김가영" />
            <span className="hidden md:flex md:text-lg md:text-black_333236">
              배유철
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
