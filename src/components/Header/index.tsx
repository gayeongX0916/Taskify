"use client";

import { usePathname } from "next/navigation";
import DefaultHeader from "../common/gnb/DefaultHeader";
import DashboardHeader from "../common/gnb/DashboardHeader";

export function Header() {
  const pathname = usePathname();

  const isAuthPage = pathname === "/login" || pathname === "signup";
  const isMainPage = pathname === "/";

  if (isAuthPage) return null;

  return isMainPage ? (
    <DefaultHeader />
  ) : (
    <DashboardHeader dashboardName="비브리지" />
  );
}
