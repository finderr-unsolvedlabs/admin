import axios, { AxiosRequestConfig } from "axios";
import Qs from "qs";
import Cookies from "js-cookie";
import { ADMIN_TOKEN } from "@/utils/constants/cookiesName";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

const fetchData = async (path: string) => {
  return await axios.get(`${baseUrl}/${path}`);
};

// Stringify the params
axios.interceptors.request.use((config) => {
  config.paramsSerializer = (params) => {
    return Qs.stringify(params, {
      arrayFormat: "brackets",
    });
  };
  config.baseURL = process.env.ADMIN_APP_API_URL;

  // Adding default headers
  config.headers["Content-Type"] = "application/json";

  // TODO: add this once we start with users/customers
  // config.headers.common["Access-Token"] = getUserToken();

  return config;
});

const sendRequest = (
  url: string,
  options: AxiosRequestConfig = {},
  overriddenToken = ""
) => {
  let accessToken;
  const cookieToken = Cookies.get(ADMIN_TOKEN);

  if (overriddenToken) {
    accessToken = overriddenToken;
  } else if (cookieToken) {
    accessToken = cookieToken;
  }

  options = {
    ...options,
    headers: {
      Authorization: accessToken || "",
    },
  };
  const res = axios(`${baseUrl}${url}`, options);

  // TODO: use them with global loaders and notifiers
  // res
  //   .then((response) => {})
  //   .catch((response) => {})
  //   .finally(() => {});
  return res;
};

export { fetchData, sendRequest };
