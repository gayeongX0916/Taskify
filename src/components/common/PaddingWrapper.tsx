"use client";

import { usePathname } from "next/navigation";

export function PaddingWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const isAuthPage = pathname === "/login" || pathname === "signup";
  const isMainPage = pathname === "/";

  return (
    <div
      className={
        isMainPage || isAuthPage ? "" : "pl-[67px] md:pl-[160px] lg:pl-[300px]"
      }
    >
      {children}
    </div>
  );
}
