import { AxiosResponse } from "axios";
import { sendRequest } from ".";
import { IProductTagModel } from "../interfaces/common";

const baseUrl = `/admin/product-tags`;

const list = (): Promise<AxiosResponse<IProductTagModel[]>> => {
  return sendRequest(baseUrl);
};

const ProductTagApi = { list };
export { ProductTagApi };
