import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";

const Transition = React.forwardRef(function Transition(props, ref) {
  // @ts-ignore
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function SortByPop({ open, handleClose }: any) {
  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition as any}
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
            This functionality is coming soon
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
}
