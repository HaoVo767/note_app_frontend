import React from "react";
import { useRouter } from "next/router";
import NoteWarpper from "@/components/NoteWrapper";

function NoteId() {
  const router = useRouter();
  return <NoteWarpper />;
}

export default NoteId;
