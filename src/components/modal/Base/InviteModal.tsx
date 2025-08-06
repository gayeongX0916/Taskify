import { ModalProps } from "@/types/ModalProps";
import { BaseModal } from ".";
import { ModalButton } from "@/components/common/Button/ModalButton";
import { useState } from "react";
import { postInviteDashboard } from "@/lib/api/dashboards";
import { postInviteDashboardType } from "@/types/dashboards";
import { useToastStore } from "@/lib/stores/toast";

interface InviteMoalProps extends ModalProps {
  dashboardId: number;
}

export function InviteModal({ isOpen, onClose, dashboardId }: InviteMoalProps) {
  const [value, setValue] = useState("");
  const addToast = useToastStore.getState().addToast;

  const handleInviteDashboard = async (data: postInviteDashboardType) => {
    try {
      await postInviteDashboard(data);
    } catch {
      addToast("대시보드 초대에 실패했습니다.");
    }
  };

  return (
    <BaseModal isOpen={isOpen} onClose={onClose} title="초대하기">
      <div className="flex flex-col gap-y-[8px] mb-[24px]">
        <span className="text-lg text-black_333236">이메일</span>
        <input
          className="px-[16px] py-[15px] rounded-[8px] border border-gray_D9D9D9"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
      <div className="flex gap-x-[7px]">
        <ModalButton mode="cancel" onClick={onClose}>
          취소
        </ModalButton>
        <ModalButton
          mode="any"
          onClick={() =>
            handleInviteDashboard({ dashboardId: dashboardId, email: value })
          }
        >
          생성
        </ModalButton>
      </div>
    </BaseModal>
  );
}
