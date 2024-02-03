import React, { useEffect, useState } from "react";
import UsersTable from "@/components/Tables/UsersTable";
import { SidebarLayout } from "@/components/Layout/SidebarLayout";
import { AdminSidebar } from "@/components/Sidebar/AdminSidebar";
import { SidebarsMainLoader } from "@/components/Loaders/SidebarsMainLoader";
import { IUserListResponse, UserApi } from "@/services/api/user";
import { useRouter } from "next/router";

const Page = () => {
  const router = useRouter();
  const sortBy = router.query.sortBy as string;
  const order = router.query.order as string;
  const page = parseInt(router.query.page as string) || 1;
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);
  const [usersList, setUsersList] = useState<IUserListResponse>();
  useEffect(() => {
    setUsersList(undefined);
    UserApi.list({ page, limit: itemsPerPage, sortBy, order }).then(
      ({ data }) => {
        setUsersList(data);
      }
    );
  }, [page, itemsPerPage, sortBy, order]);

  const handleItemsPerPageChange = (items: number) => {
    setItemsPerPage(items);
  };

  return (
    <SidebarLayout
      MainComponent={
        usersList ? (
          <Main
            userList={usersList}
            handlePageChange={handleItemsPerPageChange}
            itemsPerPage={itemsPerPage}
          />
        ) : (
          <SidebarsMainLoader />
        )
      }
      SidebarComponent={<AdminSidebar />}
    />
  );
};

interface Props {
  userList: IUserListResponse;
  handlePageChange: (items: number) => void;
  itemsPerPage: number;
}
const Main = ({ userList, handlePageChange, itemsPerPage }: Props) => {
  console.log(`page` + userList.data[0].user_name);

  return (
    <div className="min-h-screen w-full bg-gray-100 p-5">
      <div className="grid w-full grid-cols-1 gap-4 my-4 xl:grid-cols-2">
        <div className="items-center justify-between p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:flex sm:p-6">
          <div className="w-full">
            <h3 className="text-base font-normal text-gray-500">
              Total Visitors
            </h3>
            <span className="text-2xl font-bold leading-none text-gray-900 sm:text-3xl">
              {userList.pagination.total}
            </span>
            <p className="flex items-center text-base font-normal text-gray-500">
              <span className="flex items-center mr-1.5 text-sm text-green-500">
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    clip-rule="evenodd"
                    fill-rule="evenodd"
                    d="M10 17a.75.75 0 01-.75-.75V5.612L5.29 9.77a.75.75 0 01-1.08-1.04l5.25-5.5a.75.75 0 011.08 0l5.25 5.5a.75.75 0 11-1.08 1.04l-3.96-4.158V16.25A.75.75 0 0110 17z"
                  ></path>
                </svg>
                3.4%
              </span>
              Since last month
            </p>
          </div>
          <div className="w-full"></div>
        </div>

        <div className="items-center justify-between p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:flex sm:p-6">
          <div className="w-full">
            <h3 className="text-base font-normal text-gray-500">New Signups</h3>
            <span className="text-2xl font-bold leading-none text-gray-900 sm:text-3xl">
              2,340
            </span>
            <p className="flex items-center text-base font-normal text-gray-500">
              <span className="flex items-center mr-1.5 text-sm text-green-500">
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    clip-rule="evenodd"
                    fill-rule="evenodd"
                    d="M10 17a.75.75 0 01-.75-.75V5.612L5.29 9.77a.75.75 0 01-1.08-1.04l5.25-5.5a.75.75 0 011.08 0l5.25 5.5a.75.75 0 11-1.08 1.04l-3.96-4.158V16.25A.75.75 0 0110 17z"
                  ></path>
                </svg>
                12.5%
              </span>
              Since last month
            </p>
          </div>
          <div className="w-full"></div>
        </div>
      </div>

      <UsersTable
        userList={userList}
        handlePageChange={handlePageChange}
        itemsPerPage={itemsPerPage}
      />
    </div>
  );
};

export default Page;
