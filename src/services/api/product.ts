import { AxiosResponse } from "axios";
import { sendRequest } from ".";
import { IProductModel } from "../interfaces/common";
import { IProductUpdateForm } from "../interfaces/forms";

const baseUrl = `/admin/products`;

interface IListResponse {
  data: {
    products: IProductModel[];
    totalCount: number;
  };
}

export interface TProductSearchParams {
  brands?: string[];
  categories?: string[];
  search_query?: string;
  tags?: string[];
}

const list = (
  props: Partial<TProductSearchParams>
): Promise<AxiosResponse<IListResponse>> => {
  return sendRequest(`${baseUrl}`, {
    method: "get",
    params: { ...props },
  });
};

const getProduct = (
  slug: string,
  token?: string
): Promise<AxiosResponse<IProductModel>> => {
  return sendRequest(`${baseUrl}/${slug}`, {}, token);
};

const update = (
  slug: string,
  form: IProductUpdateForm
): Promise<AxiosResponse<string>> => {
  return sendRequest(`${baseUrl}/${slug}`, { method: "POST", data: form });
};

const ProductApi = { getProduct, update, list };
export { ProductApi };
