import { SidebarLayout } from "@/components/Layout/SidebarLayout";
import { AdminSidebar } from "@/components/Sidebar/AdminSidebar";
import React, { useState } from "react";
import { IProductModel, TOption } from "@/services/interfaces/common";
import { CategorySelector } from "@/components/selectors/CategorySelector";
import { BrandSelector } from "@/components/selectors/BrandSelector";
import { useFormik } from "formik";
import {
  ProductApi,
  TProductSearchParams,
  TSearchQueryOptions,
} from "@/services/api/product";
import { includes, startCase, without } from "lodash";
import { Checkbox, Divider } from "@mui/material";
import { TagsSelectorDropdown } from "@/components/selectors/ProductTagsSelector/TagsSelectorDropdown";
import { ProductTagApi } from "@/services/api/productTags";
import { BulkTaggingProductCard } from "@/components/ProductCard/BulkTaggingProductCard";
import { booleanArrayUpdate } from "@/utils/helper_functions/booleanArrayUpdate";

type Props = {};
type TInitialValeSearch = {
  brands?: TOption[];
  categories?: TOption[];
  search_query?: string;
  search_query_from?: TSearchQueryOptions[];
  tags?: TOption[];
  excluded_tags?: TOption[];
};

const availableSearchOptions: TSearchQueryOptions[] = [
  "name",
  "scraped_slug",
  "description",
];

const Tagging = (props: Props) => {
  return (
    <SidebarLayout
      MainComponent={<Main />}
      SidebarComponent={<AdminSidebar />}
    />
  );
};

