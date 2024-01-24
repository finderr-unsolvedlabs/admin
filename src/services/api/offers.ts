import { AxiosResponse } from "axios";
import { sendRequest } from ".";
import { IOfferListResponse } from "../interfaces/common";

const baseUrl = `/admin/offers`;

const list = (page: number): Promise<AxiosResponse<IOfferListResponse>> => {
  return sendRequest(`${baseUrl}?limit=10&page=${page}`);
};

const OffersApi = { list };
export { OffersApi };
