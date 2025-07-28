import { Dialog } from "@headlessui/react";
import Image from "next/image";
import { ReactNode } from "react";
import closeIcon from "@/assets/close_icon_gray.svg";

type BaseModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
};

export function BaseModal({
  isOpen,
  onClose,
  title,
  children,
}: BaseModalProps) {
  return (
    <Dialog open={isOpen} onClose={onClose}>
      <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center p-4">
        <div className="bg-white_FFFFFF px-[16px] py-[24px] rounded-[8px] min-w-[327px] w-full md:w-[568px]">
          <div className="flex justify-between items-center mb-[16px]">
            <h1 className="text-xl font-bold text-black_333236">{title}</h1>
            <button onClick={onClose}>
              <Image src={closeIcon} alt="닫기" />
            </button>
          </div>
          {children}
        </div>
      </div>
    </Dialog>
  );
}
