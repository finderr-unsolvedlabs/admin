import { AxiosResponse } from "axios";
import { sendRequest } from ".";
import { IProductModel } from "../interfaces/common";
import { IProductUpdateForm } from "../interfaces/forms";

const baseUrl = `/admin/products`;

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

const ProductApi = { getProduct, update };
export { ProductApi };
