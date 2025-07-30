import Image from "next/image";
import settingIcon from "@/assets/setting_icon.svg";
import { AddButton } from "@/components/common/Button/AddButton";
import { ColumnDetailCard } from "../ColumnDetail";

type ColumnCardProps = {
  count: number;
  columnName: string;
};

export function ColumnCard({ count, columnName }: ColumnCardProps) {
  return (
    <section className="px-[12px] py-[16px] flex flex-col">
      <header className="flex items-center justify-between mb-[24px]">
        <div className="flex items-center gap-x-[8px]">
          <div className="w-[8px] h-[8px] bg-violet_5534DA rounded-full"></div>
          <div className="flex items-center gap-x-[12px]">
            <h1 className="text-lg font-bold md:text-2lg">{columnName}</h1>
            <span className="bg-gray_EEEEEE rounded-[4px] px-[6px] py-[3px] text-xs text-gray_787486">
              {count}
            </span>
          </div>
        </div>

        <button>
          <Image
            src={settingIcon}
            alt="컬럼 관리"
            width={22}
            height={22}
            className="md:w-[24px] md:h-[24px]"
          />
        </button>
      </header>

      <div className="mb-[10px]">
        <AddButton
          mode="todo"
          className="w-full h-[32px] md:h-[40px] py-[6px] md:py-[9px]"
        />
      </div>
      <div className="mb-[24px] flex flex-col md:gap-y-[16px] lg:gap-y-[6px]">
        <ColumnDetailCard />
        <ColumnDetailCard />
      </div>
      {/* {cards.map((card, index) => (
        <div key={card.id} className={index > 0 ? "hidden md:block" : ""}>
          <ColumnDetailCard {...card} />
        </div>
      ))} */}

      <footer>
        <hr className="border-b border-gray_EEEEEE h-[1px]" />
      </footer>
    </section>
  );
}
