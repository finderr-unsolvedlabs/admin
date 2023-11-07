import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Slide from "@mui/material/Slide";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Link from "next/link";
import { IStoreModel } from "@/services/interfaces/common";
import { forwardRef } from "react";

interface IProp {
  open: boolean;
  handleClose: () => void;
  stores: IStoreModel[];
  brandName: string;
}

const Transition = forwardRef(function Transition(props, ref) {
  // @ts-ignore
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function StorePopUp({
  open,
  handleClose,
  stores,
  brandName,
}: IProp) {
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
          <div
            id="alert-dialog-slide-description"
            style={{ fontFamily: "Open Sans", color: "black" }}
          >
            <Link
              href={`/stores/${stores[0].slug}`}
              // tofix
              style={{ textDecoration: "none" }}
            >
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar
                    alt="Remy Sharp"
                    src={
                      stores[0].images[0]?.url ||
                      `https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80`
                    }
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={brandName}
                  secondary={
                    <>
                      <Typography
                        sx={{ display: "inline" }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      ></Typography>
                      {stores[0].address.address}
                    </>
                  }
                />
              </ListItem>
            </Link>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
