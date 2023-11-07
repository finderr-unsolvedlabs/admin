import React from "react";
import Slider from "react-slick";
import { IStoreModel } from "@/services/interfaces/common";

interface IProp {
  store: IStoreModel;
}

export default function StoreSlider({ store }: IProp) {
  var settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
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
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div>
      <Slider {...settings}>
        {store.images.map((image) => (
          <div key={image._id}>
            <img src={image.url} />
          </div>
        ))}
      </Slider>
    </div>
  );
}
