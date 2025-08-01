import { ModalButton } from "@/components/common/Button/ModalButton";
import { BaseInput } from "@/components/common/Input/BaseInput";
import { useState } from "react";

export function PasswordCard() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");

  return (
    <div className="bg-white_FFFFFF px-[16px] py-[16px] rounded-[8px]">
      <h1 className="text-2lg text-black_333236 font-bold mb-[40px] md:mb-[24px] md:text-xl">
        비밀번호 변경
      </h1>
      <div className="flex flex-col gap-y-[16px]">
        <BaseInput
          label="현재 비밀번호"
          placeholder="현재 비밀번호 입력"
          mode="any"
          value={currentPassword}
          onChange={setCurrentPassword}
        />
        <BaseInput
          label="새 비밀번호"
          placeholder="새 비밀번호 입력"
          mode="any"
          value={newPassword}
          onChange={setNewPassword}
        />
        <BaseInput
          label="새 비밀번호 확인"
          placeholder="새 비밀번호 입력"
          mode="any"
          value={checkPassword}
          onChange={setCheckPassword}
        />
      </div>
      {newPassword !== checkPassword && (
        <span className="text-md text-red_D6173A">
          비밀번호를 다시 확인해주세요.
        </span>
      )}
      <div className="mt-[24px]">
        <ModalButton mode="any" disabled={newPassword !== checkPassword}>
          변경
        </ModalButton>
      </div>
    </div>
  );
}
