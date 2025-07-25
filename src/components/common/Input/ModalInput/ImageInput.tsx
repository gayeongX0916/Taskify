import Image from "next/image";
import { useRef } from "react";
import plusIcon from "@/assets/plus_icon.svg";

type ImageInputProps = {
  label: string;
};

export function ImageInput({ label }: ImageInputProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInputClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex flex-col gap-y-[8px]">
      <span className="text-lg text-black_333236">{label}</span>
      <button
        className="w-[76px] h-[76px] bg-[#F5F5F5] flex justify-center items-center"
        onClick={handleInputClick}
      >
        <Image src={plusIcon} alt="추가" />
      </button>
      <input type="file" ref={fileInputRef} className="hidden" />
    </div>
  );
}
