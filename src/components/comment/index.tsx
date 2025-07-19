export function Comment() {
  return (
    <div className="flex gap-x-[10px]">
      <div className="w-[34px] h-[34px] rounded-full flex justify-center items-center">
        C
      </div>
      <div className="flex flex-col gap-y-[6px]">
        <div className="flex gap-x-[8px] items-center">
          <span className="text-md font-semibold text-black_333236">
            정만철
          </span>
          <span className="text-xs text-gray_9FA6B2">2022.12.27 14:00</span>
        </div>
        <span className="text-md text-black_333236">오늘 안에 가능?</span>
        <div className="flex gap-x-[14px]">
          <button className="text-xs text-gray_9FA6B2 underline">수정</button>
          <button className="text-xs text-gray_9FA6B2 underline">삭제</button>
        </div>
      </div>
    </div>
  );
}
