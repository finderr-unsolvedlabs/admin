import { sendRequest } from "@/services/api";
import { ISortByOptions } from "@/services/interfaces/components/searchPageComponent";
import { startCase } from "lodash";
import React, { useEffect, useState } from "react";

type Props = {
  closeAction: () => void;
  toggleSortBy: (option: ISortByOptions | null) => void;
  currentSortBy: ISortByOptions | null;
};

function SortByForm({ closeAction, toggleSortBy, currentSortBy }: Props) {
  const [sortbyOptions, setSortbyOptions] = useState<ISortByOptions[]>();

  useEffect(() => {
    sendRequest(`website/search/products/get-sortby-options`, {
      method: "get",
    }).then(({ data }) => {
      setSortbyOptions(data.sortbyOptions);
    });
  }, []);

  if (!sortbyOptions) {
    // TODO: implement skelton loader
    return <></>;
  }
  return (
    <div>
      <p className="font-semibold text-lg mb-4">Sort By</p>
      <div className="flex flex-wrap gap-3 lg:gap-4">
        {sortbyOptions.map((option) => (
          <div
            key={option}
            className={`px-3 py-2 rounded-lg cursor-pointer ${
              currentSortBy === option
                ? "bg-brand text-white"
                : "bg-gray-500 text-blue-50"
            }`}
            onClick={() => {
              toggleSortBy(option);
              closeAction();
            }}
          >
            {startCase(option)}
          </div>
        ))}
      </div>
    </div>
  );
}

export { SortByForm };
