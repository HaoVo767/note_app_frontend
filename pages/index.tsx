import React, { useEffect } from "react";
import { useRouter } from "next/router";

export default function HomePage() {
  const router = useRouter();
  useEffect(() => {
    router.push("/login");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return;
}
