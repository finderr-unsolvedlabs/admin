import {
  IPaginatedResultBase,
  TTableFields,
} from "@/services/interfaces/common";

import { useRouter } from "next/router";
import React from "react";
import Link from "next/link";

type Props = {
  tableData: IPaginatedResultBase;
  fields: TTableFields;
  editable?: string;
};

const GenericTable = ({ tableData, fields, editable }: Props) => {
  const router = useRouter();
  const page = parseInt(router.query.page as string) || 1;
  const {
    pagination: { total },
    data,
  } = tableData;
  const itemsPerPage = 10;

  const handleNextClick = () => {
    if (page === Math.ceil(total / itemsPerPage)) return;
    router.replace(`/admin/events?page=${page + 1}`);
  };

  const handlePrevClick = () => {
    if (page === 1) return;
    router.replace(`/admin/events?page=${page + 1}`);
  };

  return (
    <div>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500">
        <thead className="text-xs text-gray-700 border bg-gray-50">
          <tr>
            {fields.map((field) => {
              return (
                <th scope="col" key={field.key} className="px-4 py-3">
                  {field.name}
                </th>
              );
            })}
            <th scope="col" className="px-4 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => {
            return (
              <tr className="bg-white border" key={index}>
                {fields.map(({ key, transformation }) => {
                  return (
                    <td
                      scope="row"
                      className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap"
                      key={key}
                    >
                      {transformation ? transformation(item[key]) : item[key]}
                    </td>
                  );
                })}
                <td
                  scope="row"
                  className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap"
                >
                  {editable ? (
                    <Link
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      href={`${editable}/${item._id}/edit`}
                    >
                      Edit
                    </Link>
                  ) : (
                    <></>
                  )}
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
  );
};

export { GenericTable };
