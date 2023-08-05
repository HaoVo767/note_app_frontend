import React from "react";
import { useRouter } from "next/router";
import NoteWarpper from "@/components/NoteWrapper";

function DetailFolder() {
  const router = useRouter();
  const { folderId } = router.query;
  return <NoteWarpper />;
}

export default DetailFolder;
