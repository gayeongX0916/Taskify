"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { attachInterceptors } from "@/lib/api/axios";

export default function ClientBootstrap() {
  const router = useRouter();

  useEffect(() => {
    const detach = attachInterceptors(router);
    return () => detach?.();
  }, [router]);

  return null;
}
