"use client";

import { useState } from "react";
import authLogo from "@/assets/auth_logo.svg";
import Link from "next/link";
import Image from "next/image";
import { LoginInput } from "@/components/common/Input/LoginInput";
import { validateFields } from "@/lib/utils/validateFields";
import { LoginButton } from "@/components/common/Button/LoginButton";
import { postLogin } from "@/lib/api/auth";
import { useAuthStore } from "@/lib/stores/auth";
import { LoginType } from "@/types/auth";
import { useRouter } from "next/navigation";
import { useToastStore } from "@/lib/stores/toast";
import { useLoadingStore } from "@/lib/stores/loading";
import { isAxiosError } from "axios";

const loginPage = () => {
  const setAuth = useAuthStore.getState().setAuth;
  const addToast = useToastStore.getState().addToast;
  const key = "login";
  const start = useLoadingStore((s) => s.startLoading);
  const stop = useLoadingStore((s) => s.stopLoading);
  const isLoading = useLoadingStore((s) => s.loadingMap[key] ?? false);
  const router = useRouter();
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

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

  const handleBlur = (field: keyof typeof values) => {
    const error = validateFields({
      fields: field,
      value: values[field],
      values,
    });
    setErrors((prev) => ({ ...prev, [field]: error }));
  };

  const handleClickLogin = async (data: LoginType) => {
    try {
      start(key);
      const response = await postLogin(data);
      const token = response.data.accessToken;
      const userId = response.data.user.id;
      setAuth(token, userId);
      addToast("로그인에 성공했습니다.", "success");
      router.push("/mydashboard");
    } catch (error) {
      if (isAxiosError(error)) {
        addToast(error.response?.data.message || "로그인에 실패했습니다.");
      } else {
        addToast("알 수 없는 오류가 발생했습니다.");
      }
    } finally {
      stop(key);
    }
  };

  const handleClickGuestLogin = async () => {
    try {
      start(key);
      const email = "test@naver.com";
      const password = "1234567890";
      const res = await postLogin({ email, password });
      setAuth(res.data.accessToken, res.data.userId);
      addToast("게스트 로그인에 성공했습니다.", "success");
      router.push("/mydashboard");
    } catch (error) {
      if (isAxiosError(error)) {
        addToast(
          error.response?.data.message || "게스트 로그인에 실패했습니다."
        );
      } else {
        addToast("알 수 없는 오류가 발생했습니다.");
      }
    } finally {
      stop(key);
    }
  };

  return (
    <main className="bg-gray_FAFAFA">
      <div className="px-[12px] py-[70px] md:px-[110px] lg:px-0 flex flex-col items-center lg:max-w-[520px] lg:mx-auto">
        <div className="flex flex-col gap-y-[8px]">
          <Link href="/">
            <Image src={authLogo} alt="로고" />
          </Link>
          <span className="text-2lg text-black_333236">
            오늘도 만나서 반가워요!
          </span>
        </div>

        <form
          className="mb-[24px] flex flex-col gap-y-[8px] w-full md:gap-y-[16px]"
          onSubmit={(e) => {
            e.preventDefault();
            handleClickLogin(values);
          }}
        >
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
              isLoading ||
              Object.values(values).some((v) => v === "") ||
              Object.values(errors).some((e) => e !== "")
            }
          >
            {isLoading ? "로그인 중..." : "로그인"}
          </LoginButton>
        </form>
        <div className="flex items-center gap-x-[5px]">
          <span className="text-lg text-black_333236">회원이 아니신가요?</span>
          <Link
            href="/signup"
            className="text-lg text-violet_5534DA hover:underline"
          >
            회원가입하기
          </Link>
          <div className="border-l-2 border-black_333236 h-5 mx-[4px]"></div>
          <button
            type="button"
            className="text-lg text-[#008000] hover:underline"
            onClick={handleClickGuestLogin}
          >
            게스트 로그인
          </button>
        </div>
      </div>
    </main>
  );
};

export default loginPage;
