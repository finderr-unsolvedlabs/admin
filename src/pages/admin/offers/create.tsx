import { SidebarLayout } from "@/components/Layout/SidebarLayout";
import { AdminSidebar } from "@/components/Sidebar/AdminSidebar";
import { BrandSelector } from "@/components/selectors/BrandSelector";
import { OffersApi } from "@/services/api/offers";
import { TOption } from "@/services/interfaces/common";
import { ICreateOfferForm } from "@/services/interfaces/forms";
import { useRouter } from "next/router";
import React, { useState } from "react";

const create = () => {
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

  const [formData, setFormData] = useState<IForm>(emptyFormData);

  const submitHandler = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    const dateParts = formData.expiry_date.split("-");
    const expiry_date_formatted = `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`;
    formData.expiry_date = expiry_date_formatted;

    OffersApi.createOffer(formData)
      .then(({ data }) => {
        alert("Offer Added Successfully");
        router.push("/admin/offers");
      })
      .catch((error) => {
        alert("Something went wrong!");
        console.error(error);
      });
  };

  return (
    <div className="flex flex-col gap-2 p-4 w-full h-full">
      <h1 className="text-2xl font-semibold">Add New Offer</h1>
      <form onSubmit={submitHandler}>
        <div className="flex justify-center gap-2">
          <div className="mt-5 w-full">
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Title*
            </label>
            <input
              id="e_title"
              type="text"
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
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
              onChange={(e) =>
                setFormData({ ...formData, expiry_date: e.target.value })
              }
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
              id="url_label"
              type="text"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  action: { label: e.target.value, url: formData.action.url },
                })
              }
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
              id="url"
              type="text"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  action: { url: e.target.value, label: formData.action.label },
                })
              }
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
              id="image_s3_key"
              type="text"
              onChange={(e) =>
                setFormData({ ...formData, imageKey: e.target.value })
              }
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
              value={formData.brand || null}
              onchange={(option) => {
                const _option = option as TOption;
                setFormData({
                  ...formData,
                  brand_id: _option?.value,
                  brand: _option,
                });
              }}
            />
          </div>
        </div>
        <div className="mt-5">
          <label className="block mb-2 text-sm font-medium text-gray-900">
            Description
          </label>
          <textarea
            id="desc"
            rows={4}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            placeholder="Description (optional)"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          />
        </div>
        <div className="flex justify-center mt-5">
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default create;
