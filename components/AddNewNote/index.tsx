import React from "react";
import { IconButton, Tooltip } from "@mui/material";
import { CreateNewFolderOutlined } from "@mui/icons-material";
import { useAppContext } from "@/context/state";
import { baseURL } from "../../constants/baseURL";
import { useRouter } from "next/router";

const AddNewNote = () => {
  const { onChangeState } = useAppContext();

  const router = useRouter();
  const { folderId } = router.query;
  const handleAddNewNote = () => {
    const accessToken = "Bearer " + localStorage.getItem("accessToken");
    const data = { noteContent: "New note", folderId };
    fetch(`${baseURL}/addNewNote`, {
      method: "POST",
      headers: { Authorization: accessToken, Accept: "application/json", "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => {
        res.json();
        if (res.status !== 200) {
          alert("Phiên đăng nhập hết hạn");
        }
      })
      .then(() => {
        onChangeState({ addItem: true });
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      <Tooltip title="Add Note" onClick={handleAddNewNote}>
        <IconButton size="small">
          <CreateNewFolderOutlined />
        </IconButton>
      </Tooltip>
    </>
  );
};

export default AddNewNote;
