import Image from "next/image";
import logoWhite from "@/assets/logo_white.svg";
import logoTitleWhite from "@/assets/logo_title_white.svg";

export default function DefaultHeader() {
  return (
    <header className="bg-black_000000 flex justify-between items-center px-[24px] py-[16px] md:px-[40px] md:py-[15px] lg:px-[80px]">
      <button className="flex md:hidden">
        <Image src={logoWhite} alt="로고" width={24} height={28} />
      </button>
      <button className="hidden md:flex">
        <Image src={logoTitleWhite} alt="로고" width={121} height={39} />
      </button>

      <div className="flex gap-x-[24px] text-white_FFFFFF text-md md:text-lg md:gap-x-[36px]">
        <button>로그인</button>
        <button>회원가입</button>
      </div>
    </header>
  );
}
