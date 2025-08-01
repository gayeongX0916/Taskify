import addBoxWhiteIcon from "@/assets/add_box_white.svg";
import Image from "next/image";
import { ActionButton } from "@/components/common/Button/ActionButton";
import { PaginationButton } from "@/components/common/Button/PaginationButton";
import { Avatar } from "@/components/common/Avatar";

type MemberTableProps = {
  mode: "member" | "invite";
};

function InviteButton({ className }: { className?: string }) {
  return (
    <button
      className={`px-[12px] py-[4px] rounded-[4px] bg-violet_5534DA flex gap-x-[6px] items-center justify-center ${className}`}
    >
      <Image src={addBoxWhiteIcon} alt="초대하기" width={16} height={16} />
      <span className="text-white_FFFFFF text-xs md:text-md">초대하기</span>
    </button>
  );
}

export function MemberOrInviteTable({ mode }: MemberTableProps) {
  const inviteList = [
    "abc@naver.com",
    "bdc@naver.com",
    "fkdls@naver.com",
    "dkdkss@naver.com",
  ];

  const memberList = ["정만철", "김태순", "최주협", "윤지현"];

  return (
    <div className="bg-white_FFFFFF pt-[24px] px-[20px] pb-[12px] rounded-[8px] md:px-[26px] md:pt-[28px] md:pb-[20px]">
      <header className="flex justify-between mb-[18px] md:mb-[27px]">
        <h1 className="text-xl text-black_333236 font-bold md:text-2xl">
          {mode === "member" ? "구성원" : "초대 내역"}
        </h1>

        <div className="flex items-center gap-x-[12px] md:gap-x-[16px]">
          <span className="text-xs text-black_333236 md:text-md">
            1 페이지 중 1
          </span>
          <PaginationButton />
          {mode === "invite" && (
            <InviteButton className="hidden md:flex md:h-full md:w-[105px]" />
          )}
        </div>
      </header>

      <div
        className={`flex items-center justify-between ${
          mode === "member" ? "mb-[13px]" : "mb-[26px]"
        }`}
      >
        <span className="text-md md:text-lg text-gray_9FA6B2">
          {mode === "member" ? "이름" : "이메일"}
        </span>
        {mode === "invite" && <InviteButton className="flex md:hidden" />}
      </div>

      <div className="flex flex-col">
        {mode === "member"
          ? memberList.map((list) => (
              <div
                key={list}
                className="flex justify-between items-center py-[12px] border-b border-gray_EEEEEE"
              >
                <div className="flex gap-x-[8px] items-center">
                  <Avatar username={list} />
                  <span className="text-md text-black_333236 md:text-lg">
                    {list}
                  </span>
                </div>

                <ActionButton className="md:text-md">삭제</ActionButton>
              </div>
            ))
          : inviteList.map((list) => (
              <div
                key={list}
                className="flex justify-between items-center py-[12px] border-b border-gray_EEEEEE"
              >
                <span className="text-md text-black_333236 md:text-lg">
                  {list}
                </span>
                <ActionButton className="md:text-md">취소</ActionButton>
              </div>
            ))}
      </div>
    </div>
  );
}
