import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Slide from "@mui/material/Slide";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";

const Transition = React.forwardRef(function Transition(props, ref) {
  // @ts-ignore
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function LocationPop({ open, handleClose }: any) {
  return (
    <div>
      <Dialog
        open={open}
        // @ts-ignore
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogContent>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
            ></Typography>
            <CloseIcon onClick={handleClose} />
          </div>
          <DialogContentText
            id="alert-dialog-slide-description"
            style={{
              fontFamily: "Open Sans",
              color: "black",
              textAlign: "center",
            }}
          >
            We are available only in Jaipur at the moment
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
}
