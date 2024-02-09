import { SidebarLayout } from "@/components/Layout/SidebarLayout";
import { SidebarsMainLoader } from "@/components/Loaders/SidebarsMainLoader";
import { AdminSidebar } from "@/components/Sidebar/AdminSidebar";
import { BrandApi } from "@/services/api/brand";
import { IBrandModel } from "@/services/interfaces/common";
import { IBrandUpdateForm } from "@/services/interfaces/forms";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";

const Edit = () => {
  const router = useRouter();
  const brand_id = router.query.id as string;
  const [brandData, setBrandData] = useState<IBrandModel>();
  useEffect(() => {
    if (brand_id) {
      BrandApi.getBrand(brand_id).then(({ data }) => {
        setBrandData(data);
      });
    }
  }, [brand_id]);

  return (
    <SidebarLayout
      MainComponent={
        brandData ? <Main brandData={brandData} /> : <SidebarsMainLoader />
      }
      SidebarComponent={<AdminSidebar />}
    />
  );
};

type Props = {
  brandData: IBrandModel;
};

const Main = ({ brandData }: Props) => {
  const router = useRouter();

  const convertedData: IBrandUpdateForm = {
    name: brandData.name,
    description: brandData.description,
    rating: brandData.rating,
    state: brandData.state,
    logo_key: brandData.logo.slug,
    profile_pic_key: brandData?.profile_pic?.slug ?? undefined,
    contact: brandData.contact,
    cover_images_keys: brandData.cover_images.map((image) => image.slug),
    social_links: brandData.social_links,
  };

  const [coverImages, setCoverImages] = useState<string>(
    convertedData.cover_images_keys.join(",")
  );

  const formik = useFormik({
    initialValues: convertedData,
    onSubmit: (formData) => {
      const coverImagesArr = coverImages.split(",");

      formData.cover_images_keys = coverImagesArr;

      if (formData.social_links?.instagram == "") {
        formData.social_links.instagram = undefined;
      }

      if (formData.profile_pic_key == "") {
        formData.profile_pic_key = undefined;
      }

      if (formData === convertedData) {
        alert("No changes made");
        return;
      }

      BrandApi.editBrand(brandData._id, formData)
        .then(({ data }) => {
          alert("Brand Updated Successfully");
          router.push("/admin/brands");
        })
        .catch((error) => {
          alert("Something went wrong!");
          console.error(error);
        });
    },
  });

  const toggleState = () => {
    if (formik.values.state === "active") {
      convertedData.state = "inactive";
      BrandApi.deactivate(brandData._id)
        .then(({ data }) => {
          formik.setFieldValue("state", "inactive");
          alert(data);
        })
        .catch((error) => {
          alert("Something went wrong!");
          convertedData.state = "active";
          console.error(error);
        });
    } else {
      convertedData.state = "active";
      BrandApi.activate(brandData._id)
        .then(({ data }) => {
          formik.setFieldValue("state", "active");
          alert(data);
        })
        .catch((error) => {
          alert("Something went wrong!");
          convertedData.state = "inactive";
          console.error(error);
        });
    }
  };

  return (
    <div className="flex flex-col gap-2 p-4 w-full h-full">
      <h1 className="text-2xl font-semibold">Edit Brand Details</h1>
      <form onSubmit={formik.handleSubmit}>
        <div className="flex items-center justify-center gap-2">
          <div className="mt-5 w-full">
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Brand Name*
            </label>
            <input
              id="name"
              type="text"
              value={formik.values.name}
              onChange={formik.handleChange}
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Brand name"
              required
            />
          </div>
          <div className="mt-5 w-full">
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Contact Number
            </label>
            <input
              id="contact.phone"
              type="text"
              value={formik.values.contact?.phone ?? ""}
              onChange={formik.handleChange}
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Phone number"
            />
          </div>
          <div className="mt-5 w-4/12">
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Current State: {formik.values.state}
            </label>
            <div
              onClick={toggleState}
              className={
                "text-white cursor-pointer focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center " +
                (formik.values.state === "active"
                  ? " bg-red-600 hover:bg-red-700"
                  : "bg-green-600 hover:bg-green-700")
              }
            >
              {formik.values.state === "active" ? "Deactivate" : "Activate"}
            </div>
          </div>
        </div>
        <div className="flex justify-center gap-2">
          <div className="mt-5 w-full">
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Logo Key*
            </label>
            <input
              id="logo_key"
              type="text"
              value={formik.values.logo_key}
              onChange={formik.handleChange}
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Logo s3 key"
              required
            />
          </div>
          <div className="mt-5 w-full">
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Profile Picture Key
            </label>
            <input
              id="profile_pic_key"
              type="text"
              value={formik.values?.profile_pic_key ?? ""}
              onChange={formik.handleChange}
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Profile pic s3 key"
            />
          </div>
          <div className="mt-5 w-4/12">
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Rating*
            </label>
            <select
              id="rating"
              onChange={formik.handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            >
              {Array.from(Array(5)).map((i1, i) => (
                <option
                  key={i + 1}
                  selected={formik.values.rating == i + 1}
                  value={i + 1}
                >
                  {i + 1}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex justify-center gap-2">
          <div className="mt-5 w-3/5">
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Cover Images Keys (comma separated)
            </label>
            <input
              id="logo_key"
              type="text"
              value={coverImages}
              onChange={(e) => setCoverImages(e.target.value)}
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Cover Images s3 key"
            />
          </div>
          <div className="mt-5 w-2/5">
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Instagram
            </label>
            <input
              id="social_links.instagram"
              type="text"
              value={formik.values?.social_links?.instagram}
              onChange={formik.handleChange}
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Instagram Link"
            />
          </div>
        </div>
        <div className="mt-5">
          <label className="block mb-2 text-sm font-medium text-gray-900">
            Description*
          </label>
          <textarea
            id="description"
            rows={5}
            value={formik.values?.description ?? ""}
            onChange={formik.handleChange}
            placeholder="Description (optional)"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
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

export default Edit;
