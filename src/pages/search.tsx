import React from "react";
import Head from "next/head";
import SearchPageComponent from "@/components/Search/SearchPage";

export default function SearchPage() {
  return (
    <>
      <Head>
        <title>{"Finderr - Search Products, Brands and Stores"}</title>
        <meta name="description" content="Search Products, Brands and Stores" />
      </Head>
      <SearchPageComponent />
    </>
  );
}
