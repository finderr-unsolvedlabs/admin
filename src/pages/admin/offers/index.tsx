import { SidebarLayout } from "@/components/Layout/SidebarLayout";
import { AdminSidebar } from "@/components/Sidebar/AdminSidebar";
import Link from "next/link";
import React, { useEffect } from "react";
import { IOfferListResponse } from "@/services/interfaces/common";
import { useRouter } from "next/router";
import { OffersApi } from "@/services/api/offers";
import OffersTable from "@/components/Tables/OffersTable";

const Offers = () => {
  return (
    <SidebarLayout
      MainComponent={<Main />}
      SidebarComponent={<AdminSidebar />}
    />
  );
};

const Main = () => {
  const router = useRouter();
  const page = parseInt(router.query.page as string) || 1;

  const [offers, setOffers] = React.useState<IOfferListResponse | null>(null);

  useEffect(() => {
    setOffers(null);
    OffersApi.list(page).then(({ data }) => {
      setOffers(data);
    });
  }, [page]);

  return (
    <div className="flex flex-col gap-4 p-4 bg-gray-100 w-full min-h-full">
      <div className="flex justify-between">
        <h1 className="text-2xl font-semibold">Offers</h1>
        <div className="flex justify-end">
          <Link href="/admin/offers/create">
            <div className="text-white bg-blue-700  hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
              Add New Offer
            </div>
          </Link>
        </div>
      </div>
      {offers === null ? (
        <div>No Offers</div>
      ) : (
        <OffersTable title="Offers List" offersData={offers} />
      )}
    </div>
  );
};

export default Offers;
