import { Drawer } from "@mui/material";
import React from "react";

type Props = {
  visible: boolean;
  children: React.ReactNode;
  onClose: () => void;
};

function UtilitySidebar({ visible, onClose, children }: Props) {
  return (
    <>
      <Drawer anchor="right" open={visible} onClose={onClose}>
        <div className="h-screen bg-white w-screen lg:w-[45vw] right-0">
          <div className="flex-1">{children}</div>
        </div>
      </Drawer>
    </>
  );
}

export { UtilitySidebar };
