"use client";

import arrowDropdown from "@/assets/arrow_drop_down.svg";
import checkIcon from "@/assets/check_icon.svg";
import Avatar from "@/components/common/Avatar";
import { useDashboardStore } from "@/lib/stores/dashboard";
import Image from "next/image";
import { useParams } from "next/navigation";
import React from "react";
import { useEffect, useState } from "react";

type AssigneeDropdownProps = {
  initialUserId?: number;
  onSelect?: (userId: number) => void;
};

function AssigneeDropdown({ initialUserId, onSelect }: AssigneeDropdownProps) {
  const { dashboardId } = useParams();
  const dashboardNum = Number(dashboardId);
  const dashboardMemberList = useDashboardStore(
    (state) => state.membersByDashboardId[dashboardNum]
  );
  const [value, setValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (initialUserId && dashboardMemberList.length > 0) {
      const initialNickname =
        dashboardMemberList.find((member) => member.userId === initialUserId)
          ?.nickname || "";
      setValue(initialNickname);
      setIsEditing(false);
    }
  }, [initialUserId, dashboardMemberList]);

  const filteredList = (input: string) =>
    dashboardMemberList.filter((member) => member.nickname.includes(input));

  const handleOpenClick = () => {
    setIsOpen((prev) => !prev);
  };

  const handleSelectClick = (userId: number, name: string) => {
    setValue(name);
    setIsOpen(false);
    setIsEditing(false);
    onSelect?.(userId);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    setIsOpen(e.target.value.length > 0 && filteredList(newValue).length > 0);
  };

  const isSelected = dashboardMemberList.find(
    (member) => member.nickname === value
  );

  return (
    <div className="relative">
      <div className="flex items-center gap-x-[8px] px-[16px] py-[11px] rounded-[6px] border border-gray_D9D9D9 w-full">
        {isSelected && !isEditing ? (
          <button
            className="flex items-center gap-x-[8px]"
            onClick={() => setIsEditing(true)}
          >
            <Avatar username={value} className="w-[32px] h-[32px] text-md" />
            <span>{value}</span>
          </button>
        ) : (
          <>
            <input
              value={value}
              onChange={handleInputChange}
              placeholder="이름을 입력해 주세요"
              className="text-lg text-black_333236 flex-1 min-w-0 outline-none"
            />
            <button onClick={handleOpenClick} className="flex-shrink-0">
              <Image
                src={arrowDropdown}
                alt="드롭다운"
                width={26}
                height={26}
              />
            </button>
          </>
        )}
      </div>

      {isOpen && filteredList(value).length > 0 && (
        <div className="absolute bg-white_FFFFFF w-full px-[16px] py-[14px] flex flex-col gap-y-[11px] border border-gray_D9D9D9 rounded-[6px] mt-[2px] overflow-y-auto max-h-[300px]">
          {filteredList(value).map(({ userId, nickname }, idx) => (
            <button
              key={idx}
              className="flex gap-x-[8px]"
              onClick={() => handleSelectClick(userId, nickname)}
            >
              {nickname === value ? (
                <Image src={checkIcon} alt="체크" />
              ) : (
                <Image src={checkIcon} alt="빈 체크" className="invisible" />
              )}
              <div className="flex gap-x-[6px] items-center">
                <Avatar username={nickname} />
                <span className="text-lg text-black_333236">{nickname}</span>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default React.memo(AssigneeDropdown);
