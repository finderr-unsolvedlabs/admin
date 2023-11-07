import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import ArrowBack from "@mui/icons-material/ArrowBack";
import { isEmpty, kebabCase, startCase, unionBy } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { IStore } from "@/services/interfaces/redux";
import {
  setLoadedProduct,
  updateLoadedProductScrollPosition,
} from "@/store/loadedProductSlice";
import { useInView } from "react-intersection-observer";
import InfiniteScroll from "react-infinite-scroll-component";
import { SearchApi } from "@/services/api/search";
import Link from "next/link";
import Image from "next/legacy/image";

export default function Catalogue() {
  const router = useRouter();
  const paths = router.query;
  const slug = paths.slug as string;
  const pageName = kebabCase(router.asPath);

  const dispatch = useDispatch();
  const loadedProducts = useSelector((store: IStore) => store.loadedProducts);

  useEffect(() => {
    if (loadedProducts.pageName === pageName) {
      window.scrollTo(0, loadedProducts.latestScrollPosition || 0);
    } else {
      SearchApi.searchProduct({
        filters: {
          brands: [slug],
          categories: [],
        },
        page: loadedProducts.currentPage,
        sort_by: undefined,
        search_query: undefined,
        limit: 12,
      }).then(({ data: response }) => {
        dispatch(
          setLoadedProduct({
            data: {
              pageName: pageName,
              currentPage: 1,
              loadedSearchItems: response.data.products,
              totalCount: response.data.totalCount,
            },
          })
        );
      });
    }
  }, []);

  const callNextPage = () => {
    SearchApi.searchProduct({
      filters: {
        brands: [slug],
        categories: [],
      },
      page: loadedProducts.currentPage + 1,
      sort_by: undefined,
      search_query: undefined,
      limit: 12,
    })
      .then(({ data: response }) => {
        const newItems = unionBy(
          [...loadedProducts.loadedSearchItems, ...response.data.products],
          "slug"
        );
        dispatch(
          setLoadedProduct({
            data: {
              pageName: pageName,
              loadedSearchItems: newItems,
              currentPage: loadedProducts.currentPage + 1,
              totalCount: response.data.totalCount,
            },
          })
        );
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div className="pt-16">
      <Head>
        <title>{`Finderr - Catalogue`}</title>
        <meta
          name="description"
          content={`Catalogue for brand ${startCase(slug)}`}
        />
        <meta name="keywords" content={startCase(slug)} />
      </Head>

      <div className="w-screen flex fixed top-0 items-center bg-white z-10 py-3 px-2 md:px-4 shadow-md">
        <ArrowBack className="cursor-pointer" onClick={() => router.back()} />
        <h2 className="text-lg font-bold ml-2">Catalog</h2>
      </div>

      {isEmpty(loadedProducts.loadedSearchItems) ? (
        <h1>Show a Loader</h1>
      ) : (
        <div className="px-2 md:px-4">
          <InfiniteScroll
            dataLength={loadedProducts.loadedSearchItems.length}
            next={callNextPage}
            hasMore={
              loadedProducts.loadedSearchItems.length <
              loadedProducts.totalCount
            }
            loader={<h4>Loading...</h4>}
            scrollableTarget="scrollableDiv"
          >
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {loadedProducts.loadedSearchItems.map((product, index) => (
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
                        src={
                          product.images[0]?.url ||
                          "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80"
                        }
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
      )}
    </div>
  );
}
