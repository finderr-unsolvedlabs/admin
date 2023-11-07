import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { IStoreModel } from "@/services/interfaces/common";

interface IProps {
  stores: IStoreModel[];
}

export default function StoresList({ stores }: IProps) {
  return (
    <List sx={{ width: "100%", bgcolor: "background.paper" }}>
      {stores.map((store, index) => (
        <Link
          href={`/stores/${store.slug}`}
          style={{ textDecoration: "none" }}
          key={index}
        >
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar
                alt="Finderr"
                src={
                  store.images[0]?.url ||
                  `https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80`
                }
              />
            </ListItemAvatar>
            <ListItemText
              primary={store.name}
              secondary={
                <Typography
                  sx={{
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    color: "#757575",
                    fontSize: "14px",
                    fontFamily: "Open Sans",
                  }}
                >
                  {store.address.address}
                </Typography>
              }
            />
          </ListItem>
          <Divider variant="inset" component="li" />
        </Link>
      ))}
    </List>
  );
}
