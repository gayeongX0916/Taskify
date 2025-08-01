"use client";

import Image from "next/image";
import calendarIcon from "@/assets/calendar_icon.svg";
import { Avatar } from "@/components/common/Avatar";
import { TagList } from "@/components/common/TagList";

type ColumnDetailCardProps = {
  img?: string | undefined;
  title: string;
  tags: string[];
  username: string;
  date: Date;
};

function CalendarDate({ className, date }: { className?: string; date: Date }) {
  const formatted = date.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  return (
    <time className={`flex gap-x-[4px] items-center ${className}`}>
      <Image src={calendarIcon} alt="달력" />
      <span className="text-xs text-gray_787486">{formatted}</span>
    </time>
  );
}

export function ColumnDetailCard({
  img,
  title,
  tags,
  username,
  date,
}: ColumnDetailCardProps) {
  return (
    <article
      className={`rounded-[6px] px-[12px] pb-[5px] bg-white_FFFFFF border border-D9D9D9 flex flex-col gap-y-[4px] md:flex-row md:gap-x-[20px] md:px-[20px] lg:flex-col lg:gap-y-[16px]  ${
        img ? "pt-[12px] md:py-[16px]" : "pt-[5px] md:py-[14px] lg:py-[16px]"
      } `}
    >
      {img && (
        <div className="flex justify-center items-center">
          <Image
            src={img}
            alt="예시"
            width={260}
            height={150}
            className="md:w-[90px] md:h-[53px] lg:w-[274px] lg:h-[160px]"
          />
        </div>
      )}

      <section className="flex flex-col gap-y-[6px] md:gap-y-[10px] md:flex-[9]">
        <header>
          <h3 className="text-md md:text-lg text-black_333236">{title}</h3>
        </header>

        <div className="flex flex-col gap-y-[6px] md:flex-row md:gap-x-[18px] md:w-full md:justify-between lg:flex-col">
          <div className="flex md:gap-x-[16px] md:items-center">
            <TagList tags={tags} className="gap-y-[6px] gap-x-[6px]" />

            <CalendarDate className="hidden md:flex lg:hidden" date={date} />
          </div>

          <div className="flex justify-between items-center">
            <CalendarDate className="md:hidden lg:flex" date={date} />
            <Avatar username={username} />
          </div>
        </div>
      </section>
    </article>
  );
}
