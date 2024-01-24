import { CircularProgress } from "@mui/material";
import React from "react";

type Props = {};

const SidebarsMainLoader = (props: Props) => {
  return (
    <div className="h-full flex justify-center items-center">
      <CircularProgress />
    </div>
  );
};

export { SidebarsMainLoader };
