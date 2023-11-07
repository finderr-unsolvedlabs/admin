import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import NotificationsIcon from "@mui/icons-material/Notifications";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import PersonIcon from "@mui/icons-material/Person";
import Drawer from "@mui/material/Drawer";
import NotificationsPage from "@components/Notifications";
import LocationPop from "./LocationPop";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SearchIcon from "@mui/icons-material/Search";
import { useRouter } from "next/router";
import ReactGA from "react-ga4";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { IStore } from "@/services/interfaces/redux";
import { setUserLoggingIn } from "@/store/userSlice";
import Image from "next/image";

export default function Navbar() {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((store: IStore) => store.user);

  const [locationPop, setLocationPop] = React.useState(false);
  const [state, setState] = React.useState<any>({
    right: false,
  });

  const toggleDrawer = (anchor: any, open: any) => (event: any) => {
    ReactGA.event({
      category: "User",
      action: "Clicked on Notification Icon",
    });

    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const openLocationPopUp = () => {
    ReactGA.event({
      category: "User",
      action: "Clicked on Location Icon",
    });
    setLocationPop(true);
  };

  const list = (anchor: any) => (
    <Box
      role="presentation"
      style={{ display: "flex", flexDirection: "column", height: "100%" }}
    >
      <NotificationsPage closeDrawer={toggleDrawer(anchor, false)} />
    </Box>
  );
  return (
    <>
      {/* <AppBar
        position="static"
        style={{ backgroundColor: "#fff", boxShadow: "none" }}
      >
        <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
          {router.asPath === "/" ? (
            <IconButton
              size="small"
              aria-label="Location"
              sx={{ color: "black" }}
              onClick={openLocationPopUp}
            >
              <LocationOnIcon />
              <p className="ml-1 text-base">Jaipur</p>
            </IconButton>
          ) : (
            <IconButton
              size="small"
              aria-label="Back"
              sx={{ color: "black", marginRight: "50px" }}
              onClick={() => router.back()}
            >
              <ArrowBackIcon />
            </IconButton>
          )}

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Link href="/" style={{ textDecoration: "none" }}>
              <Typography
                variant="h5"
                marginLeft={-3}
                component="div"
                sx={{
                  display: { sm: "flex" },
                  color: "#4169E0",
                  fontWeight: "bold",
                }}
              >
                Finderr
              </Typography>
            </Link>
          </div>
          <div>
            <IconButton size="small" sx={{ color: "black" }}>
              {user.userLoggedIn ? (
                <></>
              ) : (
                // <a
                //   href="https://api.whatsapp.com/send?phone=916377512481&text=Hi, I need some help with Finderr"
                //   target="_blank"
                //   rel="noreferrer"
                // >
                //   <WhatsAppIcon />
                // </a>
                <div
                  onClick={() => {
                    dispatch(setUserLoggingIn(true));
                  }}
                >
                  <PersonIcon />
                </div>
              )}
            </IconButton>

            <Link href={"/search?filter_bar_state=categories"}>
              <SearchIcon sx={{ color: "black" }} />
            </Link>

            <>
              <IconButton
                size="small"
                aria-label="show 17 new notifications"
                onClick={toggleDrawer("right", true)}
                sx={{ color: "black", paddingLeft: "10" }}
              >
                <NotificationsIcon />
              </IconButton>

              <Drawer
                anchor="right"
                open={state["right"]}
                onClose={toggleDrawer("right", false)}
              >
                {list("right")}
              </Drawer>
            </>
          </div>
        </Toolbar>
      </AppBar> */}

      <div className="w-full h-12 py-1 flex items-center mb-5">
        <div className="flex-1">
          <Image
            src="/icons/hamburger.svg"
            alt="hamburger icon"
            width={20}
            height={20}
          />
        </div>
        <div className="text-brand flex flex-col items-center">
          <div className="text-[25px] leading-[27px] font-bold">Finderr</div>
          <div className="text-sm leading-none font-normal tracking-[5px]">
            JAIPUR
          </div>
        </div>
        <div className="flex-1 flex justify-end">
          {/* <IconButton
            size="small"
            onClick={toggleDrawer("right", true)}
            sx={{ color: "#120F1D" }}
          > */}
          <div>
            <NotificationsIcon />
          </div>
          {/* </IconButton> */}
        </div>
      </div>
      <LocationPop
        open={locationPop}
        handleClose={() => setLocationPop(false)}
      />
    </>
  );
}
