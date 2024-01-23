import { CircularProgress } from "@mui/material";
import React from "react";

type Props = {};

const FullPageLoader = (props: Props) => {
  return (
    <div className="h-screen flex justify-center items-center">
      <CircularProgress />
    </div>
  );
};

export { FullPageLoader };
