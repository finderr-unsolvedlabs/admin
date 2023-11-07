import { AxiosResponse } from "axios";
import { sendRequest } from ".";
import { IProductModel } from "../interfaces/common";
import { TSearchState } from "../interfaces/components/searchPageComponent";

const baseURL = `/website/search`;

interface ISearchProductResponse {
  data: {
    products: IProductModel[];
    totalCount: number;
  };
}

const searchProduct = (
  props: Partial<TSearchState>
): Promise<AxiosResponse<ISearchProductResponse>> => {
  return sendRequest(`${baseURL}/products`, {
    method: "get",
    params: { ...props },
  });
};

export const SearchApi = { searchProduct };
