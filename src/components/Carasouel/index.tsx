import React from "react";
import Image from "next/legacy/image";
import Slider from "react-slick";

interface IProp {
  images: string[];
}

export default function Carousel({ images }: IProp) {
  const settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    className: "overflow-hidden",
  };

  return (
    <Slider {...settings}>
      {images.map((image, index) => (
        <div className="h-auto" key={index}>
          <div className="relative h-0 pb-[43%] mx-2 rounded-lg overflow-hidden">
            <Image
              layout="fill"
              objectFit="cover"
              alt={`explore local shops in jaipur ${index}`}
              src={image}
              placeholder="blur"
              blurDataURL={image}
            />
          </div>
        </div>
      ))}
    </Slider>
  );
}
