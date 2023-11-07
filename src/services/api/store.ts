import { sendRequest } from "@/services/api";
import { AxiosResponse } from "axios";
import { IBrandModel } from "../interfaces/common";

const baseURL = `/website/pages/stores`;

const instanceBaseURL = (slug: string) => {
  return `${baseURL}/${slug}`;
};

const list = (): Promise<AxiosResponse<{ data: IBrandModel[] }>> => {
  return sendRequest(baseURL);
};

const StoreApi = { list };
export { StoreApi };
