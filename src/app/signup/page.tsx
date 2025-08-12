"use client";

import authLogo from "@/assets/auth_logo.svg";
import { LoginButton } from "@/components/common/Button/LoginButton";
import { LoginInput } from "@/components/common/Input/LoginInput";
import { validateFields } from "@/lib/utils/validateFields";
import Image from "next/image";
import checkboxDefault from "@/assets/checkbox_default.svg";
import checkboxActive from "@/assets/checkbox_active.svg";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SignupType } from "@/types/users";
import { postSignUp } from "@/lib/api/users";
import { useToastStore } from "@/lib/stores/toast";
import { useLoadingStore } from "@/lib/stores/loading";
import { isAxiosError } from "axios";

const SignUpPage = () => {
  const addToast = useToastStore.getState().addToast;
  const router = useRouter();
  const key = "signup";
  const start = useLoadingStore((s) => s.startLoading);
  const stop = useLoadingStore((s) => s.stopLoading);
  const isLoading = useLoadingStore((s) => s.loadingMap[key] ?? false);
  const [values, setValues] = useState({
    email: "",
    nickname: "",
    password: "",
    checkPassword: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    nickname: "",
    password: "",
    checkPassword: "",
  });
  const [agree, setAgree] = useState(false);

  const toggleAgree = () => setAgree((prev) => !prev);

  const handleBlur = (field: keyof typeof values) => {
    const error = validateFields({
      fields: field,
      value: values[field],
      values,
    });
    setErrors((prev) => ({ ...prev, [field]: error }));
  };

  const handleClickSignUp = async (data: SignupType) => {
    try {
      start(key);
      const { email, nickname, password } = data;
      await postSignUp({ email, nickname, password });
      addToast("회원가입에 성공했습니다.", "success");
      router.push("/login");
    } catch (error) {
      if (isAxiosError(error)) {
        addToast(error.response?.data.message || "회원 가입에 실패했습니다.");
      } else {
        addToast("알 수 없는 오류가 발생했습니다.");
      }
    } finally {
      stop(key);
    }
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
      key: "nickname",
      label: "닉네임",
      placeholder: "닉네임을 입력해 주세요",
      mode: "any",
    },
    {
      key: "password",
      label: "비밀번호",
      placeholder: "비밀번호를 입력해 주세요",
      mode: "password",
    },
    {
      key: "checkPassword",
      label: "비밀번호 ",
      placeholder: "비밀번호를 입력해 주세요",
      mode: "password",
    },
  ];

  return (
    <main className="bg-gray_FAFAFA">
      <div className="px-[12px] py-[70px] md:px-[110px] lg:px-0 flex flex-col items-center lg:max-w-[520px] lg:mx-auto">
        <div className="flex flex-col gap-y-[8px]">
          <Link href="/">
            <Image src={authLogo} alt="로고" />
          </Link>
          <span className="text-2lg text-black_333236">
            첫 방문을 환영합니다!
          </span>
        </div>

        <form
          className="mb-[24px] flex flex-col gap-y-[8px] w-full md:gap-y-[16px]"
          onSubmit={(e) => {
            e.preventDefault();
            handleClickSignUp(values);
          }}
        >
          {formFields.map(({ key, label, placeholder, mode }) => (
            <LoginInput
              key={key}
              mode={mode}
              value={values[key]}
              label={label}
              placeholder={placeholder}
              errorMessage={errors[key]}
              onChange={(value) =>
                setValues((prev) => ({ ...prev, [key]: value }))
              }
              onBlur={() => handleBlur(key)}
            />
          ))}
          <div className="flex gap-x-[8px] py-[8px] md:pt-0 md:py-[8px]">
            <button type="button" onClick={toggleAgree}>
              <Image
                src={agree ? checkboxActive : checkboxDefault}
                alt="체크박스"
                width={20}
                height={20}
              />
            </button>
            <span className="text-lg text-black_333236">
              이용약관에 동의합니다.
            </span>
          </div>
          <LoginButton
            disabled={
              isLoading ||
              !agree ||
              Object.values(errors).some((error) => error !== "")
            }
          >
            {isLoading ? "가입 중..." : "가입하기"}
          </LoginButton>
        </form>
        <div className="flex items-center gap-x-[5px]">
          <span className="text-lg text-black_333236">이미 회원이신가요?</span>
          <Link href="/login" className="text-lg text-violet_5534DA underline">
            로그인하기
          </Link>
        </div>
      </div>
    </main>
  );
};

export default SignUpPage;
