import React from "react";
import { Box, Card, CardContent, Grid, List, Stack, Typography } from "@mui/material";
import Link from "next/link";

function ForlersList({ foldersList }: { foldersList: any[] }) {
  return (
    <Box
      sx={{
        textAlign: "left",
        height: "100% ",
        overflowY: "auto",
        scrollbarWidth: "thin",
        "&::-webkit-scrollbar": {
          width: "0.1em",
        },
        "&::-webkit-scrollbar-track": {
          background: "#f1f1f1",
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "#888",
        },
        "&::-webkit-scrollbar-thumb:hover": {
          background: "#555",
        },
      }}
    >
      {foldersList.map(({ id, name }) => (
        <Box sx={{ mt: 2 }} key={id}>
          <Link href={`/folder/${id}`} style={{ textDecoration: "none" }}>
            <Card>
              <CardContent sx={{ overflowX: "hidden" }}>
                <Typography sx={{ ml: 3 }}>{name}</Typography>
              </CardContent>
            </Card>
          </Link>
        </Box>
      ))}
    </Box>
  );
}

export default ForlersList;
