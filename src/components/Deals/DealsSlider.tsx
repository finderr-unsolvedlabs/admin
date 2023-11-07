import React from "react";
import Slider from "react-slick";
import Card from "@mui/material/Card";

import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

export default function DealsSlider() {
  var settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    arrows: false,
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
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div>
      <div className="mx-auto px-4">
        <div className="mt-6 flex justify-between">
          <div className="space-y-6 md:w-3/4">
            <p className="font-bold text-lg md:text-2xl">Trending Deals</p>
          </div>

          <Link href="/deals">
            <p
              style={{
                display: "flex",
                alignItems: "end",
                color: "#4169E1",
                fontWeight: "500",
                fontSize: "16px",
              }}
            >
              View More
              <ChevronRightIcon />
            </p>
          </Link>
        </div>
      </div>
      <div style={{ marginTop: "10px", maxWidth: "100vw" }}>
        <Slider {...settings}>
          <div>
            <div style={{ padding: "10px" }}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  position: "relative",
                }}
              >
                <CardMedia
                  component="img"
                  sx={
                    {
                      // 16:9
                      // pt: "138.8889%", // 0.72:1 aspect ratio
                    }
                  }
                  image="https://res.cloudinary.com/dopt1ye9c/image/upload/v1687353498/WhatsApp_Image_2023-06-21_at_11.20.20_AM_ckv4qy.jpg"
                  title="Cotton Jaipur"
                />

                <CardContent
                  sx={{
                    flexGrow: 1,
                    color: "white",
                    display: "flex",
                    flexDirection: "row",
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    justifyContent: "flex-end",
                  }}
                >
                  <Typography>
                    <p
                      style={{
                        fontFamily: "Open Sans",
                        fontSize: "16px",
                        backgroundColor: "rgba(0,0,0,0.5)",
                        padding: "0px 10px",
                      }}
                    >
                      Brand Name
                    </p>
                  </Typography>
                </CardContent>
              </Card>
            </div>
          </div>
          <div>
            <div style={{ padding: "10px" }}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  position: "relative",
                }}
              >
                <CardMedia
                  component="img"
                  sx={
                    {
                      // 16:9
                      // pt: "138.8889%", // 0.72:1 aspect ratio
                    }
                  }
                  image="https://res.cloudinary.com/dopt1ye9c/image/upload/v1687353498/WhatsApp_Image_2023-06-21_at_11.20.20_AM_ckv4qy.jpg"
                  title="Cotton Jaipur"
                />

                <CardContent
                  sx={{
                    flexGrow: 1,
                    color: "white",
                    display: "flex",
                    flexDirection: "row",
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    justifyContent: "flex-end",
                  }}
                >
                  <Typography>
                    <p
                      style={{
                        fontFamily: "Open Sans",
                        fontSize: "16px",
                        backgroundColor: "rgba(0,0,0,0.5)",
                        padding: "0px 10px",
                      }}
                    >
                      Brand Name
                    </p>
                  </Typography>
                </CardContent>
              </Card>
            </div>
          </div>
          <div>
            <div style={{ padding: "10px" }}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  position: "relative",
                }}
              >
                <CardMedia
                  component="img"
                  sx={
                    {
                      // 16:9
                      // pt: "138.8889%", // 0.72:1 aspect ratio
                    }
                  }
                  image="https://res.cloudinary.com/dopt1ye9c/image/upload/v1687353498/WhatsApp_Image_2023-06-21_at_11.20.20_AM_ckv4qy.jpg"
                  title="Cotton Jaipur"
                />

                <CardContent
                  sx={{
                    flexGrow: 1,
                    color: "white",
                    display: "flex",
                    flexDirection: "row",
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    justifyContent: "flex-end",
                  }}
                >
                  <Typography>
                    <p
                      style={{
                        fontFamily: "Open Sans",
                        fontSize: "16px",
                        backgroundColor: "rgba(0,0,0,0.5)",
                        padding: "0px 10px",
                      }}
                    >
                      Brand Name
                    </p>
                  </Typography>
                </CardContent>
              </Card>
            </div>
          </div>
          <div>
            <div style={{ padding: "10px" }}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  position: "relative",
                }}
              >
                <CardMedia
                  component="img"
                  sx={
                    {
                      // 16:9
                      // pt: "138.8889%", // 0.72:1 aspect ratio
                    }
                  }
                  image="https://res.cloudinary.com/dopt1ye9c/image/upload/v1687353498/WhatsApp_Image_2023-06-21_at_11.20.20_AM_ckv4qy.jpg"
                  title="Cotton Jaipur"
                />

                <CardContent
                  sx={{
                    flexGrow: 1,
                    color: "white",
                    display: "flex",
                    flexDirection: "row",
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    justifyContent: "flex-end",
                  }}
                >
                  <Typography>
                    <p
                      style={{
                        fontFamily: "Open Sans",
                        fontSize: "16px",
                        backgroundColor: "rgba(0,0,0,0.5)",
                        padding: "0px 10px",
                      }}
                    >
                      Brand Name
                    </p>
                  </Typography>
                </CardContent>
              </Card>
            </div>
          </div>
        </Slider>
      </div>
    </div>
  );
}
