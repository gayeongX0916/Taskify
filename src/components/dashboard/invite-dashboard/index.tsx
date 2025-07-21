import searchIcon from "@/assets/search_icon.svg";
import { DashboardButton } from "@/components/common/button";
import Image from "next/image";

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
    <div className="px-[24px] py-[16px]">
      <div className="flex flex-col gap-y-[16px]">
        <h1 className="text-xl text-black-333236 font-bold">
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
      <div className="flex flex-col">
        {exampleList.map(({ name, invite }) => (
          <MobileInviteList name={name} invite={invite} />
        ))}
      </div>
    </div>
  );
}
