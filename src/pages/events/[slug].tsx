import Navbar from "@components/Navbar";
import Footer from "@components/Footer";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Link from "next/link";
import Divider from "@mui/material/Divider";
import Head from "next/head";
import { GetServerSidePropsContext } from "next";
import Image from "next/legacy/image";
import { EventApi } from "@/services/api/event";
import { IEvent } from "@/services/interfaces/common";
import { TitleBar } from "@/components/Navbar/TitleBar";

export async function getServerSideProps(
  context: GetServerSidePropsContext<{ slug: string }>
) {
  const slug = context.params?.slug;

  const offerData = await EventApi.index(slug as string);

  return {
    props: { data: offerData.data.data },
  };
}

export default function Store({ data }: { data: IEvent }) {
  return (
    <div style={{ position: "relative", minHeight: "100vh" }}>
      <Head>
        <title>{`Finderr - ${data.title} in Jaipur`}</title>
        <meta name="description" content={data.description || data.title} />
        <meta name="keywords" content={data.title} />
      </Head>

      <div className="pb-20">
        <TitleBar title="Event" />
        <div className="w-full md:w-10/12 max-w-[1400px] flex flex-col lg:flex-row gap-8 p-2 mx-auto mb-8 mt-2">
          <div className="w-full lg:w-1/2">
            <div
              className={`relative h-0 pb-[100%] rounded-lg overflow-hidden`}
            >
              <Image
                layout="fill"
                objectFit="cover"
                alt={data.title}
                src={data.image.url}
                placeholder="blur"
                blurDataURL={data.image.url}
              />
            </div>
          </div>
          <div className="flex-1">
            <p className="text-2xl font-bold py-2 md:py-4 mb">{data.title}</p>

            <p className="text-sm mb-4">{data.description}</p>
            <Divider className="my-4" />

            <Link href={data.action.url} target="_blank">
              <div className="flex justify-between items-center py-4 md:py-4">
                <p className="">{data.action.label}</p>
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
