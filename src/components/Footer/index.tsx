import React from "react";
import { Container, Typography } from "@mui/material";

export default function Footer() {
  return (
    <footer className="w-full bg-white">
      <hr className="my-4" />
      <Container
        style={{
          display: "flex",
          justifyContent: "center", // Center the content horizontally
          alignItems: "center", // Center the content vertically
          maxWidth: "6xl",
          margin: "0 auto",
          padding: "4px",
          paddingBottom: "20px",
          fontWeight: "bold",
        }}
        maxWidth="xl"
      >
        <div>
          <Typography
            style={{
              marginLeft: "4px",
              fontSize: "1.125rem", // Equivalent to text-lg in Tailwind CSS
              fontWeight: "bold",
              color: "#4169E0", // Equivalent to text-blue-600 in Tailwind CSS
              width: "100%",
              textAlign: "center",
            }}
            variant="h5"
          >
            <p style={{ fontWeight: "bold" }}>Finderr</p>
          </Typography>
        </div>
        <div className="mt-4 md:mt-0">{/* Additional content goes here */}</div>
      </Container>
    </footer>
  );
}
