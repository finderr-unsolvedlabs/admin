import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import FilterListIcon from "@mui/icons-material/FilterList";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { FiltersForm } from "./FiltersForm";
import {
  ISortByOptions,
  TProductFiltersOptions,
} from "@/services/interfaces/components/searchPageComponent";
import { IStore } from "@/services/interfaces/redux";
import { setLoadedProduct } from "@/store/loadedProductSlice";
import { kebabCase, unionBy } from "lodash";
import QueryString from "qs";
import ProductInfiniteScroll from "../Product/ProductInfiniteScroll";
import { SearchApi } from "@/services/api/search";

type Props = {};

export type TPageQuery = {
  search_query?: string;
  filters?: {
    categories?: string[];
    brands?: string[];
  };
  sort_by?: ISortByOptions;
  min_price?: string;
  max_price?: string;
  filter_bar_state?: keyof TProductFiltersOptions;
};

function SearchPage({}: Props) {
  const dispatch = useDispatch();
  const router = useRouter();
  const quires = router.query;
  const pageName = kebabCase(router.asPath);

  const loadedProducts = useSelector((store: IStore) => store.loadedProducts);

  // NOTE: this state is redundant actually it only because we do not want to change page route on filter sidebar open and closed
  const [utilityBarState, setUtilityBarState] =
    useState<keyof TProductFiltersOptions>();

  const [queryState, setQueryState] = useState<TPageQuery>({});

  const updatePageFilters = (newFilter: TPageQuery) => {
    dispatch(
      setLoadedProduct({
        data: {
          pageName: pageName,
          currentPage: 1,
          loadedSearchItems: [],
          totalCount: 0,
        },
      })
    );
    const filterString = QueryString.stringify(newFilter, {
      arrayFormat: "brackets",
    });
    router.replace({
      pathname: router.pathname,
      query: filterString,
    });
  };

  useEffect(() => {
    const _query = QueryString.parse(quires as any) as TPageQuery;
    setUtilityBarState(_query.filter_bar_state);
    setQueryState(_query);

    if (
      loadedProducts.loadedSearchItems.length &&
      loadedProducts.pageName === pageName
    ) {
      window.scrollTo(0, loadedProducts.latestScrollPosition || 0);
    } else {
      if (loadedProducts.pageName) {
        SearchApi.searchProduct({
          ..._query,
          page: loadedProducts.currentPage,
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
      } else {
        dispatch(
          setLoadedProduct({
            data: {
              pageName: pageName,
              currentPage: 1,
              loadedSearchItems: [],
              totalCount: 0,
            },
          })
        );
      }
    }
  }, [quires, loadedProducts.pageName]);

  const callNextPage = () => {
    console.log(queryState);
    SearchApi.searchProduct({
      ...queryState,
      page: loadedProducts.currentPage + 1,
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
    <div className="layout h-screen">
      {/* SECTION: Header */}
      <div className="header z-10 fixed top-0 w-full bg-white p-3 pb-0">
        <div>
          <div className="mx-auto mb-3">
            <div className="flex-row justify-between">
              <div className=" flex justify-between">
                <p className="font-bold text-lg md:text-2xl">Search</p>
                <CloseIcon
                  onClick={() => router.back()}
                  style={{ cursor: "pointer" }}
                />
              </div>
            </div>
          </div>

          <div className="flex mb-3">
            <div className="w-full flex relative">
              <input
                className="flex h-10 w-full rounded-md border border-black bg-transparent px-3 py-3 text-base placeholder:text-gray-400  disabled:cursor-not-allowed disabled:opacity-50 focus:outline-black/30"
                placeholder="Search Products"
                onChange={(e) => {
                  setQueryState({
                    ...queryState,
                    search_query: e.target.value,
                  });
                }}
                value={queryState.search_query || ""}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    updatePageFilters(queryState);
                  }
                }}
              ></input>
              <div
                style={{
                  position: "absolute",
                  right: "12px",
                  top: "7px",
                  height: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <p
                  onClick={() => {
                    updatePageFilters({
                      ...queryState,
                      search_query: undefined,
                    });
                  }}
                  style={{ color: "grey", cursor: "pointer" }}
                >
                  clear
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Section: Cards Body */}
      <div className="pt-28">
        <ProductInfiniteScroll
          products={loadedProducts.loadedSearchItems}
          dataLength={loadedProducts.loadedSearchItems.length}
          callNextPage={callNextPage}
          hasMore={
            loadedProducts.loadedSearchItems.length < loadedProducts.totalCount
          }
        />
      </div>

      {/* Section: footer: Filter Bar  */}
      <div className="footer fixed bottom-0 w-screen bg-black">
        <div className="flex justify-around text-white px-6">
          <div
            onClick={() => {
              setUtilityBarState("sort_by");
            }}
            className="text-center flex-1 py-2 px-4 cursor-pointer space-x-1"
          >
            <ImportExportIcon />
            <span>Sort By</span>
          </div>
          <div className="w-0.5 bg-white m-1 rounded-sm"></div>
          <div
            onClick={() => {
              setUtilityBarState("categories");
            }}
            className="text-center flex-1 py-2 px-4 cursor-pointer space-x-2"
          >
            <FilterListIcon />
            <span>Filters</span>
          </div>
        </div>
      </div>
      {/* SECTION: sidebar and popups */}
      {queryState && (
        <FiltersForm
          visible={utilityBarState != null}
          defaultTab={utilityBarState || "categories"}
          filterState={queryState}
          clearAll={() => {
            const newFilter: TPageQuery = {
              filters: undefined,
              sort_by: undefined,
              filter_bar_state: undefined,
              search_query: undefined,
            };
            updatePageFilters(newFilter);
          }}
          onClose={() => {
            const newFilters = { ...queryState, filter_bar_state: undefined };
            setQueryState(newFilters);
            updatePageFilters(newFilters);
            // setUtilityBarState(undefined);
          }}
        />
      )}
    </div>
  );
}

export default SearchPage;
