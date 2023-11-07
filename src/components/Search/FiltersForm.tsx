import { sendRequest } from "@/services/api";
import { TProductFiltersOptions } from "@/services/interfaces/components/searchPageComponent";
import { Checkbox, Drawer } from "@mui/material";
import { difference, includes, kebabCase, startCase, union } from "lodash";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { TPageQuery } from "./SearchPage";
import { setLoadedProduct } from "@/store/loadedProductSlice";
import { useRouter } from "next/router";
import QueryString from "qs";

type Props = {
  visible: boolean;
  filterState: TPageQuery;
  defaultTab?: keyof TProductFiltersOptions;
  onClose: () => void;
  clearAll: () => void;
};

const getUpdatedFilter = (
  type: "add" | "remove",
  filterType: "categories" | "brands",
  values: string[],
  _filters: TPageQuery
): string[] => {
  const parentArray =
    filterType === "categories"
      ? _filters.filters?.categories
      : _filters.filters?.brands;
  if (type === "add") {
    return union(parentArray, values);
  } else {
    return difference(parentArray, values);
  }
};

function FiltersForm({
  filterState,
  defaultTab,
  onClose,
  clearAll,
  visible,
}: Props) {
  const dispatch = useDispatch();
  const router = useRouter();
  const pageName = kebabCase(router.asPath);

  const [filterAndSortByOptions, setFilterAndSortByOptions] =
    useState<TProductFiltersOptions>();

  const [activeTab, setActiveTab] = useState<keyof TProductFiltersOptions>(
    defaultTab || "sort_by"
  );

  const [_filters, set_filters] = useState(filterState);

  useEffect(() => {
    sendRequest(`/website/search/products/get-filter-and-sortby-options`, {
      method: "get",
    }).then(({ data }) => {
      setFilterAndSortByOptions(data);
    });
  }, []);

  useEffect(() => {
    set_filters(filterState);
  }, [filterState]);

  useEffect(() => {
    setActiveTab(defaultTab || "categories");
  }, [defaultTab]);

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
    router.push({
      pathname: router.pathname,
      query: filterString,
    });
  };

  if (!filterAndSortByOptions) {
    // TODO: implement skelton loader
    return <></>;
  }

  return (
    <Drawer anchor="right" open={visible} onClose={onClose}>
      <div className="h-screen bg-white flex flex-col border w-screen lg:w-[50vw]  overflow-hidden">
        {/* Header */}
        <div className="border-b border-gray-200 p-2 bg-white w-full z-10 flex justify-between items-center">
          <span className="text-lg font-bold">Sort & Filter</span>
          <span
            className="text-sm text-blue-500 underline cursor-pointer"
            onClick={clearAll}
          >
            clear all
          </span>
        </div>
        {/* Filters */}
        <div className="flex flex-grow gap-2 md:gap-4 box-border overflow-hidden">
          {/* Left container */}
          <div className="w-2/6 bg-gray-200 relative" id="left-container">
            <div className="sticky top-0 w-full text-sm text-gray-500">
              <div
                className={`px-3 lg:px-5 py-2 lg:py-4 ${
                  activeTab === "sort_by" ? "bg-white" : ""
                }`}
                onClick={() => {
                  setActiveTab("sort_by");
                }}
              >
                Sort By
              </div>
              <div
                className={`px-3 lg:px-5 py-2 lg:py-4 ${
                  activeTab == "categories" ? "bg-white" : ""
                } `}
                onClick={() => {
                  setActiveTab("categories");
                }}
              >
                Categories
              </div>
              <div
                className={`px-3 lg:px-5 py-2 lg:py-4 ${
                  activeTab == "brands" ? "bg-white" : ""
                } `}
                onClick={() => {
                  setActiveTab("brands");
                }}
              >
                Brands
              </div>
              <div
                className={`px-3 lg:px-5 py-2 lg:py-4 ${
                  activeTab == "price" ? "bg-white" : ""
                } `}
                onClick={() => {
                  setActiveTab("price");
                }}
              >
                Price
              </div>
            </div>
          </div>
          {/* Right Container */}
          <div className="w-4/6 p-2 overflow-auto" id="right-container">
            <RightContainer
              filtersFromUrl={filterState}
              activeTab={activeTab}
              filterAndSortByOptions={filterAndSortByOptions}
              _filters={_filters}
              set_filters={set_filters}
            />
          </div>
        </div>
        {/* Footer buttons */}
        <div className="p-2 flex justify-between gap-4 lg:gap-10 border-gray-200 border-t cursor-pointer sticky bottom-0  z-10 bg-white">
          <div
            className="bg-white border border-brand text-brand font-semibold p-2 rounded flex-1 text-center"
            onClick={onClose}
          >
            Close
          </div>
          <div
            className="bg-brand text-white font-semibold p-2 rounded flex-1 text-center cursor-pointer"
            onClick={() => {
              updatePageFilters({ ..._filters, filter_bar_state: undefined });
            }}
          >
            Apply
          </div>
        </div>
      </div>
    </Drawer>
  );
}

