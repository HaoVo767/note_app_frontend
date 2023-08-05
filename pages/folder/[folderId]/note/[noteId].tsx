import React from "react";
import { useRouter } from "next/router";
import NoteWarpper from "@/components/NoteWrapper";

function NoteId() {
  const router = useRouter();
  const { noteId, folderId } = router.query;
  console.log("noteId", noteId);
  console.log("folderId ", folderId);
  return <NoteWarpper />;
}

export default NoteId;
