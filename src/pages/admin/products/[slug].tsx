import { ProductApi } from "@/services/api/product";
import { IProductModel, TOption } from "@/services/interfaces/common";
import { startCase } from "lodash";
import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import ArrowForward from "@mui/icons-material/ArrowForward";
import { CategorySelector } from "@/components/selectors/CategorySelector";
import ProductTagSelector from "@/components/selectors/ProductTagsSelector";

export async function getServerSideProps(
  context: GetServerSidePropsContext<{ slug: string }>
) {
  const slug = context.params?.slug;
  if (slug) {
    const productPageData = await ProductApi.getProduct(slug);
    return {
      props: { ...productPageData.data },
    };
  } else {
    console.error(`\n\n slug is not specified \n\n`);
  }
}

type Props = {
  product: IProductModel;
  nextProduct: string;
};
const ProductPage = ({ product, nextProduct }: Props) => {
  const router = useRouter();

  const onCategoryChange = (item: TOption | null) => {};

  return (
    <>
      <div className="w-11/12 mx-auto flex my-10 gap-5">
        <div className="w-2/5">
          <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
            {product.images.map((image) => (
              <div>
                <img
                  className="h-auto max-w-full rounded-lg"
                  src={image.url}
                  alt={image.slug}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="w-3/5 flex flex-col gap-5">
          <div className="font-semibold text-xl">{startCase(product.name)}</div>
          <div>
            <div className="font-medium mb-2">Description:</div>
            {product.description ? (
              <p className="text-gray-600">{product.description}</p>
            ) : (
              <span className="text-gray-500 italic font-light">
                no description
              </span>
            )}
          </div>

          <div className="flex gap-14">
            <div>
              <div className="font-medium mb-2">Relevance:</div>
              <p className="text-gray-600">{product.relevance}</p>
            </div>
            <div>
              <div className="font-medium mb-2">Price:</div>
              <p className="text-gray-600">
                {product.price.toLocaleString("en-In")}
              </p>
            </div>
          </div>

          <div>
            <CategorySelector
              value={{
                label: product.category.name,
                value: product.category.slug,
              }}
              onchange={onCategoryChange}
            />
          </div>

          <div>
            <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-400" />
            <div className="text-xl text-gray-500 font-semibold mb-5">
              Tags:
            </div>

            <ProductTagSelector />
          </div>

          {/* SECTION: action buttons */}
          <div className="flex justify-between mt-10">
            <div className="bg-brand text-white text-lg cursor-pointer font-medium px-5 py-2 rounded-lg">
              Save
            </div>
            <div
              className="px-3 flex justify-center text-lg cursor-pointer items-center gap-1 py-2 border border-brand rounded-lg text-brand font-medium"
              onClick={() => {
                router.push(`/admin/products/${nextProduct}`);
              }}
            >
              Next <ArrowForward />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductPage;
