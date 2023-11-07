import Navbar from "@components/Navbar";
import Footer from "@components/Footer";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Link from "next/link";
import Divider from "@mui/material/Divider";
import { fetchData } from "@services/api";
import Head from "next/head";
import { GetServerSidePropsContext } from "next";
import { IStorePageData } from "@services/interfaces/pages/store";
import Image from "next/legacy/image";
import { sliderSettings } from "@/components/Carasouel/CarousalWithRatio";
import Slider from "react-slick";
import QueryString from "qs";

export async function getServerSideProps(
  context: GetServerSidePropsContext<{ slug: string }>
) {
  const slug = context.params?.slug;

  const brandData = await fetchData(`website/pages/stores/${slug}`);

  return {
    props: { data: brandData.data.data },
  };
}

export default function Store({ data: { store } }: IStorePageData) {
  return (
    <div style={{ position: "relative", minHeight: "100vh" }}>
      <Head>
        <title>{`Finderr - ${store.brand.name} Store`}</title>
        <meta name="description" content={store.address.address} />
        <meta name="keywords" content={store.name} />
      </Head>

      <Navbar />

      <div className="pb-20">
        <div className="w-full md:w-10/12 max-w-[1400px] flex flex-col lg:flex-row gap-8 p-2 mx-auto my-8">
          <div className="w-full lg:w-1/2">
            {/* <CarouselWithRatio
              images={store.images.map((x) => x.url)}
              heightPercent={58}
            /> */}
            <Slider {...sliderSettings}>
              {store.images.map((image, index) => (
                <div className="relative w-full" key={index}>
                  <div
                    className={`relative h-0 pb-[58%] mx-2 rounded-lg overflow-hidden`}
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
            <div className="relative w-1/4 h-0 pb-[17%] rounded-lg overflow-hidden mb-3 md:mb-5">
              <Image
                layout="fill"
                objectFit="cover"
                alt={`${store.brand.name} logo`}
                src={store.brand.logo.url}
                placeholder="blur"
                blurDataURL={store.brand.logo.url}
              />
            </div>

            <p className="text-2xl font-bold p-2 md:p-4 mb">{store.name}</p>

            <div className="px-2 py-4  md:p-4">
              <div className="flex justify-between items-center mb-3">
                <p className="">Location</p>
                <LocationOnIcon />
              </div>
              <Link href={store.address.google_map_link} target="_blank">
                <p className="text-sm">{store.address.address}</p>
              </Link>
            </div>
            <Divider className="my-4" />

            <Link
              href={{
                pathname: `/search`,
                query: QueryString.stringify({
                  filters: { brands: [store.brand.slug] },
                }),
              }}
            >
              <div className="flex justify-between items-center px-2 py-4 md:p-4">
                <p className="">Brand Catalogue</p>
                <ChevronRightIcon />
              </div>
            </Link>
          </div>
        </div>
      </div>

      <div style={{ position: "absolute", bottom: "0", width: "100%" }}>
        <Footer />
      </div>
    </div>
  );
}
