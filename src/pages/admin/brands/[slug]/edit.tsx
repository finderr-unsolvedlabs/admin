import { SidebarLayout } from "@/components/Layout/SidebarLayout";
import { SidebarsMainLoader } from "@/components/Loaders/SidebarsMainLoader";
import { AdminSidebar } from "@/components/Sidebar/AdminSidebar";
import { BrandApi } from "@/services/api/brand";
import { IBrandModel } from "@/services/interfaces/common";
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
      console.log(reqData);
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

  const [formData, setFormData] = React.useState(brandData);

  const submitHandler = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData === brandData) {
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
          <div className="mt-5 w-1/2">
            <label className="block mb-2 text-sm font-medium text-gray-900">
              State*
            </label>
            <div className="flex items-center gap-2">
              <div className="flex items-center">
                <input
                  checked={formData.state === "active" ? true : false}
                  onClick={() => setFormData({ ...formData, state: "active" })}
                  id="state_active"
                  type="radio"
                  value="active"
                  name="state"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:outline-none"
                />
                <label className="ms-2 text-sm font-medium text-gray-900">
                  Active
                </label>
              </div>
              <div className="flex items-center">
                <input
                  checked={formData.state === "inactive" ? true : false}
                  onClick={() =>
                    setFormData({ ...formData, state: "inactive" })
                  }
                  id="state_inactive"
                  type="radio"
                  value="inactive"
                  name="state"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:outline-none"
                />
                <label className="ms-2 text-sm font-medium text-gray-900">
                  Inactive
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center gap-2">
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
