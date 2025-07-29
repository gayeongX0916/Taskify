import arrowRightNone from "@/assets/arrow_right_none.svg";
import arrowRight from "@/assets/arrow_right.svg";
import arrowLeftNone from "@/assets/arrow_left_none.svg";
import arrowLeft from "@/assets/arrow_left.svg";
import Image from "next/image";

type PaginationButtonProps = {
  className?: string;
};

export function PaginationButton({ className }: PaginationButtonProps) {
  return (
    <div className={`flex items-center ${className ?? ""}`}>
      <button className="w-[36px] h-[36px] flex justify-center items-center border border-gray_D9D9D9 rounded-l-[4px] md:w-[40px] md:h-[40px]">
        <Image src={arrowLeft} alt="이전" width={16} height={16} />
      </button>
      <button className="w-[36px] h-[36px] flex justify-center items-center border border-gray_D9D9D9 rounded-r-[4px] md:w-[40px] md:h-[40px]">
        <Image src={arrowRight} alt="다음" width={16} height={16} />
      </button>
    </div>
  );
}
