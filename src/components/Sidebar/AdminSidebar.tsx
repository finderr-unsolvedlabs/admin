"use client";
import { startCase } from "lodash";
import Link from "next/link";
import React from "react";

const routes = [
  { name: "home", path: "/admin" },
  { name: "brands", path: "/admin/brands" },
  { name: "products", path: "/admin/products" },
  { name: "tagging", path: "/admin/taggings" },
  { name: "sales and events", path: "/admin/sales-events" },
];

type Props = {};

const AdminSidebar = (props: Props) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="mx-auto">
        <img
          className="w-28 h-28"
          src="https://static.wixstatic.com/media/ca9765_2c70045cb38b4f2fb375c76a01e312ce~mv2.png/v1/fill/w_177,h_177,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/Finderr%20(15).png"
          alt="logo"
        />
      </div>
      {routes.map((route) => {
        return (
          <div
            className="text-slate-800 text-lg font-medium p-2 border-b-2"
            key={route.name}
          >
            <Link href={route.path}>
              <div>{startCase(route.name)}</div>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export { AdminSidebar };
