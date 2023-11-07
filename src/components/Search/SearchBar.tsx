import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import Link from "next/link";
import Image from "next/image";

export default function SearchBar() {
  return (
    <Link href="/search?filter_bar_state=categories">
      <div className="mb-5">
        <div className="flex items-center p-3 bg-zinc-100 rounded-lg border-zinc-200 border">
          <Image
            src="/icons/search.svg"
            alt="search icon"
            width={16}
            height={16}
          />
          <p className="ml-2 text-gray-500 text-sm font-normal leading-4">
            Search Products
          </p>
        </div>
      </div>
    </Link>
  );
}
