import { AxiosPromise } from "axios";
import { IPaginateSortQuery } from "./user";
import { ICollectionModel, IPaginatedResultBase } from "../interfaces/common";
import { sendRequest } from ".";
import { ICreateCollectionForm } from "../interfaces/forms";

const baseUrl = "/admin/collections";

export interface ICollectionListResponse extends IPaginatedResultBase {
  data: ICollectionModel[];
}

const index = (id: string): AxiosPromise<ICollectionModel> => {
  return sendRequest(`${baseUrl}/${id}`);
};

const list = (
  props: IPaginateSortQuery
): AxiosPromise<ICollectionListResponse> => {
  return sendRequest(baseUrl, { method: "get", params: props });
};

const create = (form: ICreateCollectionForm) => {
  return sendRequest(`${baseUrl}/create`, { method: "POST", data: form });
};

const update = (id: string, form: ICreateCollectionForm) => {
  return sendRequest(`${baseUrl}/${id}`, { method: "PUT", data: form });
};

const CollectionApi = { list, create, index, update };
export { CollectionApi };
