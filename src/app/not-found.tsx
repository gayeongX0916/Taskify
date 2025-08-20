"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-3xl font-bold">페이지를 찾을 수 없습니다</h2>
      <p className="mt-2">잘못된 경로이거나 삭제된 페이지입니다.</p>
      <Link href="/" className="mt-4 text-blue-500 underline">
        홈으로 이동
      </Link>
    </div>
  );
}
