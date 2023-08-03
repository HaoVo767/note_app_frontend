import React from "react";
import { useAppContext } from "@/context/state";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  const { user } = useAppContext();
  React.useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);
  return <div>Home</div>;
}
