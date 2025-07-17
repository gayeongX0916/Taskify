export function CommentTextarea() {
  return (
    <div className="flex flex-col gap-y-[4px]">
      <label className="text-lg text-black_333236">댓글</label>
      <div className="flex relative">
        <textarea
          placeholder="댓글 작성하기"
          className="w-full px-[12px] py-[12px] rounded-[6px] border border-gray_D9D9D9 resize-none text-md text-black_171717 focus:outline-none focus:border-violet_5534DA lg:px-[16px] lg:py-[16px]"
        />
        <button className="border border-gray_D9D9D9 rounded-[4px] px-[31px] py-[5px] text-xs text-violet_5534DA absolute right-[12px] bottom-[12px] md:py-[7px]">
          입력
        </button>
      </div>
    </div>
  );
}
