import { ModalButton } from "../common/Button/ModalButton";
import { BaseInput } from "../common/Input/BaseInput";

export function PasswordChange() {
  return (
    <div className="px-[16px] py-[16px] rounded-[8px]">
      <h1 className="text-2lg text-black_333236 font-bold mb-[40px] md:mb-[24px] md:text-2xl">
        비밀번호 변경
      </h1>
      <div className="flex flex-col gap-y-[16px] mb-[24px]">
        <BaseInput label="현재 비밀번호" placeholder="현재 비밀번호 입력" />
        <BaseInput label="새 비밀번호" placeholder="새 비밀번호 입력" />
        <BaseInput label="새 비밀번호 확인" placeholder="새 비밀번호 입력" />
      </div>
      <ModalButton mode="any">변경</ModalButton>
    </div>
  );
}
