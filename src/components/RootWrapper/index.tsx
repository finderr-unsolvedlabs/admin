import { IStore } from "@/services/interfaces/redux";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { USER_TOKEN } from "@/utils/constants/cookiesName";
import { setUserLoggedIn } from "@/store/userSlice";

type Props = {
  children: React.ReactNode;
};

function RootWrapper({ children }: Props) {
  const dispatch = useDispatch();
  const router = useRouter();

  const user = useSelector((store: IStore) => store.user);

  useEffect(() => {
    // redux updates
    const token = Cookies.get(USER_TOKEN);
    if (token) {
      dispatch(setUserLoggedIn(true));
    } else {
      router.replace("/");
    }
  }, []);

  return <div>{children}</div>;
}

export default RootWrapper;
