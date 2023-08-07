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

  const BASE_URL = baseURL;
  console.log("BASE_URL", BASE_URL);
  // React.useEffect(() => {
  //   fetch(`${baseURL}/getNote/${folderId}`)
  //     .then((response) => response.json())
  //     .then((result) => console.log("data ", result))
  //     .catch((err) => console.log("error ", err));
  // }, [folderId]);

  return (
    <Grid container sx={{ height: "90%" }}>
      <Grid item xs={3} sx={{ ml: 2 }}>
        {/* <Box sx={{ height: "80%", overflowY: "auto" }}>
          {note.map(({ noteContent, noteId }) => (
            <Link href={`/folder/${folderId}/note/${noteId}`} key={noteId} style={{ textDecoration: "none" }}>
              <Card sx={{ backgroundColor: noteId === nId ? "#e0f2f1" : null, height: 70 }}>
                <CardContent sx={{ overflowX: "hidden" }}>
                  <div
                    style={{ fontSize: "14px", fontWeight: "600" }}
                    dangerouslySetInnerHTML={{ __html: `${noteContent.substring(0, 40)}` || "Empty" }}
                  ></div>
                </CardContent>
              </Card>
              <Divider />
            </Link>
          ))}
        </Box> */}
      </Grid>
      <Grid item xs={8} sx={{ ml: 2 }}>
        <NoteEditor />
      </Grid>
    </Grid>
  );
}

export default NoteList;
