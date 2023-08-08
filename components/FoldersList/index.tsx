import React from "react";
import { Box, Card, CardContent, Typography } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import { IFolder } from "../interface";

function ForlersList({ foldersList }: { foldersList: IFolder[] | undefined }) {
  const router = useRouter();
  const fId = router.query.folderId;
  return (
    <Box
      sx={{
        textAlign: "left",
        height: "100% ",
        overflowY: "auto",
      }}
    >
      {foldersList
        ? foldersList.map(({ folderId, folderName, createdAt }) => (
            <Box sx={{ mt: "1px" }} key={folderId}>
              <Link href={`/folder/${folderId}`} style={{ textDecoration: "none" }}>
                <Card sx={{ backgroundColor: folderId == fId ? "#e3f2fd" : null }}>
                  <CardContent sx={{ overflowX: "hidden" }}>
                    <Typography sx={{ ml: 3, fontWeight: "600" }}>{folderName}</Typography>
                    <Typography sx={{ textAlign: "right" }}>
                      {new Date(createdAt).toLocaleDateString().replaceAll("/", "-")}
                    </Typography>
                  </CardContent>
                </Card>
              </Link>
            </Box>
          ))
        : null}
    </Box>
  );
}

export default ForlersList;
