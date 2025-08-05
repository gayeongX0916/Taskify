import { Avatar } from "@/components/common/Avatar";

type AssigneeCardProps = {
  name: string;
  date: string;
};

export function AssigneeCard({ name, date }: AssigneeCardProps) {
  return (
    <section className="flex mt-[10px] mb-[16px] md:flex-col md:gap-y-[16px] border border-gray_D9D9D9 rounded-[8px] px-[16px] py-[9px] justify-around md:py-[13px] md:pl-[16px] w-full md:w-[200px] md:h-full md:mb-0 md:mt-0">
      <div className="flex flex-col gap-y-[6px]">
        <span className="text-xs font-semibold">담당자</span>
        <div className="flex gap-x-[8px] items-center">
          <Avatar
            username={name}
            className="w-[26px] h-[26px] text-xs md:text-lg md:w-[34px] md:h-[34px]"
          />
          <span className="text-xs md:text-md text-black_333236">{name}</span>
        </div>
      </div>

      <div className="flex flex-col gap-y-[8px] md:gap-y-[6px]">
        <span className="text-xs font-semibold">마감일</span>
        <span className="text-xs md:text-md text-black_333236">{date}</span>
      </div>
    </section>
  );
}
