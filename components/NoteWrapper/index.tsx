import { Box, Divider, Grid, Stack, Typography } from "@mui/material";
import React from "react";
import ForlersList from "../FoldersList";
import UserMenu from "../UserMenu";

function NoteWarpper() {
  const foldersList = [
    {
      name: "note 1111113rwregdfg",
      id: "1",
    },
    {
      name: "note 2222",
      id: "2",
    },
    {
      name: "note 3",
      id: "3",
    },
    {
      name: "note 4",
      id: "4",
    },
    {
      name: "note 1",
      id: "15",
    },
    {
      name: "note 2",
      id: "26",
    },
    {
      name: "note 3",
      id: "33",
    },
    {
      name: "note 4",
      id: "41",
    },
  ];
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
            <Grid item xs={9}>
              <Typography variant="h6" sx={{ textAlign: "center" }}>
                Note list
              </Typography>
              <Divider />
            </Grid>
          </Grid>
        </Stack>
      </Stack>
    </Box>
  );
}

export default NoteWarpper;
