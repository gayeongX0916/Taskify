"use client";

import { Header } from "@/components/Header";
import { SideMenu } from "@/components/SideMenu";
import { PaddingWrapper } from "@/components/common/PaddingWrapper";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SideMenu />
      <PaddingWrapper>
        <Header />
        <div>{children}</div>
      </PaddingWrapper>
    </>
  );
}
