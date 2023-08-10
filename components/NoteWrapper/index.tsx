import { Box, Divider, Grid, Stack, Typography } from "@mui/material";
import React from "react";
import ForlersList from "../FoldersList";
import UserMenu from "../UserMenu";
import NoteList from "../NoteList";
import { useAppContext } from "@/context/state";
import { IFolder } from "../interface";
import { baseURL } from "@/constants/baseURL";
import AddNewPlan from "../AddNewPlan";
import AddNewNote from "../AddNewNote";
import { useRouter } from "next/router";

function NoteWarpper() {
  const { addItem, onChangeState } = useAppContext();
  const [foldersList, setFoldersList] = React.useState<IFolder[]>();
  const router = useRouter();
  const { folderId, noteId } = router.query;
  React.useEffect(() => {
    const accessToken = `Bearer ${localStorage.getItem("accessToken")}`;
    fetch(`${baseURL}/getFolders`, {
      headers: { Authorization: accessToken || " ", Accept: "application/json" },
    })
      .then((response) => response.json())
      .then((data) => {
        try {
          setFoldersList(data.result);
          onChangeState({ addItem: false });
        } catch (err) {
          alert("Phiên đăng nhập hết hạn");
        }
      })
      .catch((err) => console.log("err ", err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addItem]);

  return (
    <Box sx={{ height: "70vh", width: 1000, margin: "auto", mt: 10, boxShadow: "0 0 15px 0 rgb(193 193 193)" }}>
      <Stack direction="column">
        <UserMenu />
        <Stack height={"90%"}>
          <Grid container>
            <Grid item xs={3}>
              <Stack height={"90%"}>
                <Stack direction={"row"} sx={{ justifyContent: "space-between" }}>
                  <Typography variant="h6" sx={{ ml: 2 }}>
                    Plan list
                  </Typography>
                  <AddNewPlan />
                </Stack>
                <Divider />
                <ForlersList foldersList={foldersList} />
              </Stack>
            </Grid>
            <Grid item xs={9} sx={{ height: "70vh" }}>
              <Stack direction={"row"} sx={{ ml: 3 }}>
                <Typography variant="h6" sx={{ mr: 10 }}>
                  Note list
                </Typography>
                {!!folderId && <AddNewNote />}
              </Stack>
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
