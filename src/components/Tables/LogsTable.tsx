import { IUserDetails } from "@/services/api/user";
import moment from "moment";
import React from "react";
import { dateFormat } from "@/utils/constants/common";

type Props = {
  userDetails: IUserDetails;
};

const LoginTable = ({ userDetails }: Props) => {
  return (
    <div className="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 sm:p-6">
      <h3 className="mb-4 text-xl font-semibold">User Activity Logs</h3>

      {userDetails.recentActivities.length === 0 ? (
        <div className="text-center">
          <p className="text-gray-500">No Logs...</p>
        </div>
      ) : (
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Action Type
                </th>
                <th scope="col" className="px-6 py-3">
                  Time
                </th>
                <th scope="col" className="px-6 py-3">
                  Message
                </th>
              </tr>
            </thead>
            <tbody>
              {userDetails.recentActivities.map((activity, index) => {
                return (
                  <tr className="bg-white border" key={index}>
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                    >
                      {activity.action_type}
                    </th>
                    <td className="px-6 py-4">
                      {moment(activity.createdAt).format(dateFormat)}
                    </td>
                    <td className="px-6 py-4">{activity.message}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default LoginTable;
