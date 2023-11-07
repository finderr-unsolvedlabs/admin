import { AxiosResponse } from "axios";
import { sendRequest } from ".";
import { IProductModel } from "../interfaces/common";

const baseUrl = `/admin/products`;

const getProduct = (slug: string): Promise<AxiosResponse<IProductModel>> => {
  return sendRequest(`${baseUrl}/${slug}`);
};

const ProductApi = { getProduct };
export { ProductApi };
