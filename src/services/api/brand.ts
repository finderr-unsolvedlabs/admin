import { AxiosResponse } from "axios";
import { sendRequest } from ".";
import { IBrandModel } from "../interfaces/common";

const baseUrl = `/admin/brands`;

const list = (): Promise<AxiosResponse<IBrandModel[]>> => {
  return sendRequest(baseUrl);
};

const editBrand = (
  id: string,
  data: IBrandModel
): Promise<AxiosResponse<IBrandModel>> => {
  return sendRequest(`${baseUrl}/${id}`, { method: "PATCH", data });
};

const BrandApi = { list, editBrand };
export { BrandApi };
