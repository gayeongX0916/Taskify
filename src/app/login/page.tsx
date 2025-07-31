"use client";

import { AuthModal } from "@/components/Modal/Auth";
import { useState } from "react";
import authLogo from "@/assets/auth_logo.svg";
import Link from "next/link";
import Image from "next/image";
import { LoginInput } from "@/components/common/Input/LoginInput";
import { validateFields } from "@/utils/validateFields";
import { LoginButton } from "@/components/common/Button/LoginButton";

const loginPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const handleBlur = (field: keyof typeof values) => {
    const error = validateFields({
      fields: field,
      value: values[field],
      values,
    });
    setErrors((prev) => ({ ...prev, [field]: error }));
  };

  const formFields: {
    key: keyof typeof values;
    label: string;
    placeholder: string;
    mode: "any" | "password";
  }[] = [
    {
      key: "email",
      label: "이메일",
      placeholder: "이메일을 입력해 주세요",
      mode: "any",
    },
    {
      key: "password",
      label: "비밀번호",
      placeholder: "비밀번호를 입력해 주세요",
      mode: "password",
    },
  ];

  return (
    <main className="bg-gray_FAFAFA">
      <AuthModal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        {modalMessage}
      </AuthModal>
      <div className="px-[12px] py-[70px] md:px-[110px] lg:px-0 flex flex-col items-center lg:max-w-[520px] lg:mx-auto">
        <div className="flex flex-col gap-y-[8px]">
          <Link href="/">
            <Image src={authLogo} alt="로고" />
          </Link>
          <span className="text-2lg text-black_333236">
            오늘도 만나서 반가워요!
          </span>
        </div>

        <form className="mb-[24px] flex flex-col gap-y-[8px] w-full md:gap-y-[16px]">
          {formFields.map(({ key, label, placeholder, mode }) => (
            <LoginInput
              key={key}
              label={label}
              placeholder={placeholder}
              mode={mode}
              value={values[key]}
              errorMessage={errors[key]}
              onChange={(value) =>
                setValues((prev) => ({ ...prev, [key]: value }))
              }
              onBlur={() => handleBlur(key)}
            />
          ))}
          <LoginButton
            disabled={
              Object.values(values).some((v) => v === "") ||
              Object.values(errors).some((e) => e !== "")
            }
          >
            로그인
          </LoginButton>
        </form>
        <div className="flex items-center gap-x-[5px]">
          <span className="text-lg text-black_333236">회원이 아니신가요?</span>
          <Link href="/signup" className="text-lg text-violet_5534DA underline">
            회원가입하기
          </Link>
        </div>
      </div>
    </main>
  );
};

export default loginPage;
