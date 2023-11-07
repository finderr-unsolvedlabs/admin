import { setUserLoggedIn, updateProductLeadRequest } from "@/store/userSlice";
import { USER_TOKEN } from "@/utils/constants/cookiesName";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { IStore } from "@/services/interfaces/redux";
import CloseIcon from "@mui/icons-material/Close";
import { LogInPopUp } from "../LoginPopUp";
import { UserApi } from "@/services/api/user";
import { Dialog, DialogContent } from "@mui/material";
import { PopUpTransition } from "../BuyOnlinePopUp";

interface Props {
  children: React.ReactNode;
}

const RootWrapper: React.FC<Props> = ({ children }) => {
  const dispatch = useDispatch();

  const user = useSelector((store: IStore) => store.user);
  const app = useSelector((store: IStore) => store.app);
  const [showThankyou, setShowThankyou] = useState(false);

  useEffect(() => {
    // redux updates
    const token = Cookies.get(USER_TOKEN);
    if (token) {
      dispatch(setUserLoggedIn(true));
    }
  }, []);

  useEffect(() => {
    const scrollPosition = window.scrollY;
    if (app.blockBodyScroll) {
      // document.body.style.overflowY = "hidden";
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollPosition}px`;
      document.body.style.width = "100%";
    } else {
      // document.body.style.overflowY = "scroll";
      document.body.style.removeProperty("overflow");
      document.body.style.removeProperty("position");
      document.body.style.removeProperty("top");
      document.body.style.removeProperty("width");
      window.scrollTo(0, scrollPosition);
    }
  }, [app.blockBodyScroll]);

  useEffect(() => {
    if (user.productLeadRequested && user.userLoggedIn) {
      UserApi.createProductLead(user.productLeadRequested.productSlug)
        .then(() => {
          setShowThankyou(true);
        })
        .finally(() => {
          dispatch(updateProductLeadRequest(null));
        });
    }
  }, [user.userLoggedIn, user.productLeadRequested]);

  return (
    <>
      {showThankyou ? (
        <Dialog
          open={showThankyou}
          TransitionComponent={PopUpTransition}
          keepMounted
          onClose={() => setShowThankyou(false)}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogContent className="w-[300px] md:w-[500px]">
            <div className="flex justify-between mb-2 lg:mb-4">
              <span className="font-semibold text-xl">
                {showThankyou ? "Thank you" : ""}
              </span>
              <CloseIcon
                className="cursor-pointer"
                onClick={() => {
                  setShowThankyou(false);
                }}
              />
            </div>

            <div>
              <div>
                <p className="text-lg mb-3 lg:mb-5">
                  Brand executive will contact you shortly
                  {/* <span>{user.mobile}</span> */}
                </p>
                {/* <p
                  className="text-brand font-semibold cursor-pointer"
                  onClick={() => {
                    clearTimeout(closeModalTimeout);
                    setShowThankyou(false);
                  }}
                >
                  Edit Mobile Number
                </p> */}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      ) : (
        <></>
      )}
      {user.userLoggingIn && <LogInPopUp />}
      {children}
    </>
  );
};

export { RootWrapper };
