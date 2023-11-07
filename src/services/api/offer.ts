import { sendRequest } from "@/services/api";
import { AxiosResponse } from "axios";
import { IOfferModel } from "../interfaces/common";

const baseURL = `/website/pages/offers`;

const instanceBaseURL = (slug: string) => {
  return `${baseURL}/${slug}`;
};

export interface IOfferListResponse {
  data: {
    offers: IOfferModel[];
  };
}

const list = (): Promise<AxiosResponse<IOfferListResponse>> => {
  return sendRequest(baseURL);
};

const index = (slug: string): Promise<AxiosResponse<{ data: IOfferModel }>> => {
  return sendRequest(instanceBaseURL(slug));
};

const OfferApi = { list, index };
export { OfferApi };
