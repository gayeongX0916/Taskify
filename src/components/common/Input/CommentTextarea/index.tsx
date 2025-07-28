'use client'

import { useState } from "react";
import { ActionButton } from "../../Button/ActionButton";

export function CommentTextarea() {
  const [value, setValue] = useState("");

  return (
    <div className="flex flex-col gap-y-[4px]">
      <label className="text-lg text-black_333236">댓글</label>
      <div className="flex relative">
        <textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="댓글 작성하기"
          className="w-full px-[12px] py-[12px] rounded-[6px] border border-gray_D9D9D9 resize-none text-md text-black_171717 focus:outline-none focus:border-violet_5534DA lg:px-[16px] lg:py-[16px]"
        />
        <ActionButton className="absolute right-[12px] bottom-[12px]">
          입력
        </ActionButton>
      </div>
    </div>
  );
}
