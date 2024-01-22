import React, { useEffect, useMemo, useState } from 'react'
import { IUserDetails } from '@/services/api/user'
import LaunchIcon from '@mui/icons-material/Launch';
import { Icon } from '@mui/material';
import Link from 'next/link';

type Props = {
    demoUsers: IUserDetails[],
}

const UsersTable = ({ demoUsers }: Props) => {
    const itemsPerPage = 10;
    const [totalPages, setTotalPages] = useState(Math.ceil(demoUsers.length / itemsPerPage));
    const [page, setPage] = useState(1);
    const [start, setStart] = useState(1);
    const [end, setEnd] = useState(itemsPerPage);

    const handleNextClick = () => {
        if (page === Math.ceil(demoUsers.length / itemsPerPage)) return;
        if (end === demoUsers.length) return;
        setPage((page) => page + 1);
        setStart((start) => start + itemsPerPage);
        setEnd((end) => Math.min(end + itemsPerPage, demoUsers.length));
    }

    const handlePrevClick = () => {
        if (page === 1) return;
        setPage((page) => page - 1);
        setStart((start) => start - itemsPerPage);
        setEnd((end) => {
            if (end % itemsPerPage === 0) return end - itemsPerPage;
            return end - (end % itemsPerPage);
        });
    }

    useEffect(() => {
        setTotalPages(Math.ceil(demoUsers.length / itemsPerPage));
    }, [demoUsers]);

    const displayData = useMemo(() => {
        const start = (page - 1) * itemsPerPage;
        return demoUsers.slice(start, start + itemsPerPage);
    }, [demoUsers, page]);

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
                                Last Login
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Profile Link
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {displayData.map((user, index) => {
                            return (
                                <tr className="bg-white border" key={index}>
                                    <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                        {user.name}
                                    </td>
                                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                        {user.cartItems.length}
                                    </td>
                                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                        {user.wishlist?.length}
                                    </td>
                                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                        {user.createdAt}
                                    </td>
                                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                        <a href={`/admin/users/${user.user_name}`} target="_blank" rel="noreferrer">
                                            <Icon component={LaunchIcon} />
                                        </a>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                <div className="flex items-center mt-4 justify-between">
                    <span className="text-sm text-gray-700">
                        Showing <span className="font-semibold text-gray-900">{start}</span> to <span className="font-semibold text-gray-900">{end}</span> of <span className="font-semibold text-gray-900">{demoUsers.length}</span> Entries
                    </span>
                    <div className='flex'>
                        <button onClick={handlePrevClick} className={"flex items-center justify-center px-3 h-8 me-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 " + (page===1 ? "cursor-not-allowed" : "cursor-pointer")}>
                            <svg className="w-3.5 h-3.5 me-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5H1m0 0 4 4M1 5l4-4" />
                            </svg>
                            Previous
                        </button>
                        <div onClick={handleNextClick} className={"flex items-center justify-center cursor-pointer px-3 h-8 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 " + (page===totalPages ? "cursor-not-allowed" : "cursor-pointer")}>
                            Next
                            <svg className="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default UsersTable
