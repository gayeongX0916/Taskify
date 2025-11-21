"use client";

import LoginButton from "@/components/common/Button/LoginButton";
import LoginInput from "@/components/common/Input/LoginInput";
import { validateFields } from "@/lib/utils/validateFields";
import Image from "next/image";
import checkboxDefault from "@/assets/checkbox_default.svg";
import checkboxActive from "@/assets/checkbox_active.svg";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import authLogo from "@/assets/auth_logo.svg";
import { useRouter } from "next/navigation";
import { SignupType } from "@/types/users";
import { postSignUp } from "@/lib/api/users";
import { useLoadingStore } from "@/lib/stores/loading";
import { isAxiosError } from "axios";
import Link from "next/link";
import { toast } from "react-toastify";

type FieldKey = "email" | "nickname" | "password" | "checkPassword";

type FormField = {
  key: FieldKey;
  label: string;
  placeholder: string;
  mode: "text" | "password";
};

const AgreeCheckboxComponent = ({
  agree,
  toggleAgree,
}: {
  agree: boolean;
  toggleAgree: () => void;
}) => {
  return (
    <button type="button" onClick={toggleAgree}>
      <Image
        src={agree ? checkboxActive : checkboxDefault}
        alt="체크박스"
        width={20}
        height={20}
      />
    </button>
  );
};
const AgreeCheckbox = React.memo(AgreeCheckboxComponent);

const AuthLogoComponent = () => (
  <Link href="/">
    <Image src={authLogo} alt="로고" />
  </Link>
);
const AuthLogo = React.memo(AuthLogoComponent);

const SignUpPage = () => {
  const router = useRouter();
  const key = "signup";
  const start = useLoadingStore((s) => s.startLoading);
  const stop = useLoadingStore((s) => s.stopLoading);
  const isLoading = useLoadingStore((s) => s.loadingMap[key] ?? false);

  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [nicknameError, setNicknameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [checkPasswordError, setCheckPasswordError] = useState("");

  const [agree, setAgree] = useState(false);
  const toggleAgree = useCallback(() => setAgree((p) => !p), []);

  const valuesRef = useRef({
    email,
    nickname,
    password,
    checkPassword,
  });
  useEffect(() => {
    valuesRef.current = { email, nickname, password, checkPassword };
  }, [email, nickname, password, checkPassword]);

  const formFields: FormField[] = useMemo(
    () => [
      {
        key: "email",
        label: "이메일",
        placeholder: "이메일을 입력해 주세요",
        mode: "text",
      },
      {
        key: "nickname",
        label: "닉네임",
        placeholder: "닉네임을 입력해 주세요",
        mode: "text",
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
    ],
    []
  );

  const handleEmailChange = useCallback((v: string) => setEmail(v), []);
  const handleNicknameChange = useCallback((v: string) => setNickname(v), []);
  const handlePasswordChange = useCallback((v: string) => setPassword(v), []);
  const handleCheckPasswordChange = useCallback(
    (v: string) => setCheckPassword(v),
    []
  );

  const handleBlurEmail = useCallback(() => {
    const cur = valuesRef.current;
    const err = validateFields({
      fields: "email",
      value: cur.email,
    });
    setEmailError(err);
  }, []);

  const handleBlurNickname = useCallback(() => {
    const cur = valuesRef.current;
    const err = validateFields({
      fields: "nickname",
      value: cur.nickname,
    });
    setNicknameError(err);
  }, []);

  const handleBlurPassword = useCallback(() => {
    const cur = valuesRef.current;
    const err = validateFields({
      fields: "password",
      value: cur.password,
    });
    setPasswordError(err);
  }, []);

  const handleBlurCheckPassword = useCallback(() => {
    const cur = valuesRef.current;
    const err = validateFields({
      fields: "checkPassword",
      value: cur.checkPassword,
      values: cur,
    });
    setCheckPasswordError(err);
  }, []);

  const handleClickSignUp = async (data: SignupType) => {
    try {
      start(key);
      const { email: e, nickname: n, password: p } = data;
      await postSignUp({ email: e, nickname: n, password: p });
      toast.success("회원가입에 성공했습니다.");
      router.push("/login");
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(error.response?.data.message || "회원 가입에 실패했습니다.");
      } else {
        toast.error("알 수 없는 오류가 발생했습니다.");
      }
    } finally {
      stop(key);
    }
  };

  const values: Record<FieldKey, string> = {
    email: email,
    nickname: nickname,
    password: password,
    checkPassword: checkPassword,
  };

  const errors: Record<FieldKey, string | undefined> = {
    email: emailError,
    nickname: nicknameError,
    password: passwordError,
    checkPassword: checkPasswordError,
  };

  const onChanges: Record<FieldKey, (value: string) => void> = {
    email: handleEmailChange,
    nickname: handleNicknameChange,
    password: handlePasswordChange,
    checkPassword: handleCheckPasswordChange,
  };

  const onBlurs: Record<FieldKey, () => void> = {
    email: handleBlurEmail,
    nickname: handleBlurNickname,
    password: handleBlurPassword,
    checkPassword: handleBlurCheckPassword,
  };

  return (
    <main className="bg-gray_FAFAFA">
      <div className="px-[12px] py-[70px] md:px-[110px] lg:px-0 flex flex-col items-center lg:max-w-[520px] lg:mx-auto">
        <div className="flex flex-col gap-y-[8px]">
          <AuthLogo />
          <span className="text-2lg text-black_333236">
            첫 방문을 환영합니다!
          </span>
        </div>

        <form
          className="mb-[24px] flex flex-col gap-y-[8px] w-full md:gap-y-[16px]"
          onSubmit={(e) => {
            e.preventDefault();
            handleClickSignUp({ email, nickname, password });
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
              onChange={onChanges[key]}
              onBlur={onBlurs[key]}
            />
          ))}

          <div className="flex gap-x-[8px] py-[8px] md:pt-0 md:py-[8px]">
            <AgreeCheckbox agree={agree} toggleAgree={toggleAgree} />
            <span className="text-lg text-black_333236">
              이용약관에 동의합니다.
            </span>
          </div>

          <LoginButton
            disabled={
              isLoading ||
              !agree ||
              [
                emailError,
                nicknameError,
                passwordError,
                checkPasswordError,
              ].some((err) => err !== "")
            }
          >
            {isLoading ? "가입 중..." : "가입하기"}
          </LoginButton>
        </form>

        <div className="flex items-center gap-x-[5px]">
          <span className="text-lg text-black_333236">이미 회원이신가요?</span>
          <button
            onClick={() => router.push("/login")}
            className="text-lg text-violet_5534DA underline"
          >
            로그인하기
          </button>
        </div>
      </div>
    </main>
  );
};

export default SignUpPage;
