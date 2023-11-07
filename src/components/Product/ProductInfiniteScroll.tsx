import { IProductModel } from "@/services/interfaces/common";
import { updateLoadedProductScrollPosition } from "@/store/loadedProductSlice";
import { FallbackImage } from "@/utils/constants/common";
import { startCase } from "lodash";
import Image from "next/legacy/image";
import Link from "next/link";
import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useDispatch } from "react-redux";

type Props = {
  products: IProductModel[];
  dataLength: number;
  callNextPage: () => void;
  hasMore: boolean;
};

function ProductInfiniteScroll({
  dataLength,
  callNextPage,
  hasMore,
  products,
}: Props) {
  const dispatch = useDispatch();

  return (
    <div className="px-2 md:px-4">
      <InfiniteScroll
        dataLength={dataLength}
        next={callNextPage}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        scrollableTarget="scrollableDiv"
      >
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((product, index) => (
            <Link
              href={`/products/${product.slug}`}
              key={product.slug}
              className="block"
              onClick={() => {
                dispatch(updateLoadedProductScrollPosition(window.scrollY));
              }}
            >
              <div className="group relative overflow-hidden rounded-lg shadow hover:shadow-lg">
                <div className="relative w-full h-60 lg:h-80">
                  <Image
                    className="object-cover group-hover:scale-105 transition duration-200 ease-linear"
                    layout="fill"
                    placeholder="blur"
                    blurDataURL={product.images[0].url}
                    src={product.images[0]?.url || FallbackImage}
                    alt={product.name}
                  />
                </div>

                <div className="p-4">
                  <p className="text-base font-semibold text-gray-900 truncate">
                    {startCase(product.brand.name)}
                  </p>
                  <p className="text-sm text-gray-500 font-light truncate">
                    {product.name}
                  </p>
                  <p className="font-semibold mt-2 text-gray-700 text-sm">
                    ₹ {product.price.toLocaleString("en-IN")}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
}

export default ProductInfiniteScroll;
