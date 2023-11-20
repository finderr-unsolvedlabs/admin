import { SidebarLayout } from "@/components/Layout/SidebarLayout";
import { AdminSidebar } from "@/components/Sidebar/AdminSidebar";
import React from "react";

type Props = {};

const Brands = (props: Props) => {
  return (
    <SidebarLayout
      MainComponent={<div>Lala</div>}
      SidebarComponent={<AdminSidebar />}
    />
  );
};

export default Brands;
