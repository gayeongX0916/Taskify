"use client";

import Image from "next/image";
import calendarIcon from "@/assets/calendar_icon.svg";
import { Avatar } from "@/components/common/Avatar";
import { TagList } from "@/components/common/TagList";
import { useEffect, useState } from "react";
import { getCardType } from "@/types/cards";
import { getCardDetail } from "@/lib/api/cards";
import { useToastStore } from "@/lib/stores/toast";
import { useCardStore } from "@/lib/stores/card";
import { formatDate } from "@/lib/utils/formatDate";

type ColumnDetailCardProps = {
  cardId: number;
};

function CalendarDate({
  className,
  date,
}: {
  className?: string;
  date?: string;
}) {
  if (!date) return null;
  const formattedDate = new Date(date);

  return (
    <time className={`flex gap-x-[4px] items-center ${className}`}>
      <Image src={calendarIcon} alt="달력" />
      <span className="text-xs text-gray_787486">
        {formatDate(formattedDate)}
      </span>
    </time>
  );
}

export function ColumnDetailCard({ cardId }: ColumnDetailCardProps) {
  const addToast = useToastStore.getState().addToast;
  const [cardDetail, setCardDetail] = useState<getCardType>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getCardDetail({ cardId });
        setCardDetail(res.data);
      } catch (error) {
        addToast("카드 상세 조회에 실패했습니다.");
      }
    };
    fetchData();
  }, [cardId]);

  if (!cardDetail) return <div>로딩 중</div>;

  return (
    <article
      className={`rounded-[6px] px-[12px] pb-[5px] bg-white_FFFFFF border border-D9D9D9 flex flex-col gap-y-[4px] md:flex-row md:gap-x-[20px] md:px-[20px] lg:flex-col lg:gap-y-[16px]  ${
        cardDetail.imageUrl
          ? "pt-[12px] md:py-[16px]"
          : "pt-[5px] md:py-[14px] lg:py-[16px]"
      } `}
    >
      {cardDetail.imageUrl === null ? (
        <div className="hidden"></div>
      ) : (
        <div className="flex justify-center items-center">
          <Image
            src={cardDetail.imageUrl}
            alt="예시"
            width={260}
            height={150}
            className="md:w-[90px] md:h-[53px] lg:w-[274px] lg:h-[160px]"
          />
        </div>
      )}

      <section className="flex flex-col gap-y-[6px] md:gap-y-[10px] md:flex-[9]">
        <header>
          <h3 className="text-md md:text-lg text-black_333236">
            {cardDetail.title}
          </h3>
        </header>

        <div className="flex flex-col gap-y-[6px] md:flex-row md:gap-x-[18px] md:w-full md:justify-between lg:flex-col">
          <div className="flex md:gap-x-[16px] md:items-center">
            <TagList
              tags={cardDetail.tags}
              className="gap-y-[6px] gap-x-[6px]"
            />

            <CalendarDate
              className="hidden md:flex lg:hidden"
              date={cardDetail.createdAt}
            />
          </div>

          <div className="flex justify-between items-center">
            <CalendarDate
              className="md:hidden lg:flex"
              date={cardDetail.createdAt}
            />
            <Avatar username={cardDetail.assignee.nickname} />
          </div>
        </div>
      </section>
    </article>
  );
}
