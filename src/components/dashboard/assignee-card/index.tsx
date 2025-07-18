export function AssigneeCard() {
  return (
    <div className="flex md:flex-col md:gap-y-[16px] border border-gray_D9D9D9 rounded-[8px] px-[16px] py-[9px] justify-around md:py-[13px] md:pl-[16px] md:pr-[56px] w-full">
      <div className="flex flex-col md:gap-y-[6px]">
        <span className="text-xs font-semibold">담당자</span>
        <div className="flex gap-x-[8px] items-center">
          <div className="w-[26px] h-[26px] flex items-center justify-center rounded-full md:w-[34px] md:h-[34px] bg-violet_5534DA">
            B
          </div>
          <span className="text-xs md:text-md text-black_333236">배유철</span>
        </div>
      </div>
      <div className="flex flex-col gap-y-[8px] md:gap-y-[6px]">
        <span className="text-xs font-semibold">마감일</span>
        <span className="text-xs md:text-md text-black_333236">
          2022.12.30 19:00
        </span>
      </div>
    </div>
  );
}
