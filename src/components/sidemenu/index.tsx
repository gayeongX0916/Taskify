"use client";

import Image from "next/image";
import logoTitlePurple from "@/assets/logo_title_purple.svg";
import logoPurple from "@/assets/logo_purple.svg";
import addBoxIcon from "@/assets/add_box.svg";
import crownIcon from "@/assets/crown.svg";
import { useParams, usePathname, useRouter } from "next/navigation";
import { CreateDashboardModal } from "../Modal/CreateDashboard";
import { useCallback, useEffect, useMemo, useState } from "react";
import { getDashboardList } from "@/lib/api/dashboards";
import { useLoadingStore } from "@/lib/stores/loading";
import { isAxiosError } from "axios";
import { useToastStore } from "@/lib/stores/toast";
import { Skeleton } from "../common/Skeleton";
import PaginationButton from "../common/Button/PaginationButton";
import { useAuthStore } from "@/lib/stores/auth";
import { useDashboardStore } from "@/lib/stores/dashboard";
import { dashboardColoMap } from "@/lib/utils/dashboardColor";

const PAGE_SIZE = 10;

const LogoTitle = (
  <Image src={logoTitlePurple} alt="로고" className="hidden md:flex" />
);
const LogoMobile = (
  <Image src={logoPurple} alt="모바일 로고" className="flex md:hidden" />
);
const AddBoxIcon = <Image src={addBoxIcon} alt="추가" width={20} height={20} />;
const CrownIcon = <Image src={crownIcon} alt="주인" />;

export function SideMenu() {
  const pathname = usePathname();
  const skip =
    pathname === "/" || pathname === "/login" || pathname === "/signup";
  const { dashboardId } = useParams();
  const dashboardIdNum = Number(dashboardId);
  const addToast = useToastStore.getState().addToast;
  const key = "SideMenu";
  const start = useLoadingStore((s) => s.startLoading);
  const stop = useLoadingStore((s) => s.stopLoading);
  const isLoading = useLoadingStore((s) => s.loadingMap[key] ?? false);
  const accessToken = useAuthStore((s) => s.accessToken);
  const router = useRouter();

  const dashboardsById = useDashboardStore((s) => s.dashboardsById);
  const orderedIds = useDashboardStore((s) => s.orderedIds);
  const totalCount = useDashboardStore((s) => s.totalCount);
  const mergeListPage = useDashboardStore((s) => s.mergeListPage);

  const [isOpen, setIsOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(totalCount / PAGE_SIZE);

  const fetchData = useCallback(async () => {
    if (skip) return;
    if (!accessToken) return;
    try {
      start(key);
      const res = await getDashboardList({ page, size: PAGE_SIZE });
      mergeListPage(res.data.dashboards, res.data.totalCount);
    } catch (error) {
      if (isAxiosError(error)) {
        addToast(
          error.response?.data.message ||
            "대시보드 목록 불러오기에 실패했습니다."
        );
      } else {
        addToast("알 수 없는 오류가 발생했습니다.");
      }
    } finally {
      stop(key);
    }
  }, [page, addToast, mergeListPage, start, stop, accessToken, skip]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => setSelectedId(dashboardIdNum || null), [dashboardIdNum]);

  useEffect(() => {
    setPage(1);
    fetchData();
  }, [accessToken, fetchData]);

  const pageIds = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    const end = start + PAGE_SIZE;
    return orderedIds.slice(start, end);
  }, [orderedIds, page]);

  const filled = useMemo(
    () =>
      Array.from({ length: PAGE_SIZE }).map(
        (_, i) =>
          dashboardsById[pageIds[i]] || { id: `empty-${i}`, isEmpty: true }
      ),
    [pageIds, dashboardsById]
  );

  if (skip) return null;

  return (
    <nav className="fixed top-0 left-0 w-[67px] md:w-[160px] lg:w-[300px] pt-[20px] px-[13px] lg:pl-[8px] lg:pr-[12px] border-r border-gray_D9D9D9 h-screen">
      <CreateDashboardModal isOpen={isOpen} onClose={() => setIsOpen(false)} />

      <header
        className="mb-[38px] flex justify-center md:mb-[56px] lg:justify-start cursor-pointer"
        onClick={() => router.push("/")}
      >
        {LogoTitle}
        {LogoMobile}
      </header>

      <section className="flex flex-col gap-y-[22px] md:gap-y-[16px] mb-[32px]">
        <div className="flex justify-center md:justify-between md:items-center">
          <span className="hidden md:block md:text-xs md:text-gray_787486 md:font-semibold">
            Dash Boards
          </span>
          <button onClick={() => setIsOpen(true)}>{AddBoxIcon}</button>
        </div>

        <ul className="flex flex-col items-center md:gap-y-[8px] md:items-start gap-y-[6px] md:w-full">
          {filled.map((item) => (
            <li key={item.id} className="md:w-full">
              <div className="relative w-[40px] h-[40px] md:w-full">
                {!item.isEmpty && (
                  <button
                    className={`flex w-[40px] h-[40px] justify-center items-center md:w-full md:h-full md:gap-x-[16px] md:hover:bg-violet_8P md:hover:rounded-[4px] md:px-[10px] md:py-[7px] md:justify-start lg:px-[12px] lg:py-[12px] md:min-w-0 md:flex-1 ${
                      Number(item.id) === selectedId
                        ? "bg-violet_8P rounded-[4px]"
                        : ""
                    }`}
                    onClick={() => {
                      router.push(`/dashboard/${item.id}`);
                      setSelectedId(Number(item.id));
                    }}
                    disabled={isLoading}
                  >
                    <div
                      className={`${
                        dashboardColoMap[dashboardsById[item.id].color]
                      } rounded-full min-w-[8px] min-h-[8px] shrink-0`}
                    />
                    <div className="hidden md:flex md:gap-x-[6px] md:min-w-0 md:flex-1">
                      <span className="text-lg text-gray_787486 whitespace-nowrap lg:text-2lg truncate">
                        {dashboardsById[item.id].title}
                      </span>
                      {dashboardsById[item.id].createdByMe && CrownIcon}
                    </div>
                  </button>
                )}
                {isLoading && <Skeleton />}
              </div>
            </li>
          ))}
        </ul>
      </section>

      <div className="hidden md:flex">
        <PaginationButton
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      </div>
    </nav>
  );
}
