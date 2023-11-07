import Navbar from "@components/Navbar";
import Footer from "@components/Footer";
import Link from "next/link";
import Divider from "@mui/material/Divider";
import Head from "next/head";
import { GetServerSidePropsContext } from "next";
import Image from "next/legacy/image";
import { IEvent, IOfferModel } from "@/services/interfaces/common";
import { useRouter } from "next/router";
import { kebabCase } from "lodash";
import { OfferApi } from "@/services/api/offer";
import StoresList from "@/components/Store/StoresList";
import { EventApi } from "@/services/api/event";
import { FullImageSubTitleCard } from "@/components/Utils/FullImageSubTitleCard";
import { TitleBar } from "@/components/Navbar/TitleBar";

type TPageQuery = {
  view: "events" | "offers";
};

const tabs: TPageQuery["view"][] = ["events", "offers"];

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { view } = (context.query as TPageQuery) || "events";

  if (view === "events") {
    return await EventApi.list().then(({ data }) => {
      return {
        props: { data },
      };
    });
  } else {
    return await OfferApi.list().then(({ data }) => {
      return {
        props: { data },
      };
    });
  }
}

type TParams = {
  data: { offers?: IOfferModel[]; events?: IEvent[] };
};

export default function EventOfferListPage({ data }: TParams) {
  const router = useRouter();
  const quires = router.query as TPageQuery;
  const View = quires.view || "events";
  const pageName = kebabCase(router.asPath);

  return (
    <>
      <Head>
        <title>{`Finderr - Events & Offers`}</title>
        <meta
          name="description"
          content="Get to know about  events and best ongoing discount in Jaipur"
        />
        <meta
          name="keywords"
          content={JSON.stringify(data.events?.map((x) => x.title))}
        />
      </Head>

      <div className="pb-20 mt-2 w-[94vw] w-max-[1200px] min-h-screen mx-auto">
        <TitleBar
          title="Events & Offers"
          onBack={() => {
            router.push("/");
          }}
        />

        <div className="flex gap-2 pt-5 lg:gap-4 sticky top-[38px] z-10 bg-white pb-4">
          {tabs.map((view) => (
            <div
              key={view}
              className={`flex-1 text-center text-sm p-1 cursor-pointer border border-brand rounded font-semibold ${
                View === view ? "text-white bg-brand" : "text-brand"
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

        <FullImageSubTitleCard
          cards={
            data[View]?.map((x) => {
              return {
                title: x.title,
                link: `/${View}/${x.slug}`,
                image: x.image.url,
              };
            }) || []
          }
        />
      </div>

      <Footer />
    </>
  );
}
