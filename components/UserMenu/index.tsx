import React from "react";
import { useAppContext } from "@/context/state";
import { Box, Menu, MenuItem, Typography } from "@mui/material";
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
        <Typography sx={{ cursor: "pointer", fontSize: 20, mt: 2, mb: 0 }} onClick={handleOpenMenu}>
          {user?.userName}
        </Typography>
      </Box>
      <Menu id="user-menu" anchorEl={anchorEL} open={open} onClose={handleClose}>
        <MenuItem onClick={handleLogout}>Log out</MenuItem>
      </Menu>
    </Box>
  );
}
