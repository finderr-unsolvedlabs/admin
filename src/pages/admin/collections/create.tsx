import { SidebarLayout } from "@/components/Layout/SidebarLayout";
import { AdminSidebar } from "@/components/Sidebar/AdminSidebar";
import { CollectionApi } from "@/services/api/collection";
import { ICreateCollectionForm } from "@/services/interfaces/forms";
import { useFormik } from "formik";
import { useRouter } from "next/router";

const Create = () => {
  return (
    <SidebarLayout
      MainComponent={<Main />}
      SidebarComponent={<AdminSidebar />}
    />
  );
};

const Main = () => {
  const router = useRouter();

  const initialValues: ICreateCollectionForm = {
    name: "",
    description: undefined,
    products: [],
  };

  const formik = useFormik({
    initialValues,
    onSubmit: (formData) => {
      CollectionApi.create({ ...formData })
        .then(({ data }) => {
          alert("Collection Added Successfully");
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
      <h1 className="text-2xl font-semibold">Create New Collection</h1>
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
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Create Collection
          </button>
        </div>
      </form>
    </div>
  );
};

export default Create;
