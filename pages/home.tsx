import React from "react";
import { useAppContext } from "@/context/state";
import { useRouter } from "next/router";
import UserMenu from "@/components/UserMenu";
import NoteWarpper from "@/components/NoteWrapper";
import { Box, Divider, Stack } from "@mui/material";

export default function Home() {
  const router = useRouter();
  // const { user } = useAppContext();

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const user = window.localStorage.getItem("user");
      if (!user) {
        router.push("/login");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <NoteWarpper />;
}
