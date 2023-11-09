import { IStore } from "@/services/interfaces/redux";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

type Props = {
  children: React.ReactNode;
};

function index({ children }: Props) {
  const dispatch = useDispatch();
  const router = useRouter();

  const user = useSelector((store: IStore) => store.user);

  useEffect(() => {
    if (!user.userLoggedIn) {
      router.replace("/");
    }
  }, [user.userLoggedIn]);

  return <div>{children}</div>;
}

export default index;
