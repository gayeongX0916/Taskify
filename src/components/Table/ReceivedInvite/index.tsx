"use client";

import searchIcon from "@/assets/search_icon.svg";
import emptyDashboard from "@/assets/empty_dashboard.svg";
import Image from "next/image";
import { DashboardButton } from "@/components/common/Button/DashboardButton";
import { useEffect, useState } from "react";
import { getInvitationList, putInvitationAnswer } from "@/lib/api/invitations";
import { useToastStore } from "@/lib/stores/toast";
import { getInvitationType, putInvitationAnswerType } from "@/types/invite";
import { useLoadingStore } from "@/lib/stores/loading";
import { isAxiosError } from "axios";
import { useInviteStore } from "@/lib/stores/invite";
import { useRouter } from "next/navigation";
import { Spinner } from "@/components/common/Spinner";

type MobileInviteListProps = {
  name: string;
  invite: string;
  id: number;
  onRespond: (invitationId: number, accepted: boolean) => void;
  isLoading: boolean;
};

function MobileInviteList({
  name,
  invite,
  id,
  onRespond,
  isLoading,
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
        <DashboardButton
          mode="accept"
          onClick={() => onRespond(id, true)}
          isLoading={isLoading}
        />
        <DashboardButton
          mode="deny"
          onClick={() => onRespond(id, false)}
          isLoading={isLoading}
        />
      </div>
    </li>
  );
}

export function ReceivedInviteTable() {
  const key = "ReceivedInviteTable";
  const start = useLoadingStore((s) => s.startLoading);
  const stop = useLoadingStore((s) => s.stopLoading);
  const isLoading = useLoadingStore((s) => s.loadingMap[key] ?? true);
  const receivedInvites = useInviteStore((state) => state.receivedInvites);
  const setReceivedInvites = useInviteStore(
    (state) => state.setReceivedInvites
  );
  const removeReceivedInvite = useInviteStore(
    (state) => state.removeReceivedInvite
  );
  const addToast = useToastStore.getState().addToast;
  const router = useRouter();
  const [value, setValue] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        start(key);
        const res = await getInvitationList({ size: 6 });
        setReceivedInvites(res.data.invitations);
      } catch (error) {
        if (isAxiosError(error)) {
          addToast(
            error.response?.data.message ||
              "초대받은 목록을 불러오는데 실패했습니다."
          );
        } else {
          addToast("알 수 없는 오류가 발생했습니다.");
        }
      } finally {
        stop(key);
      }
    };
    fetchData();
  }, []);

  const filteredList = receivedInvites.filter((item) =>
    item.inviter.nickname.includes(value)
  );

  const handlePutInvitation = async (
    invitationId: number,
    inviteAccepted: boolean
  ) => {
    try {
      start(key);
      const res = await putInvitationAnswer({ invitationId, inviteAccepted });
      removeReceivedInvite(invitationId);
      if (inviteAccepted) {
        const dashboardId = res.data.dashboard.id;
        if (dashboardId) {
          router.push(`/dashboard/${dashboardId}`);
        }
      }
      addToast("초대 응답에 성공했습니다.", "success");
    } catch (error) {
      if (isAxiosError(error)) {
        addToast(error.response?.data.message || "초대 응답에 실패했습니다.");
      } else {
        addToast("알 수 없는 오류가 발생했습니다.");
      }
    } finally {
      stop(key);
    }
  };

  return (
    <section
      className={`flex flex-col bg-white_FFFFFF rounded-[16px] ${
        receivedInvites.length === 0
          ? "gap-y-[100px] md:gap-y-[60px] px-[20px] pt-[24px] pb-[80px] md:px-[40px]"
          : "px-[24px] py-[16px] md:px-[28px] md:py-[18px] lg:py-[32px] md:px-[28px] gap-y-[13px] md:gap-y-[24px]"
      }`}
    >
      <header className="flex flex-col gap-y-[16px] lg:gap-y-[32px]">
        <h1 className="text-lg text-black-333236 font-bold md:text-xl">
          초대받은 대시보드
        </h1>
        {receivedInvites.length > 0 && (
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

      {isLoading ? (
        <div className="flex justify-center pt-[30px]">
          <Spinner />
        </div>
      ) : receivedInvites.length === 0 ? (
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
                isLoading={isLoading}
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
                      isLoading={isLoading}
                    />
                    <DashboardButton
                      mode="deny"
                      onClick={() => handlePutInvitation(id, false)}
                      isLoading={isLoading}
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
