import React from "react";
import { Card, CardContent, Divider, Grid, Typography, Stack, Box } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import NoteEditor from "../NoteEditor";
import { INote } from "../interface";
import { baseURL } from "@/constants/baseURL";

function NoteList() {
  const router = useRouter();
  const [notes, setNotes] = React.useState<INote[]>([]);
  const { noteId: nId, folderId } = router.query;

  React.useEffect(() => {
    const accessToken = `Bearer ${localStorage.getItem("accessToken")}`;
    fetch(`${baseURL}/getNote/${folderId}`, {
      headers: { Authorization: accessToken || "", Accept: "application/json" },
    })
      .then((response) => response.json())
      .then((data) => {
        setNotes(data.result);
      })
      .catch((err) => console.log("error ", err));
  }, [folderId]);

  return (
    <Grid container sx={{ height: "90%" }}>
      <Grid item xs={3} sx={{ ml: 2 }}>
        <Box sx={{ height: "80%", overflowY: "auto" }}>
          {notes
            ? notes.map(({ noteContent, noteId, createdAt }) => (
                <Link href={`/folder/${folderId}/note/${noteId}`} key={noteId} style={{ textDecoration: "none" }}>
                  <Card sx={{ backgroundColor: noteId === Number(nId) ? "#e0f2f1" : null, height: 70 }}>
                    <CardContent sx={{ overflowX: "hidden" }}>
                      <div
                        style={{ fontSize: "14px", fontWeight: "600" }}
                        dangerouslySetInnerHTML={{ __html: `${noteContent.substring(0, 40)}` || "Empty" }}
                      ></div>
                      <Typography sx={{ textAlign: "right", fontSize: 14 }}>
                        {new Date(createdAt).toLocaleDateString().replaceAll("/", "-")}
                      </Typography>
                    </CardContent>
                  </Card>
                  <Divider />
                </Link>
              ))
            : null}
        </Box>
      </Grid>
      <Grid item xs={8} sx={{ ml: 2 }}>
        <NoteEditor />
      </Grid>
    </Grid>
  );
}

export default NoteList;
