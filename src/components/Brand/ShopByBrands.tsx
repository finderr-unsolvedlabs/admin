import FullImageCardAlbum from "@components/Utils/FullImageCardAlbum";
import Link from "next/link";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import React from "react";
import { IBrandModel } from "@/services/interfaces/common";
import { useDispatch } from "react-redux";

interface IProp {
  brands: IBrandModel[];
}

export default function ShopByBrands({ brands }: IProp) {
  const dispatch = useDispatch();

  return (
    <div>
      <div className="mx-auto px-4">
        <div className="mt-6 flex justify-between">
          <div className="space-y-6 md:w-3/4">
            <p className="font-bold text-lg md:text-2xl">Shop by Brands</p>
          </div>

          <Link href="/list/brands-and-stores?view=brands">
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
      <div className="p-5">
        <FullImageCardAlbum
          cards={brands.map((x) => ({
            title: x.name,
            link: `/brands/${x.slug}`,
            image: x.cover_images[0].url,
          }))}
        />
      </div>
    </div>
  );
}
