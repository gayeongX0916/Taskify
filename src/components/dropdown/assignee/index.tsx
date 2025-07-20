"use client";

import arrowDropdown from "@/assets/arrow_drop_down.svg";
import checkIcon from "@/assets/check_icon.svg";
import Image from "next/image";
import { useState } from "react";

export function AssigneeDropdown() {
  const [value, setValue] = useState("");
  const exampleList = ["배유철", "배동석"];

  return (
    <div>
      <div className="relative">
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="이름을 입력해 주세요"
          className="px-[16px] py-[11px] rounded-[6px] text-lg text-gray_9FA6B2 border borer-gray_D9D9D9 w-full"
        />
        {value && (
          <button className="absolute right-[10px] bottom-[12px]">
            <Image src={arrowDropdown} alt="드롭다운" />
          </button>
        )}
      </div>
      {/* <div className="rouned-[8px] px-[16px] py-[14px] flex flex-col gap-y-[11px]">
        {exampleList.map((list) => (
          <div key={list} className="flex gap-x-[8px]">
            <Image src={checkIcon} alt="체크" />
            <button className="flex gap-x-[6px]">
              <div className="rounded-full bg-violet_8P flex justify-center items-center w-[26px] h-[26px]">
                B
              </div>
              <span className="text-lg text-black_333236">{list}</span>
            </button>
          </div>
        ))}
      </div> */}
    </div>
  );
}
