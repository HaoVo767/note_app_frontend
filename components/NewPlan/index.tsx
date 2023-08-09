import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  Tooltip,
} from "@mui/material";
import { CreateNewFolderOutlined } from "@mui/icons-material";
import { useAppContext } from "@/context/state";

const AddNewPlan = () => {
  const { addItem, onChangeState } = useAppContext();
  const [openDialog, setOpenDialog] = React.useState<boolean>(false);
  const [newFolderName, setNewFolderName] = React.useState<string>("");
  const handleOpenPopup = () => {
    setOpenDialog(true);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  const handleNewFolderNameChange = (e: any) => {
    setNewFolderName(e.target.value);
  };
  const handleAddNewFolder = () => {
    if (!!newFolderName) {
      const accessToken = "Bearer " + localStorage.getItem("accessToken");
      const data = { folderName: newFolderName };
      fetch("http://localhost:5000/addNewFolder", {
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
          setOpenDialog(false);
          onChangeState({ addItem: true });
        })
        .catch((err) => console.log(err));
    } else {
      alert("Enter folder name");
    }
  };
  React.useEffect(() => {}, []);
  return (
    <>
      <Tooltip title="Add folder" onClick={handleOpenPopup}>
        <IconButton size="small">
          <CreateNewFolderOutlined />
        </IconButton>
      </Tooltip>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>New Folder</DialogTitle>
        <DialogContent sx={{ width: 400 }}>
          <TextField
            autoFocus
            id="Name"
            label="Folder name"
            fullWidth={true}
            size="small"
            variant="standard"
            value={newFolderName}
            onChange={handleNewFolderNameChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancle</Button>
          <Button onClick={handleAddNewFolder}>OK</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddNewPlan;
