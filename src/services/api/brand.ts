import { AxiosResponse } from "axios";
import { sendRequest } from ".";
import { IBrandModel } from "../interfaces/common";
import { IBrandUpdateForm, ICreateBrandForm } from "../interfaces/forms";

const baseUrl = `/admin/brands`;

export interface IBrandListResponse extends IBrandModel {
  activeProductsCount: number;
  totalProducts: number;
}

const list = (): Promise<AxiosResponse<IBrandListResponse[]>> => {
  return sendRequest(baseUrl);
};

const getBrand = (id: string): Promise<AxiosResponse<IBrandModel>> => {
  return sendRequest(`${baseUrl}/${id}`);
};

const createBrand = (
  data: ICreateBrandForm
): Promise<AxiosResponse<string>> => {
  return sendRequest(`${baseUrl}`, { method: "POST", data });
};

const editBrand = (
  id: string,
  data: IBrandUpdateForm
): Promise<AxiosResponse<IBrandModel>> => {
  return sendRequest(`${baseUrl}/${id}`, { method: "PATCH", data });
};

const activate = (id: string): Promise<AxiosResponse<string>> => {
  return sendRequest(`${baseUrl}/${id}/activate`, { method: "PATCH" });
};

const deactivate = (id: string): Promise<AxiosResponse<string>> => {
  return sendRequest(`${baseUrl}/${id}/deactivate`, { method: "PATCH" });
};

const BrandApi = {
  list,
  editBrand,
  getBrand,
  createBrand,
  activate,
  deactivate,
};
export { BrandApi };
