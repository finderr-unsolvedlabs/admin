import { IUserDetails } from '@/services/api/user'
import React from 'react'

type Props = {
  demoUser: IUserDetails,
}

const LoginTable = ({demoUser}:Props) => {
  return (
    <div className="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 sm:p-6">
      <h3 className="mb-4 text-xl font-semibold">Last 10 Logins</h3>

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
            {demoUser.recentActivities.map((activity, index) => {
              return (
                <tr className="bg-white border" key={index}>
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                    {activity.action_type}
                  </th>
                  <td className="px-6 py-4">
                    {activity.createdAt}
                  </td>
                  <td className="px-6 py-4">
                    {activity.message}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default LoginTable