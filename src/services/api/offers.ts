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

const updateOffer = (
  _id: string,
  data: ICreateOfferForm
): Promise<AxiosResponse<string>> => {
  return sendRequest(`${baseUrl}/${_id}`, { method: "PATCH", data: data });
};

const OffersApi = { list, createOffer, updateOffer };
export { OffersApi };
