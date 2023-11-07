import React from "react";
import Slider from "react-slick";
import Link from "next/link";
import { Suspense } from "react";
import Loading from "@components/Utils/Loading";

import {
  FiCard,
  FiCardActionArea,
  FiCardContent,
  FiCardMedia,
} from "@components/FullImageCard";
import { IStoreModel } from "@/services/interfaces/common";
import { startCase } from "lodash";
import Image from "next/legacy/image";

interface IProp {
  stores: IStoreModel[];
}

export default function StoresAlbum({ stores }: IProp) {
  var settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,
    arrows: false,
    autoPlay: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1.3,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <Suspense fallback={<Loading />}>
      <div className="pt-5 px-3">
        <Slider {...settings}>
          {stores.map((store) => (
            <Link
              href={`/stores/${store.slug}`}
              style={{ textDecoration: "none" }}
              key={store.name}
            >
              <div className="relative h-56 md:h-80 rounded mx-2 overflow-hidden shadow-md">
                <Image
                  src={
                    store.images[0]?.url ||
                    `https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80`
                  }
                  alt={store.name}
                  placeholder="blur"
                  blurDataURL={
                    store.images[0]?.url ||
                    `https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80`
                  }
                  layout="fill"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-0 w-full h-full bg-gray-900 bg-opacity-50 p-2 flex items-end text-white">
                  <h2 className="text-sm font-semibold">
                    {startCase(store.name.toLocaleLowerCase())}
                  </h2>
                </div>
              </div>
            </Link>
          ))}
        </Slider>
      </div>
    </Suspense>
  );
}
