import { Dialog, DialogContent, Slide, TextField } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { v4 } from "uuid";
import {
  object as yupObject,
  string as yupString,
  number as yupNumber,
} from "yup";

import CloseIcon from "@mui/icons-material/Close";
import React, { useState } from "react";
import { useFormik } from "formik";
import Cookies from "js-cookie";
import { CUSTOMER_LEAD } from "@/utils/constants/cookiesName";
import { sendRequest } from "@/services/api";

type Props = {
  isVisible: boolean;
  handleClose: () => void;
  productSlug: string;
};

interface ILeadForm {
  name?: string;
  mobile?: number;
  uuid: string;
  productSlug: string;
}

export const PopUpTransition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function BuyOnlinePopUp({ isVisible, handleClose, productSlug }: Props) {
  const customerLeadCookie = Cookies.get(CUSTOMER_LEAD);
  const customerLead = customerLeadCookie
    ? (JSON.parse(customerLeadCookie) as ILeadForm)
    : null;
  const initialValue: ILeadForm = customerLead || {
    productSlug: productSlug,
    uuid: v4(),
  };

  const [showThankyou, setShowThankyou] = useState(
    customerLeadCookie ? true : false
  );

  const FormSchema = yupObject({
    name: yupString()
      .min(3, "Must be 3 characters or more")
      .required("Required"),
    mobile: yupNumber()
      .min(1000000000, "Must be a valid 10 digits number")
      .max(9999999999, "Must be a valid 10 digits number")
      .required("Required"),
  });

  let closeModalTimeout: any;

  const formik = useFormik({
    initialValues: initialValue,
    validationSchema: FormSchema,
    onSubmit: (lead) => {
      sendRequest(`/website/create-product-lead`, {
        method: "post",
        data: lead,
      })
        .then((response) => {
          Cookies.set(CUSTOMER_LEAD, JSON.stringify(formik.values));
          setShowThankyou(true);
          closeModalTimeout = setTimeout(() => {
            setShowThankyou(false);
            handleClose();
          }, 7000);
        })
        .catch((error) => {
          // TODO: handle error
          handleClose();
          console.error(error);
          alert("Something went wrong");
        });
    },
  });

  return (
    <Dialog
      open={isVisible}
      TransitionComponent={PopUpTransition as any}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogContent className="w-[300px] md:w-[500px]">
        <div className="flex justify-between mb-2 lg:mb-4">
          <span className="font-semibold text-xl">
            {showThankyou ? "Thank you" : ""}
          </span>
          <CloseIcon className="cursor-pointer" onClick={handleClose} />
        </div>
        {showThankyou ? (
          <div>
            <div>
              <p className="text-lg mb-3 lg:mb-5">
                Brand executive will contact you shortly on:
                <span>{formik.values.mobile}</span>
              </p>
              <p
                className="text-brand font-semibold cursor-pointer"
                onClick={() => {
                  clearTimeout(closeModalTimeout);
                  setShowThankyou(false);
                }}
              >
                Edit Mobile Number
              </p>
            </div>
          </div>
        ) : (
          <div className="content flex flex-col gap-4 lg:gap-6">
            <TextField
              id="name"
              label="Full Name"
              size="small"
              variant="outlined"
              fullWidth
              error={formik.touched.name && Boolean(formik.errors.name)}
              inputProps={{ className: "text-base px-4 py-3" }}
              value={formik.values.name}
              onChange={formik.handleChange}
            />
            <TextField
              id="mobile"
              label="Mobile Number"
              variant="outlined"
              inputProps={{ className: "text-base px-4 py-3" }}
              fullWidth
              error={formik.touched.mobile && Boolean(formik.errors.mobile)}
              value={formik.values.mobile}
              onChange={formik.handleChange}
            />

            <button
              className="bg-brand text-white font-semibold p-2 rounded-md text-lg"
              onClick={() => formik.handleSubmit()}
            >
              Proceed
            </button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

export { BuyOnlinePopUp };
