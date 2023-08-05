import React from "react";
import { Grid, Typography } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";

function NoteList({ folder }: { folder: { note: any[] } }) {
  const { note } = folder;
  const router = useRouter();
  const { folderId } = router.query;
  return (
    <Grid container>
      <Grid item xs={4}>
        {note.map(({ noteName, noteId }) => (
          <Link href={`/folder/${folderId}/${noteId}`} key={noteId}>
            <Typography>{noteName}</Typography>
          </Link>
        ))}
      </Grid>
      <Grid item xs={8}></Grid>
    </Grid>
  );
}

export default NoteList;
