import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export default function Loading() {
  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <CircularProgress style={{ color: "#4169E1" }} />
    </Box>
  );
}
