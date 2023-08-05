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
  return (
    // <Box sx={{ height: "70vh", width: 700, margin: "auto", mt: 10, boxShadow: "0 0 15px 0 rgb(193 193 193)" }}>
    //   <Stack direction="column">
    //     <UserMenu />
    //     <NoteWarpper />
    //   </Stack>
    // </Box>
    <NoteWarpper />
  );
}
