import arrowRightNone from "@/assets/arrow_right_none.svg";
import arrowRight from "@/assets/arrow_right.svg";
import arrowLeftNone from "@/assets/arrow_left_none.svg";
import arrowLeft from "@/assets/arrow_left.svg";
import Image from "next/image";

type PaginationButtonProps = {
  className?: string;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export function PaginationButton({
  className,
  currentPage,
  totalPages,
  onPageChange,
}: PaginationButtonProps) {
  const canPrev = currentPage > 1;
  const canNext = currentPage < totalPages;

  if (!canPrev && !canNext) return null;

  return (
    <div className={`flex items-center ${className ?? ""}`}>
      <button
        disabled={!canPrev}
        onClick={() => canPrev && onPageChange(currentPage - 1)}
        className="w-[36px] h-[36px] flex justify-center items-center border border-gray_D9D9D9 rounded-l-[4px] md:w-[40px] md:h-[40px]"
      >
        <Image
          src={canPrev ? arrowLeft : arrowLeftNone}
          alt="이전"
          width={16}
          height={16}
        />
      </button>
      <button
        disabled={!canNext}
        onClick={() => canNext && onPageChange(currentPage + 1)}
        className="w-[36px] h-[36px] flex justify-center items-center border border-gray_D9D9D9 rounded-r-[4px] md:w-[40px] md:h-[40px]"
      >
        <Image
          src={canNext ? arrowRight : arrowRightNone}
          alt="다음"
          width={16}
          height={16}
        />
      </button>
    </div>
  );
}
