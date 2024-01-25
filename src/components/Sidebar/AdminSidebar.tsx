"use client";
import * as React from "react";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import Link from "next/link";
import { startCase } from "lodash";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import HomeIcon from "@mui/icons-material/Home";
import InventoryIcon from "@mui/icons-material/Inventory";
import CheckroomIcon from "@mui/icons-material/Checkroom";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import MuiDrawer from "@mui/material/Drawer";
import { CSSObject, Theme, styled } from "@mui/material";

type Props = {};

const routes = [
  { name: "home", path: "/admin", icon: <HomeIcon /> },
  { name: "brands", path: "/admin/brands", icon: <InventoryIcon /> },
  { name: "products", path: "/admin/products", icon: <CheckroomIcon /> },
  { name: "tagging", path: "/admin/taggings", icon: <LocalOfferIcon /> },
  { name: "users", path: "/admin/users", icon: <PeopleAltIcon /> },
];

const openedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  width: "24rem",
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  width: "4rem",
});

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const AdminSidebar = (props: Props) => {
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Drawer
        className={
          "m-0 p-0 bg-white " + (open ? " w-96 overflow-x-hidden " : " w-16")
        }
        variant="permanent"
        open={open}
      >
        <div
          className={
            "flex items-center p-2 " +
            (open ? "justify-end w-96" : "justify-center")
          }
        >
          {!open ? (
            <IconButton className="" onClick={handleDrawerOpen}>
              <MenuIcon className="text-black" />
            </IconButton>
          ) : (
            <IconButton onClick={handleDrawerClose}>
              <ChevronLeftIcon className="text-black" />
            </IconButton>
          )}
        </div>
        <div className={"flex flex-col gap-4 " + (open ? "" : "")}>
          <div>
            <img
              className={"w-10 h-10 mx-auto my-14 " + (open ? "hidden" : "")}
              src={"../../../favicon.ico"}
              alt="logo"
            />
          </div>
          <div className={"mx-auto " + (open ? "" : "hidden")}>
            <img
              className="w-28 h-28"
              src="https://static.wixstatic.com/media/ca9765_2c70045cb38b4f2fb375c76a01e312ce~mv2.png/v1/fill/w_177,h_177,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/Finderr%20(15).png"
              alt="logo"
            />
          </div>
          {routes.map((route) => {
            return (
              <div key={route.name}>
                <Link href={route.path}>
                  <div
                    className={
                      "flex items-center justify-center gap-2 text-slate-800 text-lg font-medium mx-2 p-2  "
                    }
                  >
                    <div className={" text-black "}>{route.icon}</div>
                    <div
                      className={"w-full border-b-2 " + (open ? "" : "hidden")}
                    >
                      {startCase(route.name)}
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </Drawer>
    </div>
  );
};

export { AdminSidebar };
