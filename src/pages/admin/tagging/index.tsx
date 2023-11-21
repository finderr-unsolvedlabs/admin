import { SidebarLayout } from "@/components/Layout/SidebarLayout";
import { AdminSidebar } from "@/components/Sidebar/AdminSidebar";
import Select from "react-select";
import React, { useState } from "react";
import { IProductModel, TOption } from "@/services/interfaces/common";
import { CategorySelector } from "@/components/selectors/CategorySelector";
import { BrandSelector } from "@/components/selectors/BrandSelector";
import { useFormik } from "formik";
import { ProductApi, TProductSearchParams } from "@/services/api/product";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import { includes, without } from "lodash";
import { Divider } from "@mui/material";
import ProductTagSelector from "@/components/selectors/ProductTagsSelector";
import { TagsSelectorDropdown } from "@/components/selectors/ProductTagsSelector/TagsSelectorDropdown";
import { ProductTagApi } from "@/services/api/productTags";

type Props = {};
type TInitialValeSearch = {
  brands?: TOption[];
  categories?: TOption[];
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
          onClick={() => queryForm.handleSubmit()}
        >
          Search
        </div>

        <div className="bg-brand text-white w-48 text-center py-1 rounded cursor-pointer border border-brand hover:text-brand hover:bg-white">
          Clear All Filters
        </div>

        {/* <Select
          name="color"
          className="basic-single w-64"
          classNamePrefix="select"
          defaultValue={searchFrom}
          isSearchable
          options={searchFromOptions}
          value={searchFrom}
          onChange={(option) => {
            if (option) {
              setSearchFrom(option);
            }
          }}
        /> */}
      </div>

      <div className="flex flex-col my-5 gap-3">
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
            }).then((res) => alert(JSON.stringify(res.data)));
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
            <div
              key={product.slug}
              className={`cursor-pointer relative`}
              onClick={() => {
                handleProductClick(product.slug);
              }}
            >
              <div
                className={
                  includes(selectedProducts, product.slug)
                    ? `absolute h-full w-full top-0 left-0 bg-black bg-opacity-5 flex justify-center items-center`
                    : "hidden"
                }
              >
                <TaskAltIcon sx={{ fontSize: 50, color: "#fff" }} />
              </div>
              <Card sx={{ maxWidth: 345 }} key={product.slug}>
                <CardMedia
                  sx={{ height: 250 }}
                  image={product.images[0].url}
                  title={product.images[0].slug}
                />
                <CardContent>
                  <div className="text-sm h-11">{product.name}</div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Brands;
