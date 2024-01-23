import React, { useEffect, useMemo, useState } from "react";
import { IUserDetails, IUserListResponse } from "@/services/api/user";
import LaunchIcon from "@mui/icons-material/Launch";
import { Icon } from "@mui/material";
import moment from "moment";
import Link from "next/link";
import { dateFormat } from "@/utils/constants/common";
import { useRouter } from "next/router";

type Props = {
  userList: IUserListResponse;
};

const UsersTable = ({ userList }: Props) => {
  const router = useRouter();
  const page = parseInt(router.query.page as string) || 1;
  const {
    pagination: { total },
    data: users,
  } = userList;
  const itemsPerPage = 10;

  console.log(`tabel` + userList.data[0].user_name);

  const handleNextClick = () => {
    if (page === Math.ceil(total / itemsPerPage)) return;
    router.replace(`/admin/users?page=${page + 1}`);
  };

  const handlePrevClick = () => {
    if (page === 1) return;
    router.replace(`/admin/users?page=${page - 1}`);
  };

  return (
    <div className="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 sm:p-6">
      <h3 className="mb-4 text-xl font-semibold">Users List</h3>
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">
                User Name
              </th>
              <th scope="col" className="px-6 py-3">
                Products in Cart
              </th>
              <th scope="col" className="px-6 py-3">
                Products in Wishlist
              </th>
              <th scope="col" className="px-6 py-3">
                Last Visited
              </th>
              <th scope="col" className="px-6 py-3">
                Profile Link
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => {
              return (
                <tr className="bg-white border" key={index}>
                  <td
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                  >
                    {user.user_name}
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                    {user.totalProductsInCart}
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                    {user.wishlist?.length || 0}
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                    {moment(user.lastLoginTime).format(dateFormat)}
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                    <a
                      href={`/admin/users/${user.user_name}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <Icon component={LaunchIcon} />
                    </a>
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
              {(page - 1) * itemsPerPage}
            </span>{" "}
            to{" "}
            <span className="font-semibold text-gray-900">
              {Math.min(page * itemsPerPage, total)}
            </span>{" "}
            of <span className="font-semibold text-gray-900">{total}</span>{" "}
            Entries
          </span>
          <div className="flex">
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
                "flex items-center justify-center cursor-pointer px-3 h-8 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 "
                // +(page === totalPages ? "cursor-not-allowed" : "cursor-pointer")
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

export default UsersTable;
