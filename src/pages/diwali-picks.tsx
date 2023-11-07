import { TitleBar } from "@/components/Navbar/TitleBar";
import { LandingPageSEO } from "@/components/SEOHeaders/LandingPage";
import { LandingPagesApi } from "@/services/api/landingPages";
import { IProductModel } from "@/services/interfaces/common";
import { IStore } from "@/services/interfaces/redux";
import {
  setLoadedProduct,
  updateLoadedProductScrollPosition,
} from "@/store/loadedProductSlice";
import { kebabCase, startCase } from "lodash";
import Image from "next/legacy/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

type Props = { products: IProductModel[] };

export async function getStaticProps() {
  return await LandingPagesApi.getDiwaliPicks().then((response) => {
    return {
      props: response.data,
    };
  });
}

const Page = ({ products }: Props) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const loadedProducts = useSelector((store: IStore) => store.loadedProducts);
  const pageName = kebabCase(router.asPath);

  useEffect(() => {
    if (loadedProducts.pageName === pageName) {
      window.scrollTo(0, loadedProducts.latestScrollPosition || 0);
    } else {
      dispatch(
        setLoadedProduct({
          data: {
            pageName: pageName,
            loadedSearchItems: products,
            currentPage: 1,
            totalCount: products.length,
          },
        })
      );
    }
  }, []);

  return (
    <div>
      <LandingPageSEO
        pageTitle="Diwali's Handpicked Outfits | Jaipur"
        metaTitle="Finderr | Find the Best Diwali Outfits & Offers in Jaipur Stores "
        description=" Finderr App is your ultimate guide to Diwali shopping in Jaipur! Explore the finest Diwali outfits and exclusive offers from top stores in Jaipur. Get ready to celebrate the festival of lights in style. Download Finderr now and start your Diwali shopping spree today!"
        fullPageUrl="https://shop.finderr.co.in/diwali-picks"
        ogImage="https://finderrimages1.s3.ap-south-1.amazonaws.com/Banner+Images/Diwali+Banner.png"
      />

      <TitleBar
        title="Top Diwali Picks"
        onBack={() => {
          router.push("/");
        }}
      />

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-2 md:px-4">
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
                  src={
                    product.images[0]?.url ||
                    "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80"
                  }
                  alt={product.name}
                />
              </div>

              <div className="p-4">
                <h3 className="text-base font-semibold text-gray-900 truncate">
                  {startCase(product.brand.name)}
                </h3>
                <h2 className="text-sm text-gray-500 font-light truncate">
                  {product.name}
                </h2>
                <p className="font-semibold mt-2 text-gray-700 text-sm">
                  ₹ {product.price.toLocaleString("en-IN")}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Page;
