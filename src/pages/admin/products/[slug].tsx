import { ProductApi } from "@/services/api/product";
import { IProductModel } from "@/services/interfaces/common";
import { startCase } from "lodash";
import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

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
  previousProduct: string;
};
const ProductPage = ({ product }: Props) => {
  const router = useRouter();

  return (
    <>
      <div className="w-11/12 mx-auto flex my-5 gap-3">
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
        <div className="w-3/5 flex flex-col gap-4">
          <div className="font-semibold text-xl">{startCase(product.name)}</div>
          <div>
            <div className="font-medium">Description:</div>
            {product.description ? (
              <p>{product.description}</p>
            ) : (
              <span className="text-gray-500 italic font-light">
                no description
              </span>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductPage;
