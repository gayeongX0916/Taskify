"use client";

import Image from "next/image";
import logoTitlePurple from "@/assets/logo_title_purple.svg";
import logoPurple from "@/assets/logo_purple.svg";
import addBoxIcon from "@/assets/add_box.svg";
import crownIcon from "@/assets/crown.svg";
import { PaginationButton } from "../common/Button/PaginationButton";
import { usePathname, useRouter } from "next/navigation";
import { CreateDashboardModal } from "../Modal/CreateDashboard";
import { useEffect, useState } from "react";
import { getDashboardList } from "@/lib/api/dashboards";
import { dashboardColoMap } from "@/lib/utils/dashboardColor";
import { getDashboardListType } from "@/types/dashboards";

export function SideMenu() {
  const [dashboardList, setDashboardList] = useState<getDashboardListType[]>(
    []
  );
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getDashboardList();
        setDashboardList(res.data.dashboards);
      } catch (error: any) {
        setError("대시보드를 불러오는 중 오류가 발생했습니다.");
      }
    };
    fetchData();
  }, []);

  if (pathname === "/login" || pathname === "/signup" || pathname === "/") {
    return null;
  }

  return (
    <nav className="fixed top-0 left-0 w-[67px] md:w-[160px] lg:w-[300px] pt-[20px] px-[13px] lg:pl-[8px] lg:pr-[12px] border-r border-gray_D9D9D9 h-screen">
      <CreateDashboardModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
      <header
        className="mb-[38px] flex justify-center md:mb-[56px] lg:justify-start cursor-pointer"
        onClick={() => router.push("/")}
      >
        <Image src={logoTitlePurple} alt="로고" className="hidden md:flex" />
        <Image src={logoPurple} alt="모바일 로고" className="flex md:hidden" />
      </header>
      <section className="flex flex-col gap-y-[22px] md:gap-y-[16px] mb-[32px]">
        <div className="flex justify-center md:justify-between md:items-center">
          <span className="hidden md:block md:text-xs md:text-gray_787486 md:font-semibold">
            Dash Boards
          </span>
          <button onClick={() => setIsOpen(true)}>
            <Image src={addBoxIcon} alt="추가" width={20} height={20} />
          </button>
        </div>
        <ul className="flex flex-col items-center md:gap-y-[8px] md:items-start gap-y-[6px] md:w-full">
          {dashboardList.map(({ title, color, createdByMe }) => (
            <li key={title} className="md:w-full">
              <button className="flex w-[40px] h-[40px] justify-center items-center md:w-full md:gap-x-[16px]  md:hover:bg-violet_8P md:hover:rounded-[4px] md:px-[10px] md:py-[7px] md:justify-start lg:px-[12px] lg:py-[12px]">
                <div
                  className={`${dashboardColoMap[color]} rounded-full w-[8px] h-[8px]`}
                ></div>
                <div className="hidden md:flex md:gap-x-[6px]">
                  <span className="text-lg text-gray_787486 whitespace-nowrap lg:text-2lg">
                    {title}
                  </span>
                  {createdByMe && <Image src={crownIcon} alt="주인" />}
                </div>
              </button>
            </li>
          ))}
        </ul>
      </section>
      <div className="hidden md:flex">
        <PaginationButton />
      </div>
    </nav>
  );
}
