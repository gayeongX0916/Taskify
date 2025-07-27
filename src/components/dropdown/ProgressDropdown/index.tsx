"use client";

import { useState } from "react";
import arrowDropdown from "@/assets/arrow_drop_down.svg";
import Image from "next/image";
import { Chip } from "@/components/common/Chip";
import checkIcon from "@/assets/check_icon.svg";

type ProgressDropdownProps = {
  initialValue?: string;
};

export function ProgressDropdown({ initialValue }: ProgressDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const exampleList = ["To Do", "On Progress", "Done"];
  const [selected, setSelected] = useState<string | null>(initialValue || null);

  const onToggleDropdown = () => setIsOpen((prev) => !prev);

  const handleSelectClick = (name: string) => {
    setSelected(name);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <div className="flex items-center justify-between gap-x-[8px] px-[16px] py-[11px] rounded-[6px] border border-gray_D9D9D9 w-full">
        {selected && <Chip name={selected} />}
        <button onClick={onToggleDropdown} className="flex-shrink-0">
          <Image src={arrowDropdown} alt="드롭다운" width={26} height={26} />
        </button>
      </div>

      {isOpen && (
        <div className="absolute bg-white_FFFFFF w-full px-[16px] py-[14px] flex flex-col gap-y-[11px] border border-gray_D9D9D9 rounded-[6px] mt-[2px] overflow-y-auto max-h-[300px] z-[10]">
          {exampleList.map((list) => (
            <button
              className="flex gap-x-[8px]"
              onClick={() => handleSelectClick(list)}
            >
              {list === selected ? (
                <Image src={checkIcon} alt="체크" />
              ) : (
                <Image src={checkIcon} alt="빈 체크" className="invisible" />
              )}
              <Chip name={list} key={list} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
