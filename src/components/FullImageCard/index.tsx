import React from "react";
import { styled } from "@mui/system";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";

const FiCard = styled(Card)(({ theme }) => ({
  position: "relative",
}));

const FiCardActionArea = styled(CardActionArea)(({ theme }) => ({}));

const FiCardActions = styled(CardActions)(({ theme }) => ({}));

const FiCardContent = styled(CardContent)(({ theme }) => ({}));

const FiCardMedia = styled(CardMedia)(({ theme }) => ({
  color: "#ffffff",
  backgroundColor: "rgba(0,0,0,0.4)",
  paddingTop: "138.8889%", // 0.72:1 aspect ratio
  backgroundBlendMode: "darken",
  transition: "all 0.5s ease",
  "&:hover": {
    transform: "scale(1.1)",
  },
}));

export { FiCard, FiCardActionArea, FiCardActions, FiCardContent, FiCardMedia };
