import { SidebarLayout } from "@/components/Layout/SidebarLayout";
import { AdminSidebar } from "@/components/Sidebar/AdminSidebar";
import { sendRequest } from "@/services/api";
import React, { useState } from "react";

const Page = () => {
  return (
    <SidebarLayout
      MainComponent={<Main />}
      SidebarComponent={<AdminSidebar />}
    />
  );
};

const Main = () => {
  const [loadingTypesense, setLoadingTypesense] = useState(false);

  return (
    <div className="p-3">
      <h1 className="text-2xl text-blue-500 font-semibold mb-5">
        Finderr Dashboard
      </h1>
      <div>
        <div
          className="py-2 px-4 border rounded-md w-fit cursor-pointer"
          onClick={() => {
            setLoadingTypesense(true);
            sendRequest("/admin/sync-typesense")
              .then(({ data }) => {
                alert(data);
              })
              .catch((error) => {
                alert("something went wrong");
                console.error(error);
              })
              .finally(() => setLoadingTypesense(false));
          }}
        >
          {loadingTypesense ? "Loading ..." : "Sync Typesense"}
        </div>
      </div>
    </div>
  );
};

export default Page;
