import { SidebarLayout } from "@/components/Layout/SidebarLayout";
import { AdminSidebar } from "@/components/Sidebar/AdminSidebar";
import Link from "next/link";
import React, { useEffect } from "react";
import EventsTable from "@/components/Tables/EventsTable";
import { EventsApi } from "@/services/api/events";
import { IEventListResponse } from "@/services/interfaces/common";
import { useRouter } from "next/router";

const Events = () => {
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

  const [events, setEvents] = React.useState<IEventListResponse | null>(null);

  useEffect(() => {
    setEvents(null);
    EventsApi.list(page).then(({ data }) => {
      setEvents(data);
    });
  }, [page]);

  return (
    <div className="flex flex-col gap-4 p-4 bg-gray-100 w-full min-h-full">
      <div className="flex justify-between">
        <h1 className="text-2xl font-semibold">Events</h1>
        <div className="flex justify-end">
          <Link href="/admin/events/create">
            <div className="text-white bg-blue-700  hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
              Add New Event
            </div>
          </Link>
        </div>
      </div>
      {events === null ? (
        <div>No Events</div>
      ) : (
        <EventsTable title="Events List" eventsData={events} />
      )}
    </div>
  );
};

export default Events;
