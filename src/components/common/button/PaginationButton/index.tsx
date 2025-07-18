import arrowRightNone from "@/assets/arrow_right_none.svg";
import arrowRight from "@/assets/arrow_right.svg";
import arrowLeftNone from "@/assets/arrow_left_none.svg";
import arrowLeft from "@/assets/arrow_left.svg";
import Image from "next/image";

export function PaginationButton() {
  return (
    <div className="hidden md:flex md:mt-[24px] lg:mt-[32px]">
      <button className="w-[40px] h-[40px] flex justify-center items-center border border-gray_D9D9D9 rounded-l-[4px]">
        <Image src={arrowLeft} alt="이전" width={16} height={16} />
      </button>
      <button className="md:w-[40px] md:h-[40px] md:flex md:justify-center md:items-center border border-gray_D9D9D9 rounded-r-[4px]">
        <Image src={arrowRight} alt="다음" width={16} height={16} />
      </button>
    </div>
  );
}
