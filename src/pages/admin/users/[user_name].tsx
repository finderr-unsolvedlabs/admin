import CartProducts from "@/components/Tables/CartProducts";
import LogsTable from "@/components/Tables/LogsTable";
import RecentViewedProducts from "@/components/Tables/RecentViewedProducts";
import { IUserDetails } from "@/services/api/user";
import React from "react";
import { demoUser, userBadges } from "@/utils/constants/demoData";
import { useRouter } from "next/router";

const ProfileHeading = ({ title }: { title: string }) => {
  return <div className="text-sm text-gray-900">{title}</div>;
};
const ProfileData = ({ data }: { data: string }) => {
  return <div className="mb-3 text-md font-semibold text-gray-900">{data}</div>;
};

const User = () => {
  const router = useRouter();
  const { user_name } = router.query;
  return (
    <div className="min-h-screen w-full bg-gray-50">
      <div className="grid grid-cols-1 px-4 pt-6 xl:grid-cols-3 xl:gap-4">
        <div className="mb-4 col-span-full xl:mb-2">
          <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl">
            User Profile
          </h1>
        </div>
        <div className="col-span-full xl:col-auto">
          <div className="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 sm:p-6">
            {/* <div className="items-center sm:flex xl:block 2xl:flex sm:space-x-4 xl:space-x-0 2xl:space-x-4"> */}
            <h3 className="mb-4 text-xl font-bold text-gray-900">
              {user_name}
            </h3>
            <div className="items-center sm:flex xl:block 2xl:flex sm:space-x-4 xl:space-x-0 2xl:space-x-4">
              <div className="grid grid-cols-2">
                <ProfileHeading title="Name" />
                <ProfileData data={demoUser.name || ""} />
                <ProfileHeading title="Email Address" />
                <ProfileData data={demoUser.email || ""} />
                <ProfileHeading title="Phone Number" />
                <ProfileData data={demoUser.mobile || ""} />
                <ProfileHeading title="Created At" />
                <ProfileData data={demoUser.createdAt || ""} />
                <ProfileHeading title="Updated At" />
                <ProfileData data={demoUser.updatedAt || ""} />
              </div>
            </div>
          </div>
          <LogsTable demoUser={demoUser} />
          <div className="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 sm:p-6">
            <div className="items-center">
              <h3 className="mb-4 text-xl font-bold text-gray-900">
                User Labels
              </h3>
              <div className="">
                {userBadges.map((badge, index) => {
                  return (
                    <span
                      key={index}
                      className="inline-flex items-center px-2 py-1 me-2 my-1 text-sm font-medium text-yellow-800 bg-yellow-100 rounded "
                    >
                      {badge.title}
                      <button
                        type="button"
                        className="inline-flex items-center p-1 ms-2 text-sm text-yellow-400 bg-transparent rounded-sm hover:bg-yellow-200 hover:text-yellow-900"
                        data-dismiss-target="#badge-dismiss-yellow"
                        aria-label="Remove"
                      >
                        <svg
                          className="w-2 h-2"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 14 14"
                        >
                          <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                          />
                        </svg>
                        <span className="sr-only">Remove badge</span>
                      </button>
                    </span>
                  );
                })}
                <div className="flex gap-2 my-2">
                  <input
                    type="text"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder="Label"
                    required
                  />
                  <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">
                    Add
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-2">
          <CartProducts demoUser={demoUser} />
          <RecentViewedProducts
            products={demoUser.recentlyViewedProducts}
            title="Recently Viewed Products"
          />
          <RecentViewedProducts
            products={demoUser.wishlist ?? []}
            title="Wishlist Products"
          />
        </div>
      </div>
    </div>
  );
};

export default User;
