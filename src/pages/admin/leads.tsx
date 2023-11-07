import { UserApi } from "@/services/api/user";
import { ILeadModel } from "@/services/interfaces/common";
import { dateFormat } from "@/utils/constants/common";
import { isEmpty } from "lodash";
import moment from "moment";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

type Props = {};

function Leads({}: Props) {
  const router = useRouter();
  const [leads, setLeads] = useState<ILeadModel[]>([]);

  useEffect(() => {
    UserApi.fetchLeads()
      .then(({ data }) => setLeads(data))
      .catch((err) => {
        router.replace("/");
        console.error(err);
      });
  });

  if (isEmpty(leads)) {
    return <h1>Unauthorized Access</h1>;
  } else {
    return (
      <main className="p-2">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
          {leads.map((lead) => (
            <div key={lead._id} className="p-2 bg-gray-200 rounded-md">
              <div>{lead.user.mobile}</div>
              <div>{lead.user.name}</div>
              <div>{lead.product.name}</div>
              <div>{moment(lead.createdAt).format(dateFormat)}</div>
            </div>
          ))}
        </div>
      </main>
    );
  }
}

export default Leads;
