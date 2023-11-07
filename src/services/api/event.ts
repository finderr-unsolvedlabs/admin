import { sendRequest } from "@/services/api";
import { AxiosResponse } from "axios";
import { IEvent } from "../interfaces/common";

const baseURL = `/website/pages/events`;

const instanceBaseURL = (slug: string) => {
  return `${baseURL}/${slug}`;
};

export interface IEventListResponse {
  data: {
    offers: IEvent[];
  };
}

const list = (): Promise<AxiosResponse<IEventListResponse>> => {
  return sendRequest(baseURL);
};

const index = (slug: string): Promise<AxiosResponse<{ data: IEvent }>> => {
  return sendRequest(instanceBaseURL(slug));
};

const EventApi = { list, index };
export { EventApi };
