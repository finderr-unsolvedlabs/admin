import React from "react";
import { ColorRing, TailSpin } from "react-loader-spinner";

type Props = { visible: boolean };

function OverlayLoader({ visible }: Props) {
  if (!visible) {
    return <></>;
  }
  return (
    <div className="fixed top-0 left-0 w-full h-full z-10 bg-white/50 flex justify-center items-center pointer-events-none">
      <ColorRing
        height="50"
        width="50"
        ariaLabel="blocks-loading"
        wrapperClass="blocks-wrapper"
        colors={["#4169e0", "#4169e0", "#4169e0", "#4169e0", "#4169e0"]}
      />
    </div>
  );
}

export { OverlayLoader };
