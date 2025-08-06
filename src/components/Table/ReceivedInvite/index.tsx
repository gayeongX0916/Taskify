"use client";

import searchIcon from "@/assets/search_icon.svg";
import emptyDashboard from "@/assets/empty_dashboard.svg";
import Image from "next/image";
import { DashboardButton } from "@/components/common/Button/DashboardButton";
import { useEffect, useState } from "react";
import { getInvitationList, putInvitationAnswer } from "@/lib/api/invitations";
import { useToastStore } from "@/lib/stores/toast";
import { getInvitationType, putInvitationAnswerType } from "@/types/invitation";

type MobileInviteListProps = {
  name: string;
  invite: string;
  id: number;
  onRespond: (invitationId: number, accepted: boolean) => void;
};

function MobileInviteList({
  name,
  invite,
  id,
  onRespond,
}: MobileInviteListProps) {
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
        <DashboardButton mode="accept" onClick={() => onRespond(id, true)} />
        <DashboardButton mode="deny" onClick={() => onRespond(id, false)} />
      </div>
    </li>
  );
}

export function ReceivedInviteTable() {
  const [value, setValue] = useState("");
  const addToast = useToastStore.getState().addToast;
  const [invitedList, setInvitedList] = useState<getInvitationType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getInvitationList({ size: 6 });
        setInvitedList(res.data.invitations);
      } catch (error) {
        addToast("초대받은 목록을 불러오는데 실패했습니다.");
      }
    };
    fetchData();
  }, []);

  const filteredList = invitedList.filter((item) =>
    item.inviter.nickname.includes(value)
  );

  const handlePutInvitation = async (
    invitationId: number,
    inviteAccepted: boolean
  ) => {
    try {
      await putInvitationAnswer({ invitationId, inviteAccepted });
      setInvitedList((prev) => prev.filter((item) => item.id !== invitationId));
    } catch (error) {
      addToast("초대 응답에 실패했습니다.");
    }
  };

  return (
    <section
      className={`flex flex-col bg-white_FFFFFF rounded-[16px] ${
        invitedList.length === 0
          ? "gap-y-[100px] md:gap-y-[60px] px-[20px] pt-[24px] pb-[80px] md:px-[40px]"
          : "px-[24px] py-[16px] md:px-[28px] md:py-[18px] lg:py-[32px] md:px-[28px] gap-y-[13px] md:gap-y-[24px]"
      }`}
    >
      <header className="flex flex-col gap-y-[16px] lg:gap-y-[32px]">
        <h1 className="text-lg text-black-333236 font-bold md:text-xl">
          초대받은 대시보드
        </h1>
        {invitedList.length > 0 && (
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
        )}
      </header>

      {invitedList.length === 0 ? (
        <div className="flex flex-col items-center gap-y-[16px] md:gap-y-[24px]">
          <Image
            src={emptyDashboard}
            alt="대시보드가 없어요"
            width={60}
            height={60}
          />
          <span className="text-xs text-gray_9FA6B2 md:text-md">
            아직 초대받은 대시보드가 없어요
          </span>
        </div>
      ) : (
        <>
          <ul className="flex flex-col md:hidden">
            {filteredList.map(({ dashboard, inviter, id }) => (
              <MobileInviteList
                key={id}
                name={dashboard.title}
                invite={inviter.nickname}
                id={id}
                onRespond={handlePutInvitation}
              />
            ))}
          </ul>

          <div className="hidden md:flex md:flex-col">
            <div className="grid grid-cols-[2fr_2fr_3fr] items-center justify-items-center">
              <span className="text-lg text-gray_9FA6B2">이름</span>
              <span className="text-lg text-gray_9FA6B2">초대자</span>
              <span className="text-lg text-gray_9FA6B2">수락 여부</span>
            </div>
            <ul className="flex flex-col">
              {filteredList.map(({ dashboard, inviter, id }) => (
                <li
                  key={id}
                  className="grid grid-cols-[2fr_2fr_3fr] items-center justify-items-center border-b border-gray_EEEEEE py-[22px] lg:py-[20px]"
                >
                  <span className="text-lg text-black_333236 whitespace-nowrap">
                    {dashboard.title}
                  </span>
                  <span className="text-lg text-black_333236">
                    {inviter.nickname}
                  </span>
                  <div className="flex gap-x-[10px]">
                    <DashboardButton
                      mode="accept"
                      onClick={() => handlePutInvitation(id, true)}
                    />
                    <DashboardButton
                      mode="deny"
                      onClick={() => handlePutInvitation(id, false)}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </section>
  );
}
