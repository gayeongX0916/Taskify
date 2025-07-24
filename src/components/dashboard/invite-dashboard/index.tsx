import searchIcon from "@/assets/search_icon.svg";
import emptyDashboard from "@/assets/empty_dashboard.svg";
import Image from "next/image";
import { DashboardButton } from "@/components/common/Button/DashboardButton";

type MobileInviteListProps = {
  name: string;
  invite: string;
};

function MobileInviteList({ name, invite }: MobileInviteListProps) {
  return (
    <div className="px-[16px] py-[14px] border-b border-gray_EEEEEE">
      <div className="flex flex-col gap-y-[3px]">
        <div>
          <span className="text-md text-gray_9FA6B2 inline-block w-[60px]">
            이름
          </span>
          <span className="text-md text-black_333236">{name}</span>
        </div>
        <div>
          <span className="text-md text-gray_9FA6B2 inline-block w-[60px]">
            초대자
          </span>
          <span className="text-md text-black_333236">{invite}</span>
        </div>
      </div>
      <div className="flex gap-x-[10px] mt-[14px]">
        <DashboardButton mode="accept" />
        <DashboardButton mode="deny" />
      </div>
    </div>
  );
}

export function InviteDashboard() {
  const exampleList = [
    { name: "프로덕트 디자인", invite: "손동희" },
    { name: "프로덕트 디자인", invite: "손동희" },
    { name: "프로덕트 디자인", invite: "손동희" },
    { name: "프로덕트 디자인", invite: "손동희" },
  ];

  return (
    <div className="px-[24px] py-[16px] md:px-[28px] md:py-[18px] lg:py-[32px] md:px-[28px] flex flex-col gap-y-[13px] md:gap-y-[24px]">
      <div className="flex flex-col gap-y-[16px] lg:gap-y-[32px]">
        <h1 className="text-xl text-black-333236 font-bold md:text-2xl">
          초대받은 대시보드
        </h1>
        <div className="relative">
          <input
            placeholder="검색"
            className="pl-[44px] pr-[12px] py-[5px] rounded-[6px] border border-gray_D9D9D9 w-full h-[36px]"
          />
          <Image
            src={searchIcon}
            alt="검색"
            className="absolute left-[12px] top-1/2 -translate-y-1/2"
          />
        </div>
      </div>

      <div className="flex flex-col md:hidden">
        {exampleList.map(({ name, invite }) => (
          <MobileInviteList name={name} invite={invite} />
        ))}
      </div>

      <div className="hidden md:flex md:flex-col md:gap-y-[17px]">
        <div className="grid grid-cols-[2fr_2fr_3fr] items-center justify-items-center">
          <span className="text-lg text-gray_9FA6B2">이름</span>
          <span className="text-lg text-gray_9FA6B2">초대자</span>
          <span className="text-lg text-gray_9FA6B2">수락 여부</span>
        </div>
        <div className="flex flex-col">
          {exampleList.map(({ name, invite }) => (
            <div
              key={name}
              className="grid grid-cols-[2fr_2fr_3fr] items-center justify-items-center border-b border-gray_EEEEEE py-[22px] lg:py-[20px]"
            >
              <span className="text-lg text-black_333236">{name}</span>
              <span className="text-lg text-black_333236">{invite}</span>
              <div className="flex gap-x-[10px]">
                <DashboardButton mode="accept" />
                <DashboardButton mode="deny" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {exampleList.length === 0 && (
        <div className="flex flex-col ">
          <Image src={emptyDashboard} alt="없어요" width={60} height={60} />
          <span>아직 초대받은 대시보드가 없어요</span>
        </div>
      )}
    </div>
  );
}
