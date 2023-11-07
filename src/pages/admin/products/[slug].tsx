import { UserApi } from "@/services/api/user";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

type Props = {};

const ProductPage = (props: Props) => {
  const router = useRouter();
  const [leads, setLeads] = useState<[]>([]);

  useEffect(() => {
    UserApi.fetchLeads()
      .then(({ data }) => {})
      .catch((err) => {
        router.replace("/");
        console.error(err);
      });
  });

  return <div></div>;
};

export { ProductPage };
