import { SidebarLayout } from "@/components/Layout/SidebarLayout";
import { AdminSidebar } from "@/components/Sidebar/AdminSidebar";
import React, { useState } from "react";
import { IProductModel, TOption } from "@/services/interfaces/common";
import { CategorySelector } from "@/components/selectors/CategorySelector";
import { BrandSelector } from "@/components/selectors/BrandSelector";
import { useFormik } from "formik";
import { ProductApi, TProductSearchParams } from "@/services/api/product";
import { includes, without } from "lodash";
import { Divider } from "@mui/material";
import { TagsSelectorDropdown } from "@/components/selectors/ProductTagsSelector/TagsSelectorDropdown";
import { ProductTagApi } from "@/services/api/productTags";
import { BulkTaggingProductCard } from "@/components/ProductCard/BulkTaggingProductCard";

type Props = {};
type TInitialValeSearch = {
  brands?: TOption[];
  categories?: TOption[];
  tags?: TOption[];
  excluded_tags?: TOption[];
  search_query?: string;
};

const Brands = (props: Props) => {
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

  const initialValeSearch: TInitialValeSearch = {};

  const queryForm = useFormik({
    initialValues: initialValeSearch,
    onSubmit: (values) => {
      const params: TProductSearchParams = {
        search_query: values.search_query,
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
          alert(err);
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
      <div className="flex my-3 items-center gap-5">
        <input
          type="text"
          placeholder="type here..."
          className="border rounded p-1 flex-1"
          value={queryForm.values.search_query || ""}
          onChange={(e) => {
            if (e.target) {
              queryForm.setFieldValue("search_query", e.target.value || null);
            }
          }}
        />

        <div
          className="bg-brand text-white w-48 text-center py-1 rounded cursor-pointer  border border-brand hover:text-brand hover:bg-white"
          onClick={() => {
            setSelectedProducts([]);
            queryForm.handleSubmit();
          }}
        >
          Search
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
            ProductTagApi.applyBulkTags({
              products: selectedProducts,
              tags: tags.map((x) => x.value),
            }).then((res) => {
              alert(JSON.stringify(res.data));
            });
          }}
        >
          Apply
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

export default Brands;
