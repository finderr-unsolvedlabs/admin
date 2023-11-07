import React from "react";
import StoresAlbum from "./StoresAlbum";
import Link from "next/link";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { IStoreModel } from "@/services/interfaces/common";
import { useDispatch } from "react-redux";

interface IProp {
  stores: IStoreModel[];
}

export default function Stores({ stores }: IProp) {
  const dispatch = useDispatch();
  return (
    <div>
      <div className="mx-auto px-4">
        <div className="mt-6 flex justify-between">
          <div className="space-y-6 md:w-3/4">
            <p className="font-bold text-lg md:text-2xl">
              View Store Collections
            </p>
          </div>

          <Link href="/list/brands-and-stores?view=stores">
            <p
              style={{
                display: "flex",
                alignItems: "end",
                color: "#4169E1",
                fontWeight: "500",
                fontSize: "16px",
              }}
            >
              View More
              <ChevronRightIcon />
            </p>
          </Link>
        </div>
      </div>
      <StoresAlbum stores={stores} />
    </div>
  );
}
