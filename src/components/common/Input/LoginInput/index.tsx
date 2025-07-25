"use client";

import visibilityOffIcon from "@/assets/visibility_off.svg";
import visibilityIcon from "@/assets/visibility.svg";
import Image from "next/image";
import { useState } from "react";

type LoginInputProps = {
  mode: "email" | "password";
  errorMessage?: string;
};

export function LoginInput({ mode, errorMessage }: LoginInputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = mode === "password";

  const togglePassword = () => setShowPassword((prev) => !prev);

  return (
    <div className="flex flex-col relative gap-y-[8px]">
      <label className="text-lg text-black_333236">
        {isPassword ? "비밀번호" : "이메일"}
      </label>
      <input
        type={isPassword ? (showPassword ? "text" : "password") : "email"}
        placeholder={
          isPassword ? "비밀번호를 입력하세요" : "이메일을 입력하세요"
        }
        className="border border-gray_D9D9D9 rounded-[8px] px-[16px] py-[12px] focus:outline-none focus:border-violet_5534DA"
      />
      {errorMessage && (
        <span className="text-md text-red_D6173A">{errorMessage}</span>
      )}
      {isPassword && (
        <button
          onClick={togglePassword}
          className="absolute top-[45px] right-[20px]"
        >
          <Image
            src={showPassword ? visibilityIcon : visibilityOffIcon}
            alt={showPassword ? "숨기기" : "보기"}
            width={24}
            height={24}
          />
        </button>
      )}
    </div>
  );
}