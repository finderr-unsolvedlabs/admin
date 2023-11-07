import { AxiosResponse } from "axios";
import { sendRequest } from ".";
import { ICategoryModel } from "../interfaces/common";

const baseUrl = `/admin/categories`;

const list = (): Promise<AxiosResponse<ICategoryModel[]>> => {
  return sendRequest(baseUrl);
};

const CategoryApi = { list };
export { CategoryApi };
