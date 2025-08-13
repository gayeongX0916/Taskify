"use client";

import Image from "next/image";
import calendarIcon from "@/assets/calendar_icon.svg";
import { Avatar } from "@/components/common/Avatar";
import { TagList } from "@/components/common/TagList";
import { useToastStore } from "@/lib/stores/toast";
import { useCardStore } from "@/lib/stores/card";
import { formatDate } from "@/lib/utils/formatDate";

type ColumnDetailCardProps = {
  dashboardId: number;
  columnId: number;
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

export function ColumnDetailCard({
  dashboardId,
  columnId,
  cardId,
}: ColumnDetailCardProps) {
  const cardList = useCardStore(
    (state) => state.cardsByDashboard?.[dashboardId]?.[columnId] ?? []
  );
  const card = cardList.find((c) => c.id === cardId);
  const addToast = useToastStore.getState().addToast;

  if (!card) {
    addToast("카드를 찾을 수 없습니다.");
    return null;
  }

  return (
    <article
      className={`rounded-[6px] px-[12px] pb-[5px] bg-white_FFFFFF border border-D9D9D9 flex flex-col gap-y-[4px] md:flex-row md:gap-x-[20px] md:px-[20px] lg:flex-col lg:gap-y-[16px]  ${
        card.imageUrl
          ? "pt-[12px] md:py-[16px]"
          : "pt-[5px] md:py-[14px] lg:py-[16px]"
      } `}
    >
      {card.imageUrl && (
        <Image
          src={card.imageUrl}
          alt="예시"
          width={290}
          height={168}
          className="w-full h-full mt-[32px] md:mt-[16px] lg:mt-[8px] md:w-[420px] md:h-[246px] lg:w-[445px] lg:h-[260px]"
        />
      )}

      <section className="flex flex-col gap-y-[6px] md:gap-y-[10px] md:flex-[9]">
        <header>
          <h3 className="text-md md:text-lg text-black_333236">{card.title}</h3>
        </header>

        <div className="flex flex-col gap-y-[6px] md:flex-row md:gap-x-[18px] md:w-full md:justify-between lg:flex-col">
          <div className="flex md:gap-x-[16px] md:items-center">
            <TagList tags={card.tags} className="gap-y-[6px] gap-x-[6px]" />

            <CalendarDate
              className="hidden md:flex lg:hidden"
              date={card.createdAt}
            />
          </div>

          <div className="flex justify-between items-center">
            <CalendarDate className="md:hidden lg:flex" date={card.createdAt} />
            <Avatar username={card.assignee.nickname} />
          </div>
        </div>
      </section>
    </article>
  );
}
