import { AxiosResponse } from "axios";
import { sendRequest } from ".";
import { IProductTagModel } from "../interfaces/common";

const baseUrl = `/admin/product-tags`;

const list = (): Promise<AxiosResponse<IProductTagModel[]>> => {
  return sendRequest(baseUrl);
};

interface IApplyBulkTagBody {
  products: string[];
  tags: string[];
}
const applyBulkTags = (
  props: IApplyBulkTagBody
): Promise<AxiosResponse<string>> => {
  return sendRequest(`${baseUrl}/apply-bulk-tags`, {
    method: "post",
    data: props,
  });
};

const ProductTagApi = { list, applyBulkTags };
export { ProductTagApi };
