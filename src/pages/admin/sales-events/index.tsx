import { SidebarLayout } from "@/components/Layout/SidebarLayout";
import { AdminSidebar } from "@/components/Sidebar/AdminSidebar";
import Link from "next/link";
import React, { useState } from "react";
import { demoEvents, demoOffers } from "@/utils/constants/demoData";
import SalesTable from "@/components/Tables/Sales";

const Sales = () => {
  return (
    <SidebarLayout
      MainComponent={<Main />}
      SidebarComponent={<AdminSidebar />}
    />
  );
};

const Main = () => {
  const [formVisible, setFormVisible] = useState(false);

  return (
    <div className="flex flex-col gap-4 p-4 bg-gray-100 w-full min-h-full">
      <div className="flex justify-between">
        <h1 className="text-2xl font-semibold">Sales and Events</h1>
        <div className="flex justify-end">
          <Link href="/admin/sales-events/create">
            <div className="text-white bg-blue-700  hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
              Add New Event
            </div>
          </Link>
        </div>
      </div>
      <SalesTable title="Events" demoData={demoEvents} />
      <SalesTable title="Offers" demoData={demoEvents} />
    </div>
  );
};

export default Sales;
