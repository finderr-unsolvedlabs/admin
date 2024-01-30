import { SidebarLayout } from "@/components/Layout/SidebarLayout";
import { SidebarsMainLoader } from "@/components/Loaders/SidebarsMainLoader";
import { AdminSidebar } from "@/components/Sidebar/AdminSidebar";
import { BrandApi } from "@/services/api/brand";
import { IBrandModel } from "@/services/interfaces/common";
import { IBrandUpdateForm } from "@/services/interfaces/forms";
// import { EventsApi } from "@/services/api/events";
// import { ICreateEventForm } from "@/services/interfaces/forms";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const Edit = () => {
  const router = useRouter();
  const brand_slug = router.query.slug as string;
  const [brandData, setBrandData] = useState<IBrandModel>();
  useEffect(() => {
    BrandApi.list().then(({ data }) => {
      const reqData = data.filter((brand) => brand.slug === brand_slug);
      if (reqData.length > 0) setBrandData(reqData[0]);
    });
  }, [brand_slug]);

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
    profile_pic_key: brandData.profile_pic?.slug,
    contact: brandData.contact,
    cover_images_keys: brandData.cover_images.map((image) => image.slug),
  };

  const [coverImages, setCoverImages] = useState<string>(
    convertedData.cover_images_keys.join(",")
  );

  const [formData, setFormData] = useState<IBrandUpdateForm>(convertedData);

  const submitHandler = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    const coverImagesArr = coverImages.split(",");

    formData.cover_images_keys = coverImagesArr;

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
  };

  const toggleState = () => {
    if (formData.state === "active") {
      convertedData.state = "inactive";
    } else {
      convertedData.state = "active";
    }
    BrandApi.editBrand(brandData._id, convertedData)
      .then(({ data }) => {
        setFormData({ ...formData, state: convertedData.state });
        alert("Brand State Updated Successfully");
      })
      .catch((error) => {
        alert("Something went wrong!");
        if (convertedData.state === "active") {
          convertedData.state = "inactive";
        } else {
          convertedData.state = "active";
        }
        console.error(error);
      });
  };

  return (
    <div className="flex flex-col gap-2 p-4 w-full h-full">
      <h1 className="text-2xl font-semibold">Edit Brand Details</h1>
      <form onSubmit={submitHandler}>
        <div className="flex items-center justify-center gap-2">
          <div className="mt-5 w-full">
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Brand Name*
            </label>
            <input
              id="brand_name"
              type="text"
              value={formData?.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Title"
              required
            />
          </div>
          <div className="mt-5 w-full">
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Contact Number*
            </label>
            <input
              id="contact_number"
              type="text"
              value={formData?.contact?.phone ?? ""}
              onChange={(e) =>
                setFormData({ ...formData, contact: { phone: e.target.value } })
              }
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="image s3 key"
              required
            />
          </div>
          <div className="mt-5 w-4/12">
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Current State: {formData.state}
            </label>
            <div
              onClick={toggleState}
              className="text-white cursor-pointer bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              {formData.state === "active" ? "Deactivate" : "Activate"}
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
              value={formData.logo_key}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  logo_key: e.target.value,
                })
              }
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="image s3 key"
              required
            />
          </div>
          <div className="mt-5 w-full">
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Profile Picture Key*
            </label>
            <input
              id="profile_pic"
              type="text"
              value={formData.profile_pic_key}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  profile_pic_key: e.target.value,
                })
              }
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="image s3 key"
            />
          </div>
          <div className="mt-5 w-4/12">
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Rating*
            </label>
            <select
              id="rating"
              onChange={(e) =>
                setFormData({ ...formData, rating: parseInt(e.target.value) })
              }
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            >
              {Array.from(Array(5)).map((i1, i) => (
                <option
                  key={i + 1}
                  selected={formData.rating == i + 1}
                  value={i + 1}
                >
                  {i + 1}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex justify-center gap-2">
          <div className="mt-5 w-full">
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Cover Images Keys (comma separated)*
            </label>
            <input
              id="logo_key"
              type="text"
              value={coverImages}
              onChange={(e) => setCoverImages(e.target.value)}
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="image s3 key"
              required
            />
          </div>
        </div>
        <div className="mt-5">
          <label className="block mb-2 text-sm font-medium text-gray-900">
            Description*
          </label>
          <textarea
            id="desc"
            rows={5}
            value={formData?.description ?? ""}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
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
