import crownIcon from "@/assets/crown.svg";
import arrowRightIcon from "@/assets/arrow_right.svg";
import Image from "next/image";
import { dashboardColoMap } from "@/lib/utils/dashboardColor";
import { useDashboardStore } from "@/lib/stores/dashboard";

type DashboardNameCardProps = {
  dashboardId: number;
};

export function DashboardNameCard({ dashboardId }: DashboardNameCardProps) {
  const dashboard = useDashboardStore(
    (state) => state.dashboardsById[Number(dashboardId)]
  );

  // if (!dashboard) return null;

  return (
    <button className="w-full flex justify-between items-center border border-gray_D9D9D9 rounded-[8px] px-[20px] py-[17px] lg:py-[22px] bg-white_FFFFFF">
      <div className="flex items-center gap-x-[16px]">
        <div
          className={`rounded-full w-[8px] h-[8px] ${
            dashboardColoMap[dashboard.color]
          }`}
        ></div>

        <div className="flex gap-x-[8px] items-center">
          <span className="text-md md:text-lg text-black_333236">
            {dashboard.title}
          </span>
          {dashboard.createdByMe && <Image src={crownIcon} alt="주인" />}
        </div>
      </div>
      <Image src={arrowRightIcon} alt="이동" />
    </button>
  );
}
