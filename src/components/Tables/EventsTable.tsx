import React from "react";
import LaunchIcon from "@mui/icons-material/Launch";
import {
  IEventListResponse,
  IOfferListResponse,
} from "@/services/interfaces/common";
import { IconButton } from "@mui/material";
import { useRouter } from "next/router";
import { dateFormat } from "@/utils/constants/common";
import moment from "moment";

type Props = {
  title: string;
  eventsData: IEventListResponse | IOfferListResponse;
};

const EventsTable = ({ title, eventsData }: Props) => {
  const router = useRouter();
  const page = parseInt(router.query.page as string) || 1;
  const {
    pagination: { total },
    data: events,
  } = eventsData;
  const itemsPerPage = 10;

  const handleNextClick = () => {
    if (page === Math.ceil(total / itemsPerPage)) return;
    router.replace(`/admin/events?page=${page + 1}`);
  };

  const handlePrevClick = () => {
    if (page === 1) return;
    router.replace(`/admin/events?page=${page - 1}`);
  };

  return (
    <div>
      <div className="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 sm:p-6">
        <h3 className="mb-4 text-xl font-semibold">{title}</h3>
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500">
            <thead className="text-xs text-gray-700 border uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-4 py-3">
                  Title
                </th>
                <th scope="col" className="px-4 py-3">
                  Link Label
                </th>
                <th scope="col" className="px-4 py-3">
                  Expiry Date
                </th>
                <th scope="col" className="px-4 py-3">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {events.map((event, index) => {
                return (
                  <tr className="bg-white border" key={index}>
                    <td
                      scope="row"
                      className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap"
                    >
                      {event.title}
                    </td>
                    <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap">
                      {event.action.label}
                    </td>
                    <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap">
                      {moment(event.expiry_date).format(dateFormat)}
                    </td>
                    <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap">
                      <div className="flex items-center space-x-4">
                        <a
                          href="#"
                          className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                        >
                          Edit
                        </a>
                        <a
                          href="#"
                          className="font-medium text-red-600 dark:text-red-500 hover:underline"
                        >
                          Remove
                        </a>
                        <IconButton href={event.action.url} target="_blank">
                          <LaunchIcon style={{ color: "black" }} />
                        </IconButton>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="flex items-center mt-4 justify-between">
            <span className="text-sm text-gray-700">
              Showing{" "}
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
            <div className="flex">
              <div
                onClick={handlePrevClick}
                className={
                  "flex items-center justify-center px-3 h-8 me-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 " +
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
                  "flex items-center justify-center px-3 h-8 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 " +
                  (page === Math.floor(total / itemsPerPage) + 1
                    ? "opacity-50 cursor-not-allowed"
                    : "")
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

export default EventsTable;
