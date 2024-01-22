import { IUserDetails } from '@/services/api/user'
import React, { useEffect, useMemo, useState } from 'react'
import LaunchIcon from '@mui/icons-material/Launch';
import { Icon } from '@mui/material';

type Props = {
    demoUser: IUserDetails,
}

const CartProducts = ({ demoUser }: Props) => {
    const itemsPerPage = 5;
    const [totalPages, setTotalPages] = useState(Math.ceil(demoUser.cartItems.length / itemsPerPage));
    const [page, setPage] = useState(1);
    const [start, setStart] = useState(1);
    const [end, setEnd] = useState(itemsPerPage);

    const handleNextClick = () => {
        if (page === Math.ceil(demoUser.cartItems.length / itemsPerPage)) return;
        if (end === demoUser.cartItems.length) return;
        setPage((page) => page + 1);
        setStart((start) => start + itemsPerPage);
        setEnd((end) => Math.min(end + itemsPerPage, demoUser.cartItems.length));
    }

    const handlePrevClick = () => {
        if (page === 1) return;
        setPage((page) => page - 1);
        setStart((start) => start - itemsPerPage);
        setEnd((end) => {
            if (end%itemsPerPage === 0) return end - itemsPerPage;
            return end - (end%itemsPerPage);
        });
    }

    useEffect(() => {
        setTotalPages(Math.ceil(demoUser.cartItems.length / itemsPerPage));
    }, [demoUser.cartItems.length]);

    const displayData = useMemo(() => {
        const start = (page - 1) * itemsPerPage;
        return demoUser.cartItems.slice(start, start + itemsPerPage);
    }, [demoUser, page]);

    return (
        <div>
            <div className="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 sm:p-6">
                <h3 className="mb-4 text-xl font-semibold">Products in Cart</h3>
                <div className="relative overflow-x-auto">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Product Name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Brand Name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Price
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Checkout Type
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Product Link
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {displayData.map((activity, index) => {
                                return (
                                    <tr className="bg-white border" key={index}>
                                        <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                            {activity.name}
                                        </td>
                                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                            {activity.brand_name}
                                        </td>
                                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                            {activity.price}
                                        </td>
                                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                            {activity.checkout_type}
                                        </td>
                                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                            <a href={`https://shop.finderr.co.in/products/${activity.slug}`} target="_blank" rel="noreferrer">
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
                            Showing <span className="font-semibold text-gray-900">{start}</span> to <span className="font-semibold text-gray-900">{end}</span> of <span className="font-semibold text-gray-900">{demoUser.cartItems.length}</span> Entries
                        </span>
                        <div className='flex'>
                            <div onClick={handlePrevClick} className="flex items-center justify-center cursor-pointer px-3 h-8 me-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700">
                                <svg className="w-3.5 h-3.5 me-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5H1m0 0 4 4M1 5l4-4" />
                                </svg>
                                Previous
                            </div>
                            <div onClick={handleNextClick} className="flex items-center justify-center cursor-pointer px-3 h-8 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700">
                                Next
                                <svg className="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartProducts
