import crownIcon from "@/assets/crown.svg";
import arrowRightIcon from "@/assets/arrow_right.svg";
import Image from "next/image";
import { dashboardColoMap } from "@/lib/utils/dashboardColorMap";

type DashboardNameCardProps = {
  name: string;
  isOwner: boolean;
  bgColor: string;
};

export function DashboardNameCard({
  name,
  isOwner,
  bgColor,
}: DashboardNameCardProps) {
  return (
    <button className="w-full flex justify-between items-center border border-gray_D9D9D9 rounded-[8px] px-[20px] py-[17px] lg:py-[22px] bg-white_FFFFFF">
      <div className="flex items-center gap-x-[16px]">
        <div
          className={`rounded-full w-[8px] h-[8px] ${dashboardColoMap[bgColor]}`}
        ></div>

        <div className="flex gap-x-[8px] items-center">
          <span className="text-md md:text-lg text-black_333236">{name}</span>
          {isOwner && <Image src={crownIcon} alt="주인" />}
        </div>
      </div>
      <Image src={arrowRightIcon} alt="이동" />
    </button>
  );
}
