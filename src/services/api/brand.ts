import { AxiosResponse } from "axios";
import { sendRequest } from ".";
import { IBrandModel } from "../interfaces/common";

const baseUrl = `/admin/brands`;

const list = (): Promise<AxiosResponse<IBrandModel[]>> => {
  return sendRequest(baseUrl);
};

const BrandApi = { list };
export { BrandApi };
