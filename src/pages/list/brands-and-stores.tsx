import Navbar from "@components/Navbar";
import Footer from "@components/Footer";
import { fetchData } from "@services/api";
import Head from "next/head";
import { GetServerSidePropsContext } from "next";
import { IStorePageData } from "@services/interfaces/pages/store";
import Image from "next/legacy/image";
import { BrandApi } from "@/services/api/brand";
import { IBrandModel, IStoreModel } from "@/services/interfaces/common";
import { useRouter } from "next/router";
import { kebabCase } from "lodash";
import FullImageCardAlbum from "@/components/Utils/FullImageCardAlbum";
import { StoreApi } from "@/services/api/store";
import StoresList from "@/components/Store/StoresList";
import { TitleBar } from "@/components/Navbar/TitleBar";

type TPageQuery = {
  view: "brands" | "stores";
};

const tabs: TPageQuery["view"][] = ["brands", "stores"];

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { view } = context.query as TPageQuery;

  if (view === "brands") {
    return await BrandApi.list().then(({ data }) => {
      return {
        props: { data: data.data },
      };
    });
  } else {
    return await StoreApi.list().then(({ data }) => {
      return {
        props: { data: data.data },
      };
    });
  }
}

type TParams = {
  data: { brands?: IBrandModel[]; stores?: IStoreModel[] };
};

export default function BrandStoreListPage({ data }: TParams) {
  const router = useRouter();
  const quires = router.query as TPageQuery;
  const pageName = kebabCase(router.asPath);

  return (
    <>
      <Head>
        <title>{`Finderr - Brands & Store`}</title>
        <meta
          name="description"
          content="explores best fashion brands and stores in Jaipur"
        />
        <meta
          name="keywords"
          content={JSON.stringify(data.brands?.map((x) => x.name))}
        />
      </Head>

      <div className="pb-20 mt-2 w-[94vw] w-max-[1200px] mx-auto">
        <TitleBar
          title="Brands & Stores"
          onBack={() => {
            router.push("/");
          }}
        />
        <div className="flex gap-2 pt-5 lg:gap-4 sticky top-[38px] z-10 bg-white pb-4">
          {tabs.map((view) => (
            <div
              key={view}
              className={`flex-1 text-center text-sm p-1 cursor-pointer border border-brand rounded font-semibold ${
                quires.view === view ? "text-white bg-brand" : "text-brand"
              }`}
              onClick={() => {
                router.replace({
                  pathname: router.pathname,
                  query: { view: view },
                });
              }}
            >
              <span>{view.toUpperCase()}</span>
            </div>
          ))}
        </div>

        {quires.view === "brands" ? (
          <>
            <FullImageCardAlbum
              cards={
                data.brands?.map((x) => {
                  return {
                    title: x.name,
                    link: `/brands/${x.slug}`,
                    image: x.cover_images[0].url,
                  };
                }) || []
              }
            />
          </>
        ) : (
          <>
            <StoresList stores={data.stores || []} />
          </>
        )}
      </div>

      <Footer />
    </>
  );
}
