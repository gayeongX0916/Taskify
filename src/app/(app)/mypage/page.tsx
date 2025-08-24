"use client";

import { PasswordCard } from "@/components/Card/Password";
import { ProfileCard } from "@/components/Card/Profile";
import { BackButton } from "@/components/common/Button/BackButton";
import { useLoadingStore } from "@/lib/stores/loading";

const MyPage = () => {
  const start = useLoadingStore((s) => s.startLoading);
  const stop = useLoadingStore((s) => s.stopLoading);
  const isLoading = useLoadingStore(
    (s) => s.loadingMap["profile"] || s.loadingMap["password"] || false
  );

  return (
    <main className="bg-gray_FAFAFA pt-[16px] px-[12px] pb-[60px] md:px-[16px]">
      <div className="flex flex-col gap-y-[6px] md:gap-y-[29px] max-w-[670px]">
        <BackButton isLoading={isLoading} />
        <div className="flex flex-col gap-y-[16px] md:gap-y-[24px]">
          <ProfileCard isLoading={isLoading} start={start} stop={stop} />
          <PasswordCard isLoading={isLoading} start={start} stop={stop} />
        </div>
      </div>
    </main>
  );
};

export default MyPage;
