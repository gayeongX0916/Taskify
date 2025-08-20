import { ModalProps } from "@/types/ModalProps";
import { BaseModal } from ".";
import ModalButton from "@/components/common/Button/ModalButton";
import { useCallback, useState } from "react";
import { postInviteDashboard } from "@/lib/api/dashboards";
import { postInviteDashboardType } from "@/types/dashboards";
import { useToastStore } from "@/lib/stores/toast";
import { useLoadingStore } from "@/lib/stores/loading";
import { isAxiosError } from "axios";
import { useInviteStore } from "@/lib/stores/invite";
import React from "react";

interface InviteMoalProps extends ModalProps {
  dashboardId: number;
}

function InviteModal({ isOpen, onClose, dashboardId }: InviteMoalProps) {
  const addToast = useToastStore.getState().addToast;
  const key = "InviteModal";
  const start = useLoadingStore((s) => s.startLoading);
  const stop = useLoadingStore((s) => s.stopLoading);
  const isLoading = useLoadingStore((s) => s.loadingMap[key] ?? false);
  const addSentInvite = useInviteStore((s) => s.addSentInvite);
  const [value, setValue] = useState("");

  const handleInviteDashboard = useCallback(
    async (data: postInviteDashboardType) => {
      try {
        start(key);
        const res = await postInviteDashboard(data);
        addSentInvite({
          email: res.data.invitee.email,
          invitationId: res.data.id,
        });
        setValue("");
        addToast("대시보드 초대에 성공했습니다.", "success");
        onClose();
      } catch (error) {
        if (isAxiosError(error)) {
          addToast(
            error.response?.data.message || "대시보드 초대에 실패했습니다."
          );
        } else {
          addToast("알 수 없는 오류가 발생했습니다.");
        }
      } finally {
        stop(key);
      }
    },
    [addToast, onClose, addSentInvite]
  );

  const handleClose = useCallback(() => {
    onClose();
    setValue("");
  }, [onClose]);

  return (
    <BaseModal isOpen={isOpen} onClose={handleClose} title="초대하기">
      <div className="flex flex-col gap-y-[8px] mb-[24px]">
        <span className="text-lg text-black_333236">이메일</span>
        <input
          className="px-[16px] py-[15px] rounded-[8px] border border-gray_D9D9D9"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
      <div className="flex gap-x-[7px]">
        <ModalButton mode="cancel" onClick={handleClose} disabled={isLoading}>
          취소
        </ModalButton>
        <ModalButton
          mode="any"
          onClick={() =>
            handleInviteDashboard({
              dashboardId,
              email: value.trim(),
            })
          }
          disabled={isLoading}
        >
          {isLoading ? "초대 중..." : "초대"}
        </ModalButton>
      </div>
    </BaseModal>
  );
}

export default React.memo(InviteModal);
