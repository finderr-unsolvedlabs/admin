import { AxiosPromise } from "axios";
import { sendRequest } from ".";
import {
  IBasicProduct,
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
  cartItems: ICartItem[];
  recentActivities: IUserActionLog[];
}

interface IListUser extends IUserModel {
  lastLoginTime: string;
  totalProductsInCart: number;
}

export interface IUserListResponse extends IPaginatedResultBase {
  data: IListUser[];
}

const list = (props: IPaginateQueryBase): AxiosPromise<IUserListResponse> => {
  return sendRequest(`${baseUrl}`, {
    method: "get",
    params: { ...props },
  });
};

const getUser = () => {};

const UserApi = { list };
export { UserApi };
