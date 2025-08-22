"use client";

import Image from "next/image";
import logoWhite from "@/assets/logo_white.svg";
import logoTitleWhite from "@/assets/logo_title_white.svg";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/stores/auth";
import { useDashboardStore } from "@/lib/stores/dashboard";
import { useUserStore } from "@/lib/stores/user";

export default function DefaultHeader() {
  const router = useRouter();
  const accessToken = useAuthStore((s) => s.accessToken);
  const clearAuth = useAuthStore((s) => s.clearAuth);
  const resetDashboard = useDashboardStore((s) => s.reset);
  const resetUser = useUserStore((s) => s.reset);

  const handleGotoHome = () => router.push("/");

  const handleLogout = () => {
    clearAuth();
    resetDashboard();
    resetUser();
  };

  return (
    <header className="bg-black_000000 flex justify-between items-center px-[24px] py-[16px] md:px-[40px] md:py-[15px] lg:px-[80px]">
      <button className="flex md:hidden" onClick={handleGotoHome}>
        <Image src={logoWhite} alt="로고" />
      </button>
      <button className="hidden md:flex" onClick={handleGotoHome}>
        <Image src={logoTitleWhite} alt="로고" width={121} height={39} />
      </button>

      <div className="flex gap-x-[24px] text-white_FFFFFF text-md md:text-lg md:gap-x-[36px]">
        {accessToken ? (
          <button onClick={handleLogout}>로그아웃</button>
        ) : (
          <>
            <button onClick={() => router.push("/login")}>로그인</button>
            <button onClick={() => router.push("/signup")}>회원가입</button>
          </>
        )}
      </div>
    </header>
  );
}
