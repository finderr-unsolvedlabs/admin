import { IUserDetails } from "@/services/api/user";
import React from "react";
import LaunchIcon from "@mui/icons-material/Launch";
import { Icon } from "@mui/material";
import { IBasicProduct } from "@/services/interfaces/common";

type Props = {
  products: IBasicProduct[];
  title: string;
};

const RecentViewedProducts = ({ products, title }: Props) => {
  return (
    <div className="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 sm:p-6">
      <h3 className="mb-4 text-xl font-semibold">{title}</h3>
      {products.length === 0 ? (
        <div className="text-center">
          <p className="text-gray-500">No Products...</p>
        </div>
      ) : (
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr className="border">
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
                  Product Slug
                </th>
                <th scope="col" className="px-6 py-3">
                  Product Link
                </th>
              </tr>
            </thead>
            <tbody>
              {products?.map((product, index) => {
                return (
                  <tr className="bg-white border" key={index}>
                    <td
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                    >
                      {product.name}
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                      {product.brand_name}
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                      {product.price}
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                      {product.slug}
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                      <a
                        href={`https://shop.finderr.co.in/products/${product.slug}`}
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
        </div>
      )}
    </div>
  );
};

export default RecentViewedProducts;
