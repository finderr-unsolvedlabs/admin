import { SidebarLayout } from "@/components/Layout/SidebarLayout";
import { SidebarsMainLoader } from "@/components/Loaders/SidebarsMainLoader";
import { AdminSidebar } from "@/components/Sidebar/AdminSidebar";
import { CollectionApi } from "@/services/api/collection";
import { ICollectionModel } from "@/services/interfaces/common";
import { ICreateCollectionForm } from "@/services/interfaces/forms";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Create = () => {
  const router = useRouter();
  const id = router.query.id as string;
  const [collection, setCollection] = useState<ICollectionModel>();

  useEffect(() => {
    if (id) {
      CollectionApi.index(id).then(({ data }) => {
        setCollection(data);
      });
    }
  }, [id]);
  return (
    <SidebarLayout
      MainComponent={
        collection ? <Main data={collection} /> : <SidebarsMainLoader />
      }
      SidebarComponent={<AdminSidebar />}
    />
  );
};

interface props {
  data: ICollectionModel;
}

const Main = ({ data }: props) => {
  const router = useRouter();
  const id = router.query.id as string;

  const initialValues: ICreateCollectionForm = {
    name: data.name,
    description: data.description,
    products: data.products.map((x) => x._id),
  };

  const formik = useFormik({
    initialValues,
    onSubmit: (formData) => {
      CollectionApi.update(id, { ...formData })
        .then(({ data }) => {
          alert("Collection Updated Successfully");
          router.push("/admin/collections");
        })
        .catch((error) => {
          alert("Something went wrong!");
          console.error(error);
        });
    },
  });

  return (
    <div className="bg-gray-100 h-full p-4">
      <h1 className="text-2xl font-semibold">Update Collection</h1>
      <form onSubmit={formik.handleSubmit}>
        <div className="mt-5 w-full">
          <label className="block mb-2 text-sm font-medium text-gray-900">
            Collection Name*
          </label>
          <input
            id="name"
            type="text"
            value={formik.values.name}
            onChange={formik.handleChange}
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Collection name"
            required
          />
        </div>
        <div className="mt-5">
          <label className="block mb-2 text-sm font-medium text-gray-900">
            Description
          </label>
          <textarea
            id="description"
            rows={5}
            value={formik.values.description ?? ""}
            onChange={formik.handleChange}
            placeholder="Description (optional)"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          />
        </div>
        <div className="mt-5 w-full">
          <label className="block mb-2 text-sm font-medium text-gray-900">
            Products
          </label>
          <input
            id="products"
            type="text"
            value={formik.values.products}
            onChange={({ target }) => {
              formik.setFieldValue("products", target.value.split(","));
            }}
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="comma-separated-product-id-1, product-id-2, product-id-3"
            required
          />
        </div>
        <div className="flex justify-center mt-5">
          <button
            disabled={!formik.dirty}
            type="submit"
            className="disabled:cursor-not-allowed text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Update Collection
          </button>
        </div>
      </form>
    </div>
  );
};

export default Create;
