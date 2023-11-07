import { IEvent } from "@/services/interfaces/common";
import Image from "next/legacy/image";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import Link from "next/link";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { IEventOrOffer } from "@/services/interfaces/pages/home";
import { shuffle, startCase } from "lodash";

interface IProp {
  events: IEventOrOffer[];
  offers: IEventOrOffer[];
}

export const sliderSettings = {
  dots: false,
  infinite: true,
  autoplay: true,
  centerMode: true,
  centerPadding: "200px",
  speed: 2000,
  slidesToShow: 2,
  slidesToScroll: 1,
  className: "overflow-hidden center",
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 1,
        centerPadding: "40px",
      },
    },
  ],
};

function EventCarousal({ events, offers }: IProp) {
  let finalArray = [...events, ...offers];
  finalArray = shuffle(finalArray);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    // NOTE: this is to avoid hydration due to shuffle function
    setHydrated(true);
  }, []);

  return (
    <>
      <div className="my-5 px-4 md:my-10">
        <div className="mt-6 mb-5 flex justify-between">
          <div className="space-y-6 md:w-3/4">
            <p className="font-bold text-lg md:text-2xl">Events & Offers</p>
          </div>

          <Link href="/list/events-and-offers?view=events">
            <p className="text-brand">
              View More
              <ChevronRightIcon />
            </p>
          </Link>
        </div>

        <Slider {...sliderSettings}>
          {hydrated &&
            finalArray.map((item, index) => (
              <Link
                href={`/${item.type}/${item.slug}`}
                className="relative w-full"
                key={index}
              >
                <EventCarousalCard
                  url={item.image.url}
                  title={item.title}
                  type={item.type}
                />
              </Link>
            ))}
        </Slider>
      </div>
    </>
  );
}

interface ICardProps {
  title: string;
  type: string;
  url: string;
}

const EventCarousalCard = ({ title, url, type }: ICardProps) => {
  return (
    <div
      key={title}
      className={`relative h-0 pb-[100%] mx-2 rounded-lg overflow-hidden `}
    >
      <Image
        layout="fill"
        objectFit="cover"
        alt={title}
        src={url}
        placeholder="blur"
        blurDataURL={url}
      />
      <div className="absolute top-0 w-full h-full p-2 flex items-start justify-end text-white">
        <div className="text-sm font-semibold bg-black bg-opacity-60 p-1 md:p-2 rounded">
          <h3>{startCase(title.toLocaleLowerCase())}</h3>
        </div>
      </div>
    </div>
  );
};

export { EventCarousal };
