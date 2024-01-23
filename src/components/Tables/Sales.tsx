import React, { useEffect, useMemo, useState } from "react";
import LaunchIcon from "@mui/icons-material/Launch";
import { IEvent } from "@/services/interfaces/common";
import { IconButton } from "@mui/material";

type Props = {
  title: string;
  demoData: IEvent[];
};

const SalesTable = ({ title, demoData }: Props) => {
  const itemsPerPage = 5;
  const [totalPages, setTotalPages] = useState(
    Math.ceil(demoData.length / itemsPerPage)
  );
  const [page, setPage] = useState(1);
  const [start, setStart] = useState(1);
  const [end, setEnd] = useState(itemsPerPage);

  const handleNextClick = () => {
    if (page === Math.ceil(demoData.length / itemsPerPage)) return;
    if (end === demoData.length) return;
    setPage((page) => page + 1);
    setStart((start) => start + itemsPerPage);
    setEnd((end) => Math.min(end + itemsPerPage, demoData.length));
  };

  const handlePrevClick = () => {
    if (page === 1) return;
    setPage((page) => page - 1);
    setStart((start) => start - itemsPerPage);
    setEnd((end) => {
      if (end % itemsPerPage === 0) return end - itemsPerPage;
      return end - (end % itemsPerPage);
    });
  };

  useEffect(() => {
    setTotalPages(Math.ceil(demoData.length / itemsPerPage));
  }, [demoData.length]);

  const displayData = useMemo(() => {
    const start = (page - 1) * itemsPerPage;
    return demoData.slice(start, start + itemsPerPage);
  }, [demoData, page]);

  return (
    <div>
      <div className="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 sm:p-6">
        <h3 className="mb-4 text-xl font-semibold">{title}</h3>
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Title
                </th>
                <th scope="col" className="px-6 py-3">
                  Link Label
                </th>
                <th scope="col" className="px-6 py-3">
                  Link
                </th>
                <th scope="col" className="px-6 py-3">
                  Expiry Date
                </th>
              </tr>
            </thead>
            <tbody>
              {displayData.map((event, index) => {
                return (
                  <tr className="bg-white border" key={index}>
                    <td
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                    >
                      {event.title}
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                      {event.action.label}
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                      <IconButton href={event.action.url} target="_blank">
                        <LaunchIcon style={{ color: "black" }} />
                      </IconButton>
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                      20-10-2023
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="flex items-center mt-4 justify-between">
            <span className="text-sm text-gray-700">
              Showing{" "}
              <span className="font-semibold text-gray-900">{start}</span> to{" "}
              <span className="font-semibold text-gray-900">{end}</span> of{" "}
              <span className="font-semibold text-gray-900">
                {demoData.length}
              </span>{" "}
              Entries
            </span>
            <div className="flex">
              <div
                onClick={handlePrevClick}
                className={
                  "flex items-center justify-center cursor-pointer px-3 h-8 me-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 " +
                  (page === 1 ? "opacity-50 cursor-not-allowed" : "")
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
              </div>
              <div
                onClick={handleNextClick}
                className={
                  "flex items-center justify-center cursor-pointer px-3 h-8 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 " +
                  (page === totalPages ? "opacity-50 cursor-not-allowed" : "")
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
    </div>
  );
};

export default SalesTable;
