import { AxiosResponse } from "axios";
import { sendRequest } from ".";
import { IEventListResponse } from "../interfaces/common";
import { ICreateEventForm } from "../interfaces/forms";

const baseUrl = `/admin/events`;

const list = (page: number): Promise<AxiosResponse<IEventListResponse>> => {
  return sendRequest(`${baseUrl}?limit=10&page=${page}`);
};

const createEvent = (
  form: ICreateEventForm
): Promise<AxiosResponse<string>> => {
  return sendRequest(`${baseUrl}/create`, { method: "POST", data: form });
};

const updateEvent = (
  _id: string,
  data: ICreateEventForm
): Promise<AxiosResponse<string>> => {
  return sendRequest(`${baseUrl}/${_id}`, { method: "PATCH", data: data });
};

const EventsApi = { list, createEvent, updateEvent };
export { EventsApi };
