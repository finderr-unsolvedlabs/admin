import { SidebarLayout } from "@/components/Layout/SidebarLayout";
import { SidebarsMainLoader } from "@/components/Loaders/SidebarsMainLoader";
import { AdminSidebar } from "@/components/Sidebar/AdminSidebar";
import { GenericTable } from "@/components/Tables/GenericTable";
import {
  CollectionApi,
  ICollectionListResponse,
} from "@/services/api/collection";
import { dateFormat } from "@/utils/constants/common";
import moment from "moment";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Page = () => {
  const router = useRouter();
  const [page, setPage] = useState(parseInt(router.query.page as string) || 1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);
  const [collectionList, setCollectionList] =
    useState<ICollectionListResponse>();

  useEffect(() => {
    setCollectionList(undefined);
    CollectionApi.list({ page, limit: itemsPerPage }).then(({ data }) => {
      setCollectionList(data);
    });
    ``;
  }, []);

  return (
    <SidebarLayout
      MainComponent={
        collectionList ? (
          <Main collectionList={collectionList} />
        ) : (
          <SidebarsMainLoader />
        )
      }
      SidebarComponent={<AdminSidebar />}
    />
  );
};

interface props {
  collectionList: ICollectionListResponse;
}

const Main = ({ collectionList }: props) => {
  return (
    <div className="bg-gray-100 h-full p-4">
      <div className="flex items-center justify-between">
        <h3 className="mb-4 text-xl font-semibold">Collections</h3>
        <Link href="/admin/collections/create">
          <div className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none cursor-pointer">
            Add New Collection
          </div>
        </Link>
      </div>

      <GenericTable
        editable={"/admin/collections"}
        tableData={collectionList}
        fields={[
          { name: "Name", key: "name" },
          {
            name: "Product Count",
            key: "products",
            transformation: (products) => products.length,
          },
          { name: "State", key: "state" },
          {
            name: "Created At",
            key: "createdAt",
            transformation: (createdAt) => moment(createdAt).format(dateFormat),
          },
        ]}
      />
    </div>
  );
};

export default Page;
