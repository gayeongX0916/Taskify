"use client";

import { useState } from "react";
import arrowDropdown from "@/assets/arrow_drop_down.svg";
import Image from "next/image";
import Chip from "@/components/common/Chip";
import checkIcon from "@/assets/check_icon.svg";
import { getColumnListType } from "@/types/columns";

type ProgressDropdownProps = {
  columnId: number;
  columnList: getColumnListType[];
  onSelect?: (columnId: number) => void;
};

export function ProgressDropdown({
  columnId,
  columnList,
  onSelect,
}: ProgressDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const initialTitle =
    columnList.find((col) => col.id === columnId)?.title || "";
  const [selected, setSelected] = useState<string>(initialTitle);

  const onToggleDropdown = () => setIsOpen((prev) => !prev);

  const handleSelectClick = (columnId: number, title: string) => {
    setSelected(title);
    setIsOpen(false);
    onSelect?.(columnId);
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
          {columnList.map((col) => (
            <button
              key={col.title}
              className="flex gap-x-[8px]"
              onClick={() => handleSelectClick(col.id, col.title)}
            >
              {col.title === selected ? (
                <Image src={checkIcon} alt="체크" />
              ) : (
                <Image src={checkIcon} alt="빈 체크" className="invisible" />
              )}
              <Chip name={col.title} key={col.title} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
