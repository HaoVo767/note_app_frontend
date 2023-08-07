import React from "react";
import { useAppContext } from "@/context/state";
import { Box, Menu, MenuItem, Stack, Typography } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useRouter } from "next/router";

export default function UserMenu() {
  const { user } = useAppContext();
  const [anchorEL, setAncorEl] = React.useState(null);
  const open = Boolean(anchorEL);
  const router = useRouter();
  const handleLogout = () => {
    router.push("/login");
  };
  const handleClose = () => {
    setAncorEl(null);
  };
  const handleOpenMenu = (e: any) => {
    setAncorEl(e.currentTarget);
  };
  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "right", mr: 5 }}>
        <Stack direction={"row"} sx={{ cursor: "pointer", mt: 2, mb: 0 }} onClick={handleOpenMenu}>
          <AccountCircleIcon sx={{ mt: "2px", mr: "2px" }} />
          <Typography sx={{ fontSize: 20 }}>{user?.userName}</Typography>
        </Stack>
      </Box>
      <Menu id="user-menu" anchorEl={anchorEL} open={open} onClose={handleClose}>
        <MenuItem onClick={handleLogout}>Log out</MenuItem>
      </Menu>
    </Box>
  );
}
