import { AxiosResponse } from "axios";
import { sendRequest } from ".";
import { IOfferListResponse } from "../interfaces/common";
import { ICreateOfferForm } from "../interfaces/forms";

const baseUrl = `/admin/offers`;

const list = (page: number): Promise<AxiosResponse<IOfferListResponse>> => {
  return sendRequest(`${baseUrl}?limit=10&page=${page}`);
};

const createOffer = (
  form: ICreateOfferForm
): Promise<AxiosResponse<string>> => {
  return sendRequest(`${baseUrl}/create`, { method: "POST", data: form });
};

const OffersApi = { list, createOffer };
export { OffersApi };
