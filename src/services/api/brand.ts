import { sendRequest } from "@/services/api";
import { AxiosResponse } from "axios";
import { IBrandModel } from "../interfaces/common";

const baseURL = `/website/pages/brands`;

const instanceBaseURL = (slug: string) => {
  return `${baseURL}/${slug}`;
};

const list = (): Promise<AxiosResponse<{ data: IBrandModel[] }>> => {
  return sendRequest(baseURL);
};

const getBrand = (
  slug: string
): Promise<AxiosResponse<{ data: IBrandModel }>> => {
  return sendRequest(instanceBaseURL(slug));
};

// const getCatalog = (slug: string): Promise<AxiosResponse<>> => {
//   return sendRequest(`${instanceBaseURL(slug)}/catalog`);
// };

const BrandApi = { getBrand, list };
export { BrandApi };
