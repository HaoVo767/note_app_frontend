import { Box, Divider, Grid, Stack, Typography } from "@mui/material";
import React from "react";
import ForlersList from "../FoldersList";
import UserMenu from "../UserMenu";
import NoteList from "../NoteList";
import { useAppContext } from "@/context/state";
import { IFolder } from "../interface";
// import { baseURL } from "@/constants/baseURL";

function NoteWarpper() {
  const { user } = useAppContext();
  const [foldersList, setFoldersList] = React.useState<IFolder[]>();
  // console.log("dotevn ", baseURL as string);
  React.useEffect(() => {
    const baseURL = "http://localhost/5000";
    fetch(`http://localhost/5000/getFolders/${user?.id ? user.id.toString() : "3"}`)
      .then((response) => response.json())
      .then((data) => setFoldersList(data.result))
      .catch((err) => console.log("err ", err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box sx={{ height: "70vh", width: 1000, margin: "auto", mt: 10, boxShadow: "0 0 15px 0 rgb(193 193 193)" }}>
      <Stack direction="column">
        <UserMenu />
        <Stack height={"90%"}>
          <Grid container>
            <Grid item xs={3}>
              <Stack height={"90%"}>
                <Typography variant="h6" sx={{ textAlign: "center" }}>
                  Plan list
                </Typography>
                <Divider />
                <ForlersList foldersList={foldersList} />
              </Stack>
            </Grid>
            <Grid item xs={9} sx={{ height: "70vh" }}>
              <Typography variant="h6" sx={{ textAlign: "center" }}>
                Note list
              </Typography>
              <Divider />
              <NoteList />
            </Grid>
          </Grid>
        </Stack>
      </Stack>
    </Box>
  );
}

export default NoteWarpper;
