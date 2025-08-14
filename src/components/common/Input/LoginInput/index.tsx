"use client";

import visibilityOffIcon from "@/assets/visibility_off.svg";
import visibilityIcon from "@/assets/visibility.svg";
import Image from "next/image";
import React, { useState } from "react";

type LoginInputProps = {
  mode: "text" | "password";
  value: string;
  label: string;
  placeholder: string;
  errorMessage?: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
};

function LoginInput({
  mode,
  label,
  value,
  placeholder,
  errorMessage,
  onChange,
  onBlur,
}: LoginInputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = mode === "password";

  const togglePassword = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="flex flex-col relative gap-y-[8px]">
      <label className="text-lg text-black_333236">{label}</label>
      <input
        type={isPassword ? (showPassword ? "text" : "password") : "text"}
        placeholder={placeholder}
        className={`border border-gray_D9D9D9 rounded-[8px] pl-[16px] pr-[48px] py-[12px] focus:outline-none focus:border-violet_5534DA ${
          errorMessage && "border border-red_D6173A"
        }`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
      />
      {errorMessage && (
        <span className="text-md text-red_D6173A">{errorMessage}</span>
      )}
      {isPassword && (
        <button
          type="button"
          onClick={togglePassword}
          className="absolute top-[47px] right-[20px] flex justify-center items-center"
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

export default React.memo(LoginInput);
