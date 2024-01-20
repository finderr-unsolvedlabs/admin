import {
  IBasicProduct,
  ICartItem,
  ILeadModel,
  IUserActionLog,
  IUserModel,
} from "../interfaces/common";

export interface IUserDetails extends IUserModel {
  leads: ILeadModel[];
  recentlyViewedProducts: IBasicProduct[];
  cartItems: ICartItem[];
  recentActivities: IUserActionLog[];
}

// const list = () => {};

const getUser = () => {};

const UserApi = {};
export { UserApi };
