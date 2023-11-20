import { SidebarLayout } from "@/components/Layout/SidebarLayout";
import { AdminSidebar } from "@/components/Sidebar/AdminSidebar";
import Select from "react-select";
import React, { useState } from "react";
import { TOption } from "@/services/interfaces/common";

type Props = {};

const searchFromOptions: TOption[] = [
  { label: "Product Name", value: "name" },
  // { label: "Brand", value: "brand" },
  { label: "Scraped Slug", value: "scraped-slug" },
];

const Brands = (props: Props) => {
  return (
    <SidebarLayout
      MainComponent={<Main />}
      SidebarComponent={<AdminSidebar />}
    />
  );
};

const Main = () => {
  const [products, setProducts] = useState([]);
  const [searchFrom, setSearchFrom] = useState(searchFromOptions[0]);
  const [searchTerm, setSearchTerm] = useState<string | null>(null);

  return (
    <div className="p-2">
      <h1 className="font-semibold text-xl">Tagging</h1>
      <div className="flex my-3 items-center gap-5">
        <input
          type="text"
          placeholder="type here..."
          className="border rounded p-1 flex-1"
          value={searchTerm || ""}
          onChange={(e) => {
            if (e.target) {
              setSearchTerm(e.target.value || null);
            }
          }}
        />

        <Select
          name="color"
          className="basic-single w-64"
          classNamePrefix="select"
          defaultValue={searchFrom}
          isSearchable
          options={searchFromOptions}
          value={searchFrom}
          onChange={(option) => {
            if (option) {
              setSearchFrom(option);
            }
          }}
        />
      </div>

      <div className="flex gap-5">
        <div className="bg-brand text-white px-4 py-1 rounded cursor-pointer  border border-brand hover:text-brand hover:bg-white">
          Search
        </div>

        <div className="bg-brand text-white px-4 py-1 rounded cursor-pointer border border-brand hover:text-brand hover:bg-white">
          Select All
        </div>

        <div className="bg-brand text-white px-4 py-1 rounded cursor-pointer border border-brand hover:text-brand hover:bg-white">
          Deselect All
        </div>

        <div className="bg-brand text-white px-4 py-1 rounded cursor-pointer border border-brand hover:text-brand hover:bg-white">
          Add Tags
        </div>

        <div className="bg-brand text-white px-4 py-1 rounded cursor-pointer border border-brand hover:text-brand hover:bg-white">
          Apply Tags
        </div>
        <div className="bg-brand text-white px-4 py-1 rounded cursor-pointer border border-brand hover:text-brand hover:bg-white">
          Clear All
        </div>
      </div>

      <div className="mt-8">
        <p className="mb-4">{products.length} results</p>

        <div className="grid grid-cols-5">
          {products.map((product) => (
            <div></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Brands;
