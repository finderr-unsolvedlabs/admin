import React from "react";
import { IUserListResponse } from "@/services/api/user";
import LaunchIcon from "@mui/icons-material/Launch";
import { Icon } from "@mui/material";
import moment from "moment";
import { dateFormat } from "@/utils/constants/common";
import { useRouter } from "next/router";
import SwapVertIcon from "@mui/icons-material/SwapVert";

type Props = {
  userList: IUserListResponse;
  handlePageChange: (items: number) => void;
  itemsPerPage: number;
};

const UsersTable = ({ userList, handlePageChange, itemsPerPage }: Props) => {
  const router = useRouter();
  const page = parseInt(router.query.page as string) || 1;
  const sortBy = (router.query.sortBy as string) || "lastVisitedTime";
  const order = (router.query.order as string) || "descending";

  const {
    pagination: { total },
    data: users,
  } = userList;

  const toggleSortOrder = () => {
    if (order === "ascending") {
      router.push(`/admin/users?page=1&sortBy=${sortBy}&order=descending`);
    } else {
      router.push(`/admin/users?page=1&sortBy=${sortBy}&order=ascending`);
    }
  };

  const handleHeaderClick = (field: string) => {
    if (sortBy === field) {
      toggleSortOrder();
    } else {
      router.push(`/admin/users?page=1&sortBy=${field}&order=ascending`);
    }
  };

  const pagesOptions = [10, 20, 30, 50];

  console.log(`tabel` + userList.data[0].user_name);

  const handleNextClick = () => {
    if (page === Math.ceil(total / itemsPerPage)) return;
    router.replace(
      `/admin/users?page=${page + 1}&sortBy=${sortBy}&order=${order}`
    );
  };

  const handlePrevClick = () => {
    if (page === 1) return;
    router.replace(
      `/admin/users?page=${page - 1}&sortBy=${sortBy}&order=${order}`
    );
  };

  return (
    <div className="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 sm:p-6">
      <h3 className="mb-4 text-xl font-semibold">Users List</h3>
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr className="border">
              <th
                // onClick={() => handleHeaderClick("user_name")}
                scope="col"
                className="px-6 py-3"
              >
                {/* <SwapVertIcon style={{ fontSize: "20px" }} /> */}
                User Name
              </th>
              <th
                onClick={() => handleHeaderClick("totalProductsInCart")}
                scope="col"
                className="px-6 py-3 cursor-pointer"
              >
                <SwapVertIcon style={{ fontSize: "20px" }} />
                Products in Cart
              </th>
              <th
                onClick={() => handleHeaderClick("wishlist")}
                scope="col"
                className="px-6 py-3 cursor-pointer"
              >
                <SwapVertIcon style={{ fontSize: "20px" }} />
                Products in Wishlist
              </th>
              <th
                onClick={() => handleHeaderClick("lastVisitedTime")}
                scope="col"
                className="px-6 py-3 cursor-pointer"
              >
                <SwapVertIcon style={{ fontSize: "20px" }} />
                Last Visited
              </th>
              <th
                onClick={() => handleHeaderClick("createdAt")}
                scope="col"
                className="px-6 py-3 cursor-pointer"
              >
                <SwapVertIcon style={{ fontSize: "20px" }} />
                Created At
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
                    {moment(user.lastVisitedTime).format(dateFormat)}
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                    {moment(user.createdAt).format(dateFormat)}
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                    <a
                      href={`/admin/users/${user._id}`}
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
            <div className="flex items-center gap-2 me-3">
              <label className="text-sm w-full font-medium text-gray-900">
                Items Per Page:
              </label>
              <select
                id="items_per_page"
                onChange={(e) => {
                  handlePageChange(parseInt(e.target.value));
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
