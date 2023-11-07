import { Dialog, DialogContent, Slide, TextField } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import CloseIcon from "@mui/icons-material/Close";
import React, { useState } from "react";
import Cookies from "js-cookie";
import { USER_TOKEN } from "@/utils/constants/cookiesName";
import PhoneInput, { parsePhoneNumber } from "react-phone-number-input";
import { useDispatch } from "react-redux";
import { setUserLoggedIn, setUserLoggingIn } from "@/store/userSlice";
import { UserApi } from "@/services/api/user";
import Image from "next/image";

type Props = {};

interface ILoginForm {
  mobile?: string;
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function LogInPopUp({}: Props) {
  const dispatch = useDispatch();

  const [askOtp, setAskOtp] = useState(false);
  const [otp, setOtp] = useState<number | null>(null);
  const [mobNumber, setMobNumber] = useState<string>();

  const onClose = () => {
    dispatch(setUserLoggingIn(false));
  };

  const onSubmitSignIn = (userData: ILoginForm) => {
    const mobileObject = parsePhoneNumber(userData.mobile || "");
    UserApi.signIn({
      countryCode: mobileObject?.countryCallingCode || "",
      mobile: mobileObject?.nationalNumber || "",
    })
      .then((response) => {
        setAskOtp(true);
      })
      .catch((error) => {
        // TODO: handle error
        onClose();
        console.error(error);
        alert("Something went wrong");
      });
  };

  return (
    <Dialog
      open={true}
      TransitionComponent={Transition as any}
      keepMounted
      onClose={onClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogContent className="w-[300px] md:w-[500px]">
        <div className="flex justify-between mb-4">
          <span className="font-semibold text-lg">User Login</span>
          <CloseIcon className="cursor-pointer" onClick={onClose} />
        </div>

        <div className="mb-4 flex justify-center">
          <Image width={50} height={50} src="/smartphone.png" alt="phone" />
        </div>

        {askOtp ? (
          <div className="content flex flex-col gap-4 lg:gap-6">
            <TextField
              id="otp"
              label="OTP*"
              type="number"
              variant="outlined"
              inputProps={{ className: "text-base px-4 py-3" }}
              fullWidth
              value={otp}
              onChange={(event) => {
                setOtp(parseInt(event.target.value));
              }}
            />

            <button
              className="bg-brand text-white font-semibold p-2 text-lg"
              onClick={() => {
                if (otp) {
                  const number = parsePhoneNumber(
                    mobNumber || ""
                  )?.nationalNumber;
                  UserApi.verifyOtp({
                    otp: otp,
                    mobile: number as string,
                  })
                    .then((res) => {
                      Cookies.set(USER_TOKEN, res.data.token);
                      dispatch(setUserLoggedIn(true));
                      dispatch(setUserLoggingIn(false));
                    })
                    .catch(() => {
                      alert("Invalid OTP");
                      setOtp(null);
                    });
                } else {
                  alert("Please fill the OTP");
                }
              }}
            >
              Submit
            </button>
          </div>
        ) : (
          <div className="content flex flex-col gap-4 lg:gap-6">
            <PhoneInput
              placeholder="Enter phone number"
              value={mobNumber}
              defaultCountry="IN"
              onChange={(mob) => {
                console.log(mob);
                setMobNumber(mob);
              }}
            />

            {/* <TextField
              id="mobile"
              label="Mobile Number*"
              variant="outlined"
              inputProps={{ className: "text-base px-4 py-3" }}
              fullWidth
              error={formik.touched.mobile && Boolean(formik.errors.mobile)}
              value={formik.values.mobile}
              onChange={formik.handleChange}
            /> */}

            <button
              className="bg-brand text-white font-semibold p-2 rounded-md text-lg"
              onClick={() => onSubmitSignIn({ mobile: mobNumber })}
            >
              {`Verify`}
            </button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

export { LogInPopUp };
