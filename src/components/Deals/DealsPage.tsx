import React, { useState, useRef, useEffect } from "react";

import CloseIcon from "@mui/icons-material/Close";

import Card from "@mui/material/Card";

import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";

import Grid from "@mui/material/Grid";

import Typography from "@mui/material/Typography";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import Link from "next/link";

const cards = [1, 2, 3, 4, 5, 6, 7, 8];

const theme = createTheme();

export default function DealsPage() {
  return (
    <ThemeProvider theme={theme}>
      <div>
        <div className="mx-auto px-4">
          <div className="mt-6 flex-row justify-between">
            <div className=" flex justify-between">
              <p className="font-bold text-lg md:text-2xl">Deals</p>
              <Link href="/" style={{ textDecoration: "none" }}>
                <CloseIcon />
              </Link>
            </div>
          </div>
        </div>
      </div>
      <main>
        <div
          style={{
            margin: "0px",
            display: "flex",
            justifyContent: "center",
            padding: "20px",
          }}
        >
          {/* End hero unit */}
          <Grid container spacing={2}>
            {cards.map((card) => (
              <Grid item key={card} xs={12} sm={4} md={4}>
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
              </Grid>
            ))}
          </Grid>
        </div>
      </main>
    </ThemeProvider>
  );
}

const selectedStyle = {
  border: "1px solid #4169E0",
  color: "white",
  backgroundColor: "#4169E0",
  borderRadius: "5px",
};
