"use client";

import { usePathname } from "next/navigation";
import DefaultHeader from "../common/GNB/DefaultHeader";
import DashboardHeader from "../common/GNB/DashboardHeader";

export function Header() {
  const pathname = usePathname();

  const isAuthPage = pathname === "/login" || pathname === "/signup";
  const isMainPage = pathname === "/";

  if (isAuthPage) return null;

  return isMainPage ? (
    <DefaultHeader />
  ) : (
    <DashboardHeader dashboardName="비브리지" />
  );
}
