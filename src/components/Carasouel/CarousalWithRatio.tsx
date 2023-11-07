import { IBanner } from "@/pages";
import Image from "next/legacy/image";
import Link from "next/link";
import React from "react";
import Slider from "react-slick";

interface IProp {
  banners: IBanner[];
  heightPercent: number;
}

export const sliderSettings = {
  dots: false,
  infinite: true,
  autoplay: true,
  speed: 1000,
  slidesToShow: 1,
  slidesToScroll: 1,
  className: "overflow-hidden",
};

function CarouselWithRatio({ banners, heightPercent }: IProp) {
  return (
    <Slider {...sliderSettings}>
      {banners.map((banner, index) => (
        <Link key={banner.link} href={banner.link || "#"}>
          <div className="relative w-full">
            <div
              className={`relative h-0 pb-[${heightPercent}%] rounded-lg overflow-hidden`}
            >
              <Image
                layout="fill"
                objectFit="cover"
                alt={`explore local shops in jaipur ${index}`}
                src={banner.image}
                priority={index === 0}
                placeholder="blur"
                blurDataURL={banner.image}
              />
            </div>
          </div>
        </Link>
      ))}
    </Slider>
  );
}

export { CarouselWithRatio };
