import { SidebarLayout } from "@/components/Layout/SidebarLayout";
import { AdminSidebar } from "@/components/Sidebar/AdminSidebar";
import { BrandSelector } from "@/components/selectors/BrandSelector";
import { OffersApi } from "@/services/api/offers";
import { TOption } from "@/services/interfaces/common";
import { ICreateOfferForm } from "@/services/interfaces/forms";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import moment from "moment";
import { dateInputFormat, dateUpdateFormat } from "@/utils/constants/common";

const edit = () => {
  return (
    <SidebarLayout
      MainComponent={<Main />}
      SidebarComponent={<AdminSidebar />}
    />
  );
};

interface IForm extends ICreateOfferForm {
  brand?: TOption;
}

export const emptyFormData: IForm = {
  title: "",
  imageKey: "",
  expiry_date: "",
  action: {
    label: "",
    url: "",
  },
};

const Main = () => {
  const router = useRouter();
  const offer_id = router.query.id as string;
  const [formData, setFormData] = useState<IForm>(emptyFormData);

  useEffect(() => {
    if (offer_id) {
      OffersApi.list(1)
        .then(({ data }) => {
          const final_data = data.data.filter(
            (offer) => offer._id === offer_id
          );
          const offerData = final_data[0];
          const form_data: IForm = {
            title: offerData.title,
            imageKey: offerData.image.slug,
            expiry_date: offerData.expiry_date,
            action: offerData.action,
            description: offerData.description ?? undefined,
            brand: {
              label: offerData.brand?.name ?? "",
              value: offerData.brand?._id ?? "",
            },
            brand_id: offerData.brand?._id ?? undefined,
          };
          if (offerData.brand == null) {
            form_data.brand = undefined;
          }
          setFormData(form_data);
        })
        .catch((error) => {
          alert("Something went wrong!");
          console.error(error);
        });
    }
  }, [offer_id]);

  const formik = useFormik({
    initialValues: formData,
    enableReinitialize: true,
    onSubmit: (data) => {
      data.expiry_date = moment(data.expiry_date).format(dateUpdateFormat);
      OffersApi.updateOffer(offer_id, data)
        .then(({ data }) => {
          alert(data);
          router.push("/admin/offers");
        })
        .catch((error) => {
          alert("Something went wrong!");
          console.error(error);
        });
    },
  });

  return (
    <div className="flex flex-col gap-2 p-4 w-full h-full">
      <h1 className="text-2xl font-semibold">Edit Offer</h1>
      <form onSubmit={formik.handleSubmit}>
        <div className="flex justify-center gap-2">
          <div className="mt-5 w-full">
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Title*
            </label>
            <input
              id="title"
              type="text"
              value={formik.values.title}
              onChange={formik.handleChange}
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Title"
              required
            />
          </div>
          <div className="mt-5 w-1/3">
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Expiry Date*
            </label>
            <input
              id="expiry_date"
              type="date"
              value={moment(formik.values.expiry_date).format(dateInputFormat)}
              onChange={formik.handleChange}
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Select date"
              required
            />
          </div>
        </div>
        <div className="flex justify-center gap-2">
          <div className="mt-5 w-full">
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Url Label*
            </label>
            <input
              id="action.label"
              value={formik.values?.action?.label}
              type="text"
              onChange={formik.handleChange}
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Link Label"
              required
            />
          </div>
          <div className="mt-5 w-full">
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Url*
            </label>
            <input
              id="action.url"
              type="text"
              value={formik.values?.action?.url}
              onChange={formik.handleChange}
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Url"
              required
            />
          </div>
        </div>
        <div className="flex justify-center gap-2">
          <div className="mt-5 w-full">
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Image S3 Key*
            </label>
            <input
              id="imageKey"
              type="text"
              value={formik.values.imageKey}
              onChange={formik.handleChange}
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="image s3 key"
              required
            />
          </div>
          {/* <div className="mt-5 w-full">
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Logo S3 Key
            </label>
            <input
              id="logo_s3_key"
              type="text"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="logo s3 key (optional)"
            />
          </div> */}
          <div className="mt-5 w-full">
            <BrandSelector
              value={formik.values.brand || null}
              onchange={(option) => {
                const _option = option as TOption;
                formik.setFieldValue("brand_id", _option?.value);
                formik.setFieldValue("brand", _option);
              }}
            />
          </div>
        </div>
        <div className="mt-5">
          <label className="block mb-2 text-sm font-medium text-gray-900">
            Description
          </label>
          <textarea
            id="description"
            rows={4}
            value={formik.values.description}
            onChange={formik.handleChange}
            placeholder="Description (optional)"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          />
        </div>
        <div className="flex justify-center mt-5">
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default edit;
