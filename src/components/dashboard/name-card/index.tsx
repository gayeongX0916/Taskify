import crownIcon from "@/assets/crown.svg";
import arrowRightIcon from "@/assets/arrow_right.svg";
import Image from "next/image";

export function NameCard() {
  return (
    <button className="w-full flex justify-between items-center  border border-gray_D9D9D9 rounded-[8px] px-[20px] py-[17px] md:py-[22px]">
      <div className="flex items-center gap-x-[16px]">
        <span>*</span>
        <div className="flex gap-x-[8px] items-center">
          <span className="text-lg text-black_333236">비브리지</span>
          <Image src={crownIcon} alt="주인" />
        </div>
      </div>
      <Image src={arrowRightIcon} alt="이동" />
    </button>
  );
}