const Main = () => {
  const [products, setProducts] = useState<IProductModel[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [tags, setTags] = useState<TOption[]>([]);
  const [assignCat, setAssignCat] = useState<TOption | null>(null);
  const [isSearchLoading, setIsSearchLoading] = useState(false);
  const [isApplyLoading, setIsApplyLoading] = useState(false);

  const initialValeSearch: TInitialValeSearch = {
    search_query_from: ["name", "scraped_slug"],
  };

  const queryForm = useFormik({
    initialValues: initialValeSearch,
    onSubmit: (values) => {
      setIsSearchLoading(true);
      const params: TProductSearchParams = {
        search_query: values.search_query,
        search_query_from: values.search_query_from,
        categories: values.categories?.map((x) => x.value),
        brands: values.brands?.map((x) => x.value),
        tags: values.tags?.map((x) => x.value),
        excluded_tags: values.excluded_tags?.map((x) => x.value),
      };
      ProductApi.list(params)
        .then(({ data: { data } }) => {
          setProducts(data.products);
        })
        .catch((err) => {
          alert(JSON.stringify(err));
        })
        .finally(() => {
          setIsSearchLoading(false);
        });
    },
  });

  const handleProductClick = (slug: string) => {
    if (includes(selectedProducts, slug)) {
      setSelectedProducts(without(selectedProducts, slug));
    } else {
      setSelectedProducts([...selectedProducts, slug]);
    }
  };

  return (
    <div className="p-4">
      <h1 className="font-semibold text-xl">Tagging</h1>
      <div className="flex mt-5 mb-3 items-end gap-5">
        <div className="flex-1">
          <div className="flex gap-6">
            {availableSearchOptions.map((entity) => {
              return (
                <div key={entity}>
                  <Checkbox
                    size="small"
                    id={entity}
                    checked={includes(
                      queryForm.values.search_query_from,
                      entity
                    )}
                    onChange={(e) => {
                      const updated = booleanArrayUpdate(
                        e.target.checked ? "add" : "remove",
                        queryForm.values.search_query_from || [],
                        [entity]
                      );

                      queryForm.setFieldValue("search_query_from", updated);
                    }}
                  />
                  <label htmlFor={entity} className="text-sm cursor-pointer">
                    {startCase(entity)}
                  </label>
                </div>
              );
            })}
          </div>

          <input
            type="text"
            placeholder="type here..."
            className="border rounded p-1 w-full"
            value={queryForm.values.search_query || ""}
            onChange={(e) => {
              if (e.target) {
                queryForm.setFieldValue("search_query", e.target.value || null);
              }
            }}
          />
        </div>

        <div
          className="bg-brand text-white w-48 text-center py-1 rounded cursor-pointer  border border-brand hover:text-brand hover:bg-white"
          onClick={() => {
            setSelectedProducts([]);
            queryForm.handleSubmit();
          }}
        >
          {isSearchLoading ? "..." : "Search"}
        </div>

        <div className="bg-brand text-white w-48 text-center py-1 rounded cursor-pointer border border-brand hover:text-brand hover:bg-white">
          Clear All Filters
        </div>
      </div>

      <div className="flex flex-col my-5 gap-3">
        <TagsSelectorDropdown
          isMulti
          value={queryForm.values.tags || null}
          label="Tags to Include"
          withSelectAll
          onchange={(options) => queryForm.setFieldValue("tags", options)}
        />

        <TagsSelectorDropdown
          isMulti
          withSelectAll
          value={queryForm.values.excluded_tags || null}
          label="Tags to Exclude"
          onchange={(options) =>
            queryForm.setFieldValue("excluded_tags", options)
          }
        />

        <CategorySelector
          value={queryForm.values.categories || null}
          isMulti
          onchange={(options) => queryForm.setFieldValue("categories", options)}
        />

        <BrandSelector
          value={queryForm.values.brands || null}
          isMulti
          onchange={(options) => queryForm.setFieldValue("brands", options)}
        />
      </div>

      <Divider className="mb-4" />

      <div className="flex flex-col gap-5">
        <div className="flex items-end gap-5">
          <div className="flex-1">
            <TagsSelectorDropdown
              isMulti
              value={tags}
              onchange={(options) => setTags(options as TOption[])}
            />
          </div>

          <div
            className="bg-green-800 text-white w-48 h-fit text-center leading-5 py-2 font-semibold rounded cursor-pointer border border-green-800 hover:text-green-800 hover:bg-white"
            onClick={() => {
              setIsApplyLoading(true);
              ProductTagApi.applyBulkTags({
                products: selectedProducts,
                tags: tags.map((x) => x.value),
              })
                .then((res) => {
                  alert(JSON.stringify(res.data));
                })
                .catch((err) => {
                  console.error(err);
                  alert(JSON.stringify(err));
                })
                .finally(() => {
                  setIsApplyLoading(false);
                });
            }}
          >
            {isApplyLoading ? "..." : "Apply"}
          </div>
        </div>

        <div className="flex items-end gap-5">
          <div className="flex-1">
            <CategorySelector
              label="Assign Category"
              value={assignCat}
              onchange={(option) => setAssignCat(option as TOption)}
            />
          </div>

          <div
            className="bg-green-800 text-white w-48 h-fit text-center leading-5 py-2 font-semibold rounded cursor-pointer border border-green-800 hover:text-green-800 hover:bg-white"
            onClick={() => {
              setIsApplyLoading(true);
              ProductApi.bulkUpdate({
                products: selectedProducts,
                category: assignCat?.value,
              })
                .then((res) => {
                  alert(
                    `${res.data.meta.modifiedCount}/ ${selectedProducts.length} products updated successfully!`
                  );
                })
                .catch(({ response: { data } }) => {
                  console.error(data);
                  alert(JSON.stringify(data));
                })
                .finally(() => {
                  setIsApplyLoading(false);
                });
            }}
          >
            {isApplyLoading ? "..." : "Apply"}
          </div>
        </div>
      </div>

      <div className="mt-8">
        <div className="flex justify-between">
          <p className="mb-4 text-gray-500 text-sm">
            {products.length} results
          </p>
          <p className="mb-4 text-gray-500 text-sm">
            {selectedProducts.length} selected
          </p>
        </div>
        <div className="flex gap-5 justify-end mb-4">
          <div
            className="bg-brand text-white px-4 py-1 rounded cursor-pointer border border-brand hover:text-brand hover:bg-white"
            onClick={() => {
              setSelectedProducts(products.map((x) => x.slug));
            }}
          >
            Select All
          </div>

          <div
            className="bg-brand text-white px-4 py-1 rounded cursor-pointer border border-brand hover:text-brand hover:bg-white"
            onClick={() => {
              setSelectedProducts([]);
            }}
          >
            Deselect All
          </div>
        </div>

        <div className="grid grid-cols-5 gap-4">
          {products.map((product) => (
            <BulkTaggingProductCard
              key={product.slug}
              product={product}
              isSelected={includes(selectedProducts, product.slug)}
              onMediaClick={(slug) => {
                handleProductClick(slug);
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tagging;
