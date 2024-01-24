import { AxiosResponse } from "axios";
import { sendRequest } from ".";
import { IEventListResponse } from "../interfaces/common";

const baseUrl = `/admin/events`;

const list = (page: number): Promise<AxiosResponse<IEventListResponse>> => {
  return sendRequest(`${baseUrl}?limit=10&page=${page}`);
};

const EventsApi = { list };
export { EventsApi };
