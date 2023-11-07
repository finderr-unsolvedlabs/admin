import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import ProductImageCarousel from "./ProductImageCarousel";
import { useMediaQuery } from "@mui/material";
import LaptopProductCarousel from "./LaptopProductCarousel";
import CloseIcon from "@mui/icons-material/Close";
import BackIcon from "@mui/icons-material/ArrowBack";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

interface IProps {
  open: boolean;
  handleClose: () => void;
  images: string[];
  productName: string;
}

export default function ImageModal({
  open,
  handleClose,
  images,
  productName,
}: IProps) {
  const matches = useMediaQuery("(min-width:600px)");
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        // height={matches ? '50%' : '100%'}
      >
        {matches ? (
          <Box sx={style}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                {productName}
              </Typography>
              <CloseIcon onClick={handleClose} />
            </div>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <LaptopProductCarousel images={images} />
            </Typography>
          </Box>
        ) : (
          <div
            style={{
              height: "100%",
              backgroundColor: "white",
              padding: "10px",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <BackIcon onClick={handleClose} />
            </div>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <ProductImageCarousel images={images} />
            </Typography>
          </div>
        )}
      </Modal>
    </div>
  );
}
