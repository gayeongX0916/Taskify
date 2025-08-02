import { ModalButton } from "@/components/common/Button/ModalButton";
import { ModalProps } from "@/types/ModalProps";
import { Dialog } from "@headlessui/react";
import { ReactNode } from "react";

type AuthModal = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  onConfirm?: () => void;
};

export function AuthModal({ isOpen, onClose, children, onConfirm }: AuthModal) {
  const handleClick = () => {
    if (onConfirm) onConfirm();
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center p-4">
        <section className="bg-white_FFFFFF px-[40px] py-[32px] rounded-[16px] min-w-[272px] w-full md:w-[368px] flex flex-col gap-y-[20px]">
          <span className="text-lg text-black_333236 text-center">
            {children}
          </span>
          <ModalButton
            mode="any"
            onClick={handleClick}
            className="px-[46px] py-[10px]"
          >
            확인
          </ModalButton>
        </section>
      </div>
    </Dialog>
  );
}
