import { ModalButton } from "@/components/common/Button/ModalButton";
import { ModalProps } from "@/types/ModalProps";
import { Dialog } from "@headlessui/react";

export function ConfirmPasswordModal({ isOpen, onClose }: ModalProps) {
  return (
    <Dialog open={isOpen} onClose={onClose}>
      <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center p-4">
        <section className="bg-white_FFFFFF px-[40px] py-[32px] rounded-[16px] min-w-[272px] w-full md:w-[368px] flex flex-col gap-y-[32px]">
          <span className="text-lg text-black_333236 text-center md:text-xl">
            비밀번호가 일치하지 않습니다.
          </span>
          <ModalButton mode="any" onClick={onClose}>
            확인
          </ModalButton>
        </section>
      </div>
    </Dialog>
  );
}
