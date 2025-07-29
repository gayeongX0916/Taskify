"use client";

import searchIcon from "@/assets/search_icon.svg";
import emptyDashboard from "@/assets/empty_dashboard.svg";
import Image from "next/image";
import { DashboardButton } from "@/components/common/Button/DashboardButton";
import { useState } from "react";

type MobileInviteListProps = {
  name: string;
  invite: string;
};

function MobileInviteList({ name, invite }: MobileInviteListProps) {
  return (
    <li className="px-[16px] py-[14px] border-b border-gray_EEEEEE">
      <dl className="flex flex-col gap-y-[3px]">
        <div className="flex">
          <dt className="text-md text-gray_9FA6B2 inline-block w-[60px]">
            이름
          </dt>
          <dd className="text-md text-black_333236">{name}</dd>
        </div>
        <div className="flex">
          <dt className="text-md text-gray_9FA6B2 inline-block w-[60px]">
            초대자
          </dt>
          <dd className="text-md text-black_333236">{invite}</dd>
        </div>
      </dl>

      <div className="flex gap-x-[10px] mt-[14px]">
        <DashboardButton mode="accept" />
        <DashboardButton mode="deny" />
      </div>
    </li>
  );
}

export function ReceivedInviteTable() {
  const [value, setValue] = useState("");

  const exampleList = [
    { name: "프로덕트 디자인", invite: "손동희" },
    { name: "dff 디자인", invite: "ds" },
    { name: "zzzz 디자인", invite: "cx" },
    { name: "프로덕ddss트 디자인", invite: "ds" },
  ];

  const filteredList = exampleList.filter((item) => item.name.includes(value));

  return (
    <section className="px-[24px] py-[16px] md:px-[28px] md:py-[18px] lg:py-[32px] md:px-[28px] flex flex-col gap-y-[13px] md:gap-y-[24px]">
      <header className="flex flex-col gap-y-[16px] lg:gap-y-[32px]">
        <h1 className="text-xl text-black-333236 font-bold md:text-2xl">
          초대받은 대시보드
        </h1>
        <form className="relative" role="search">
          <input
            type="search"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="검색"
            className="pl-[44px] pr-[12px] py-[5px] rounded-[6px] border border-gray_D9D9D9 w-full h-[36px]"
          />
          <Image
            src={searchIcon}
            alt="검색"
            className="absolute left-[12px] top-1/2 -translate-y-1/2"
          />
        </form>
      </header>

      <ul className="flex flex-col md:hidden">
        {filteredList.map(({ name, invite }) => (
          <MobileInviteList name={name} invite={invite} />
        ))}
      </ul>

      <div className="hidden md:flex md:flex-col">
        <div className="grid grid-cols-[2fr_2fr_3fr] items-center justify-items-center">
          <span className="text-lg text-gray_9FA6B2">이름</span>
          <span className="text-lg text-gray_9FA6B2">초대자</span>
          <span className="text-lg text-gray_9FA6B2">수락 여부</span>
        </div>
        <ul className="flex flex-col">
          {filteredList.map(({ name, invite }) => (
            <li
              key={name}
              className="grid grid-cols-[2fr_2fr_3fr] items-center justify-items-center border-b border-gray_EEEEEE py-[22px] lg:py-[20px]"
            >
              <span className="text-lg text-black_333236">{name}</span>
              <span className="text-lg text-black_333236">{invite}</span>
              <div className="flex gap-x-[10px]">
                <DashboardButton mode="accept" />
                <DashboardButton mode="deny" />
              </div>
            </li>
          ))}
        </ul>
      </div>

      {exampleList.length === 0 && (
        <div className="flex flex-col ">
          <Image src={emptyDashboard} alt="없어요" width={60} height={60} />
          <span>아직 초대받은 대시보드가 없어요</span>
        </div>
      )}
    </section>
  );
}
