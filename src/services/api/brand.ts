import { AxiosResponse } from "axios";
import { sendRequest } from ".";
import { IBrandModel } from "../interfaces/common";
import { IBrandUpdateForm } from "../interfaces/forms";

const baseUrl = `/admin/brands`;

const list = (): Promise<AxiosResponse<IBrandModel[]>> => {
  return sendRequest(baseUrl);
};

const getBrand = (id: string): Promise<AxiosResponse<IBrandModel>> => {
  return sendRequest(`${baseUrl}/${id}`);
};

const editBrand = (
  id: string,
  data: IBrandUpdateForm
): Promise<AxiosResponse<IBrandModel>> => {
  return sendRequest(`${baseUrl}/${id}`, { method: "PATCH", data });
};

const BrandApi = { list, editBrand, getBrand };
export { BrandApi };
