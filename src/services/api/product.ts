import { AxiosResponse } from "axios";
import { sendRequest } from ".";
import { IProductModel } from "../interfaces/common";
import {
  IBulkUpdateProductsForm,
  IProductUpdateForm,
} from "../interfaces/forms";

const baseUrl = `/admin/products`;

interface IListResponse {
  data: {
    products: IProductModel[];
    totalCount: number;
  };
}

export type TSearchQueryOptions = "name" | "description" | "scraped_slug";

export interface TProductSearchParams {
  brands?: string[];
  categories?: string[];
  search_query?: string;
  search_query_from?: TSearchQueryOptions[];
  tags?: string[];
  excluded_tags?: string[];
  states?: string[];
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

const bulkUpdate = (
  data: IBulkUpdateProductsForm
): Promise<
  AxiosResponse<{ message: string; meta: { modifiedCount: number } }>
> => {
  return sendRequest(`${baseUrl}/bulk-update`, { method: "POST", data: data });
};

const ProductApi = { getProduct, update, list, bulkUpdate };
export { ProductApi };
