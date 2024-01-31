import { SidebarLayout } from "@/components/Layout/SidebarLayout";
import { SidebarsMainLoader } from "@/components/Loaders/SidebarsMainLoader";
import { AdminSidebar } from "@/components/Sidebar/AdminSidebar";
import { BrandApi, IBrandListResponse } from "@/services/api/brand";
import { IBrandModel } from "@/services/interfaces/common";
import React, { useEffect, useState } from "react";

const Brands = () => {
  const [brandsList, setBrandList] = useState<IBrandListResponse[]>([]);
  useEffect(() => {
    setBrandList([]);
    BrandApi.list().then(({ data }) => {
      setBrandList(data);
    });
  }, []);

  return (
    <SidebarLayout
      MainComponent={
        brandsList ? <Main brandsList={brandsList} /> : <SidebarsMainLoader />
      }
      SidebarComponent={<AdminSidebar />}
    />
  );
};

interface Props {
  brandsList: IBrandListResponse[];
}

const Main = ({ brandsList }: Props) => {
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [totalPages, setTotalPages] = useState(0);

  const pagesOptions = [10, 20, 30, 50];

  const filteredBrands = brandsList.filter((brand) =>
    brand.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    setTotal(filteredBrands.length);
    setTotalPages(Math.ceil(filteredBrands.length / itemsPerPage));
    // setPage(1);
    // setSearchTerm("");
  }, [filteredBrands]);

  const handleNextClick = () => {
    if (page === Math.ceil(total / itemsPerPage)) return;
    setPage(page + 1);
  };

  const handlePrevClick = () => {
    if (page === 1) return;
    setPage(page - 1);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPage(1);
    setSearchTerm(event.target.value);
  };

  return (
    <div className="p-4 mb-4 h-full bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 sm:p-6">
      <h3 className="mb-4 text-xl font-semibold">Brands</h3>
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr className="border">
              <th colSpan={4}>
                <input
                  type="text"
                  className="w-full p-2 focus:outline-none"
                  placeholder="Search"
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
              </th>
            </tr>
          </thead>
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr className="border">
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Slug
              </th>
              <th scope="col" className="px-6 py-3">
                State
              </th>
              <th scope="col" className="px-6 py-3">
                Rating
              </th>
              <th scope="col" className="px-6 py-3">
                Active Ratio
              </th>
              <th scope="col" className="px-6 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredBrands
              .slice(
                (page - 1) * itemsPerPage,
                (page - 1) * itemsPerPage + itemsPerPage
              )
              .map((brand, index) => {
                return (
                  <tr className="bg-white border" key={index}>
                    <td
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                    >
                      {brand.name}
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                      {brand.slug}
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                      {brand.state}
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                      {brand.rating}
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                      {`${brand.activeProductsCount} / ${brand.totalProducts}`}
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                      <div className="flex items-center space-x-4">
                        <a
                          href={`/admin/brands/${brand._id}/edit`}
                          className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                        >
                          Edit
                        </a>
                      </div>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        <div className="flex items-center mt-4 justify-between">
          <span className="text-sm text-gray-700">
            {"Showing "}
            <span className="font-semibold text-gray-900">
              {Math.max((page - 1) * itemsPerPage, 1)}
            </span>{" "}
            to{" "}
            <span className="font-semibold text-gray-900">
              {Math.min(page * itemsPerPage, total)}
            </span>{" "}
            of <span className="font-semibold text-gray-900">{total}</span>{" "}
            Entries
          </span>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 me-3">
              <label className="text-sm w-full font-medium text-gray-900">
                Items Per Page:
              </label>
              <select
                id="items_per_page"
                onChange={(e) => {
                  setItemsPerPage(parseInt(e.target.value));
                }}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 px-2.5 py-1.5"
              >
                {pagesOptions.map((num_pages) => (
                  <option
                    selected={itemsPerPage == num_pages ? true : false}
                    key={num_pages}
                    value={num_pages}
                  >
                    {num_pages}
                  </option>
                ))}
              </select>
            </div>
            <div>
              Page :&nbsp;
              <select onChange={(e) => setPage(parseInt(e.target.value))}>
                {Array.from(Array(totalPages).keys()).map((pg) => (
                  <option
                    selected={page === pg + 1}
                    key={pg + 1}
                    value={pg + 1}
                  >
                    {pg + 1}
                  </option>
                ))}
              </select>
            </div>
            <button
              onClick={handlePrevClick}
              className={
                "flex items-center justify-center px-3 h-8 me-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 " +
                (page === 1 ? "cursor-not-allowed" : "cursor-pointer")
              }
            >
              <svg
                className="w-3.5 h-3.5 me-2 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 5H1m0 0 4 4M1 5l4-4"
                />
              </svg>
              Previous
            </button>
            <div
              onClick={handleNextClick}
              className={
                "flex items-center justify-center cursor-pointer px-3 h-8 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 " +
                (page === totalPages ? "cursor-not-allowed" : "cursor-pointer")
              }
            >
              Next
              <svg
                className="w-3.5 h-3.5 ms-2 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Brands;
