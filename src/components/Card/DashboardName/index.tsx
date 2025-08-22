import crownIcon from "@/assets/crown.svg";
import arrowRightIcon from "@/assets/arrow_right.svg";
import Image from "next/image";
import { dashboardColoMap } from "@/lib/utils/dashboardColor";
import { useDashboardStore } from "@/lib/stores/dashboard";
import React from "react";

type DashboardNameCardProps = {
  dashboardId: number;
};

function DashboardNameCard({ dashboardId }: DashboardNameCardProps) {
  const dashboard = useDashboardStore(
    (state) => state.dashboardsById[Number(dashboardId)]
  );

  return (
    <button className="w-full flex justify-between items-center border border-gray_D9D9D9 rounded-[8px] px-[20px] py-[17px] lg:py-[22px] bg-white_FFFFFF">
      <div className="flex items-center gap-x-[16px] min-w-0">
        <div
          className={`rounded-full w-[8px] h-[8px] ${
            dashboard ? dashboardColoMap[dashboard.color] : ""
          }`}
        />

        <div className="flex items-center gap-x-[4px] min-w-0 flex-1">
          <span className="text-md md:text-lg text-black_333236 truncate">
            {dashboard.title}
          </span>
          {dashboard.createdByMe && (
            <Image src={crownIcon} alt="주인" className="shrink-0" />
          )}
        </div>
      </div>

      <Image src={arrowRightIcon} alt="이동" className="shrink-0" />
    </button>
  );
}

export default React.memo(DashboardNameCard);
