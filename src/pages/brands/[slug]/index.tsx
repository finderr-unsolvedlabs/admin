import { useState } from "react";
import Link from "next/link";
import Head from "next/head";
import { GetServerSidePropsContext } from "next";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Divider } from "@mui/material";

import Navbar from "@components/Navbar";
import Album from "@components/Utils/Album";
import Footer from "@components/Footer";
import StorePopUp from "@components/Store/StorePopUp";
import { fetchData } from "@services/api";
import { IBrandPageData } from "@/services/interfaces/pages/brand";
import {
  CarouselWithRatio,
  sliderSettings,
} from "@/components/Carasouel/CarousalWithRatio";
import Image from "next/legacy/image";
import { BrandApi } from "@/services/api/brand";
import Slider from "react-slick";
import QueryString from "qs";
export async function getServerSideProps(
  context: GetServerSidePropsContext<{ slug: string }>
) {
  const slug = context.params?.slug;

  const brandData = await BrandApi.getBrand(slug as string);

  return {
    props: { data: brandData.data.data },
  };
}

export default function Brand({
  data: { brand, products, stores },
}: IBrandPageData) {
  const [storeOpen, setStoreOpen] = useState(false);
  return (
    <div>
      <Head>
        <title>{`Finderr - ${brand.name}`}</title>
        <meta name="description" content={brand.description || ""} />
        <meta name="keywords" content={brand.name} />
      </Head>
      <Navbar />

      <div className="w-full md:w-10/12 max-w-[1400px] flex flex-col lg:flex-row gap-8 p-2 mx-auto my-8">
        <div className="w-full lg:w-1/2">
          <Slider {...sliderSettings}>
            {brand.cover_images.map((image, index) => (
              <div className="relative w-full" key={index}>
                <div
                  className={`relative h-0 pb-[146%] mx-2 rounded-lg overflow-hidden`}
                >
                  <Image
                    layout="fill"
                    objectFit="cover"
                    alt={`explore local shops in jaipur ${index}`}
                    src={image.url}
                    placeholder="blur"
                    blurDataURL={image.url}
                  />
                </div>
              </div>
            ))}
          </Slider>
        </div>
        <div className="flex-1">
          <div className="relative w-1/2 h-0 pb-[34%] mx-auto rounded-lg overflow-hidden mb-3 md:mb-5">
            <Image
              layout="fill"
              objectFit="cover"
              alt={`${brand.name} brand logo`}
              src={brand.logo.url}
              placeholder="blur"
              blurDataURL={brand.logo.url}
            />
          </div>

          <p className="text-center text-sm mb-8">{brand.description}</p>

          <Link
            href={{
              pathname: `/search`,
              query: QueryString.stringify({
                filters: { brands: [brand.slug] },
              }),
            }}
          >
            <div className="flex justify-between items-center px-2 md:px-4 my-6">
              <p className="">Brand Catalogue</p>
              <ChevronRightIcon />
            </div>
          </Link>

          <Divider />

          <div
            onClick={() => setStoreOpen(true)}
            className="flex justify-between items-center px-2 md:px-4 my-6"
          >
            <p>Store Locator</p>
            <ChevronRightIcon />
          </div>

          <Divider className="my-4" />

          <Link href={`tel:+91${brand.contact.phone}`}>
            <div className="flex flex-col justify-between px-2 md:px-4 my-6">
              <p className=" mb-2">Contact Brand</p>
              <p className="text-sm underline text-blue-500">
                {brand.contact.phone}
              </p>
            </div>
          </Link>
        </div>
      </div>

      <div>
        <div className="mx-auto px-4">
          <div className="mt-6 flex justify-between">
            <div className="space-y-6 md:w-3/4 mb-2 ">
              <p className="font-bold text-lg md:text-2xl">Recommended</p>
            </div>

            <Link
              href={{
                pathname: `/search`,
                query: QueryString.stringify({
                  filters: { brands: [brand.slug] },
                }),
              }}
            >
              <p
                style={{
                  display: "flex",
                  alignItems: "end",
                  color: "#4169E1",
                  fontWeight: "500",
                  fontSize: "16px",
                  cursor: "pointer",
                }}
              >
                View More
                <ChevronRightIcon />
              </p>
            </Link>
          </div>
        </div>
        {products && <Album products={products} />}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
          }}
        >
          <Link
            href={{
              pathname: `/search`,
              query: QueryString.stringify({
                filters: { brands: [brand.slug] },
              }),
            }}
          >
            <p style={{ textDecoration: "underline", color: "grey" }}>
              Load More
            </p>
          </Link>
        </div>
      </div>
      <Footer />
      <StorePopUp
        open={storeOpen}
        handleClose={() => setStoreOpen(false)}
        stores={stores}
        brandName={brand.name}
      />
    </div>
  );
}
