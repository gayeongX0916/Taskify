"use client";

import arrowDropdown from "@/assets/arrow_drop_down.svg";
import checkIcon from "@/assets/check_icon.svg";
import { Avatar } from "@/components/common/Avatar";
import Image from "next/image";
import { useState } from "react";

export function AssigneeDropdown() {
  const [value, setValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const exampleList = [
    "배유철",
    "배동석",
    "김나ㅏㄴ",
    "김나나나",
    "김떙떙",
    "박나네나",
  ];
  const [selected, setSelected] = useState<string | null>(null);

  const filteredList = (input: string) =>
    exampleList.filter((name) => name.includes(input));

  const handleOpenClick = () => {
    setIsOpen((prev) => !prev);
  };

  const handleSelectClick = (name: string) => {
    setSelected(name);
    setValue(name);
    setIsOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    setSelected(null);
    setIsOpen(e.target.value.length > 0 && filteredList(newValue).length > 0);
  };

  return (
    <div className="relative">
      <div className="flex items-center gap-x-[8px] px-[16px] py-[11px] rounded-[6px] border border-gray_D9D9D9 w-full">
        {selected && <Avatar username={selected} />}
        <input
          value={value}
          onChange={handleInputChange}
          placeholder="이름을 입력해 주세요"
          className="text-lg text-black_333236 flex-1 outline-none"
        />
        <button onClick={handleOpenClick}>
          <Image src={arrowDropdown} alt="드롭다운" />
        </button>
      </div>

      {isOpen && filteredList(value).length > 0 && (
        <div className="absolute bg-white_FFFFFF w-full px-[16px] py-[14px] flex flex-col gap-y-[11px] border border-gray_D9D9D9 rounded-[6px] mt-[2px] overflow-y-auto max-h-[300px]">
          {filteredList(value).map((name) => (
            <button
              key={name}
              className="flex gap-x-[8px]"
              onClick={() => handleSelectClick(name)}
            >
              {name === selected ? (
                <Image src={checkIcon} alt="체크" />
              ) : (
                <Image src={checkIcon} alt="빈 체크" className="invisible" />
              )}
              <div className="flex gap-x-[6px] items-center">
                <Avatar username={name} />
                <span className="text-lg text-black_333236">{name}</span>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