interface IRightContainer {
  activeTab: keyof TProductFiltersOptions;
  filterAndSortByOptions: TProductFiltersOptions;
  filtersFromUrl: TPageQuery;
  _filters: TPageQuery;
  set_filters: Dispatch<SetStateAction<TPageQuery>>;
}
const RightContainer = ({
  activeTab,
  filterAndSortByOptions,
  _filters,
  filtersFromUrl,
  set_filters,
}: IRightContainer) => {
  const preDefinedPriceRanges = [
    { min: 500, max: 2000 },
    { min: 2000, max: 5000 },
    { min: 5000, max: 10000 },
    { min: 10000, max: 20000 },
  ];

  switch (activeTab) {
    case "sort_by":
      return (
        <div className="flex flex-wrap gap-3 lg:gap-4">
          {filterAndSortByOptions.sort_by.map((option) => (
            <div
              key={option}
              className={`px-3 py-2 rounded-lg text-sm cursor-pointer ${
                _filters.sort_by === option
                  ? "bg-brand text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
              onClick={() => {
                const newFilter: TPageQuery = {
                  ..._filters,
                  sort_by: option,
                };
                set_filters(newFilter);
              }}
            >
              {startCase(option)}
            </div>
          ))}
        </div>
      );
    case "brands":
      return (
        <div className="pb-4">
          {filterAndSortByOptions.brands.map((brand) => (
            <div className="text-xs" key={brand.value}>
              <Checkbox
                size="small"
                checked={includes(_filters.filters?.brands, brand.value)}
                onChange={(e) => {
                  const updatedFilers = getUpdatedFilter(
                    e.target.checked ? "add" : "remove",
                    "brands",
                    [brand.value],
                    _filters
                  );
                  const newFilter: TPageQuery = {
                    ..._filters,
                    filters: {
                      ..._filters.filters,
                      brands: updatedFilers,
                    },
                  };
                  set_filters(newFilter);
                }}
              />
              {brand.label}
            </div>
          ))}
        </div>
      );
    case "price":
      return (
        <div className="pb-4">
          {preDefinedPriceRanges.map((range) => {
            return (
              <div className="text-xs" key={range.max}>
                <Checkbox
                  size="small"
                  checked={
                    (_filters.max_price &&
                      _filters.min_price &&
                      parseInt(_filters.min_price) === range.min &&
                      parseInt(_filters.max_price) === range.max) ||
                    false
                  }
                  onChange={() => {
                    const newFilter: TPageQuery = {
                      ..._filters,
                      max_price: range.max.toString(),
                      min_price: range.min.toString(),
                    };
                    set_filters(newFilter);
                  }}
                />
                {`₹ ${range.min.toLocaleString(
                  "en-IN"
                )} - ₹ ${range.max.toLocaleString("en-IN")}`}
              </div>
            );
          })}
          <div className="mt-2 flex gap-2">
            <input
              type="text"
              className="border border-gray-600 rounded w-full text-sm p-1"
              placeholder="min price"
              value={_filters.min_price}
              onChange={({ target: { value } }) => {
                set_filters({ ..._filters, min_price: value });
              }}
            />
            <input
              type="text"
              className="border border-gray-600 rounded w-full text-sm p-1"
              placeholder="max price"
              value={_filters.max_price}
              onChange={({ target: { value } }) => {
                set_filters({ ..._filters, max_price: value });
              }}
            />
          </div>
        </div>
      );
    case "categories":
    default:
      return (
        <div className="pb-4">
          {filterAndSortByOptions.categories.map((category) => (
            <div key={category.mainSlug}>
              <div className="text-sm font-semibold">
                <Checkbox
                  size="small"
                  checked={includes(
                    _filters.filters?.categories,
                    category.mainSlug
                  )}
                  onChange={(e) => {
                    const updatedFilers = getUpdatedFilter(
                      e.target.checked ? "add" : "remove",
                      "categories",
                      [
                        category.mainSlug,
                        ...category.children.map((x) => x.value),
                      ],
                      _filters
                    );
                    const newFilter: TPageQuery = {
                      ..._filters,
                      filters: {
                        ..._filters.filters,
                        categories: updatedFilers,
                      },
                    };
                    set_filters(newFilter);
                  }}
                />
                {category.main}

                {category.children.map((child) => (
                  <div className="text-xs pl-3 font-normal" key={child.value}>
                    <Checkbox
                      size="small"
                      checked={includes(
                        _filters.filters?.categories,
                        child.value
                      )}
                      onChange={(e) => {
                        const updatedFilers = getUpdatedFilter(
                          e.target.checked ? "add" : "remove",
                          "categories",
                          [child.value],
                          _filters
                        );
                        const newFilter: TPageQuery = {
                          ..._filters,
                          filters: {
                            ..._filters.filters,
                            categories: updatedFilers,
                          },
                        };
                        set_filters(newFilter);
                      }}
                    />
                    {child.label}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      );
  }
};

export { FiltersForm };
