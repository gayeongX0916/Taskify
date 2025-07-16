import Image from "next/image";
import settingIcon from "@/assets/setting_icon.svg";
import addBoxIcon from "@/assets/add_box.svg";
import exampleIcon from "@/assets/crown.svg";

export default function DashboardHeader() {
  return (
    <header className="flex items-center justify-between pl-[84px] pr-[8px] py-[15px] md:pl-[200px] md:pr-[80px] md:py-[19px] lg:pl-[340px] ">
      <h1 className="text-lg font-bold text-black_333236 md:text-xl">
        내 대시보드
      </h1>
      <div className="flex items-center">
        <div className="flex gap-x-[6px] md:gap-x-[16px]">
          <button className="px-[12px] py-[3px] text-md text-gray_787486 border border-gray_D9D9D9 rounded-[6px] flex items-center gap-x-[8px] md:text-lg md:px-[16px] md:py-[7px]">
            <Image
              src={settingIcon}
              alt="관리"
              width={15}
              height={15}
              className="hidden md:flex"
            />
            관리
          </button>
          <button className="px-[12px] py-[6px] text-md text-gray_787486 border border-gray_D9D9D9 rounded-[6px] flex items-center gap-x-[8px] md:text-lg md:px-[16px] md:py-[7px]">
            <Image
              src={addBoxIcon}
              alt="초대하기"
              width={15}
              height={15}
              className="hidden md:flex"
            />
            초대하기
          </button>
        </div>
        <div className="h-[34px] border-l border-gray_D9D9D9 mx-[16px] md:mx-[32px] lg:mx-[36px]"></div>
        <div className="flex items-center gap-x-[12px]">
          <Image
            alt="프로필"
            src={exampleIcon}
            width={34}
            height={34}
            className="rounded-full"
          />
          <span className="hidden md:flex md:text-lg md:text-black_333236">
            배유철
          </span>
        </div>
      </div>
    </header>
  );
}
