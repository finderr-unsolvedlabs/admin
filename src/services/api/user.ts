import { AxiosPromise } from "axios";
import { sendRequest } from ".";
import {
  IBasicProduct,
  ICart,
  ICartItem,
  ILeadModel,
  IPaginateQueryBase,
  IPaginatedResultBase,
  IUserActionLog,
  IUserModel,
} from "../interfaces/common";

const baseUrl = `/admin/users`;

export interface IUserDetails extends IUserModel {
  leads: ILeadModel[];
  recentlyViewedProducts: IBasicProduct[];
  cart: ICart;
  recentActivities: IUserActionLog[];
}

interface IListUser extends IUserModel {
  lastVisitedTime: string;
  totalProductsInCart: number;
}

export interface IUserListResponse extends IPaginatedResultBase {
  data: IListUser[];
}

export interface IPaginateSortQuery extends IPaginateQueryBase {
  sortBy?: string;
  order?: string;
}

const list = (props: IPaginateSortQuery): AxiosPromise<IUserListResponse> => {
  return sendRequest(`${baseUrl}`, {
    method: "get",
    params: { ...props },
  });
};

const getUser = (id: string): AxiosPromise<IUserDetails> => {
  return sendRequest(`${baseUrl}/${id}`);
};

const UserApi = { list, getUser };
export { UserApi };
