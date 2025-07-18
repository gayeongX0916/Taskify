"use client";

import { useState } from "react";
import arrowDropdown from "@/assets/arrow_drop_down.svg";
import Image from "next/image";
import { Chip } from "@/components/chip";

export function ProgressDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const exampleList = ["To Do", "On Progress", "Done"];

  const onToggleDropdown = () => setIsOpen((prev) => !prev);

  return (
    <div>
      <div className="relative">
        <div
          className={`rounded-[6px] hover:border hover:border-violet_5534DA px-[16px] py-[8px] ${
            isOpen ? "border border-violet_5534DA" : ""
          }`}
        >
          <Chip list="To Do" />
        </div>
        <button
          className="absolute right-[10px] bottom-[12px]"
          onClick={onToggleDropdown}
        >
          <Image src={arrowDropdown} alt="드롭다운" />
        </button>
      </div>
      {isOpen && (
        <div className="rouned-[8px] px-[16px] py-[8px] flex flex-col gap-y-[16px]">
          {exampleList.map((list) => (
            <Chip list={list} key={list} />
          ))}
        </div>
      )}
    </div>
  );
}
