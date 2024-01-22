import {
  ClothSizes,
  LeadTypes,
  USER_ACTION_TYPES,
} from "@/utils/constants/common";
import { AlertColor } from "@mui/material";

// utilities
export type TOption = {
  label: string;
  value: string;
};

export type TSelectorOptions = null | TOption | TOption[];

export type TAlerts = {
  title: string;
  description: string;
  type: AlertColor;
};

export interface ITimeStamp {
  createdAt: string;
  updatedAt?: string;
}

// generated form constants
export type ILeadTypes = (typeof LeadTypes)[number];
export type TSizes = (typeof ClothSizes)[number];
export type TUserActionTypes = (typeof USER_ACTION_TYPES)[number];

// Interfaces of models
export interface IImageModel {
  _id: string;
  slug: string;
  url: string;
}

export interface IMediaModel extends IImageModel {
  type: "image" | "video";
}

export interface IAction {
  label: string;
  url: string;
}

export interface IBrandModel {
  _id: string;
  name: string;
  slug: string;
  state: string;
  logo: IImageModel;
  // stores: IStoreModel[];
  contact: { phone: string };
  description: string | null;
  cover_images: IImageModel[];
}

export interface IStoreModel {
  _id: string;
  name: string;
  slug: string;
  address: {
    google_map_link: string;
    address: string;
  };
  images: IImageModel[];
  brand: IBrandModel;
}

export interface ICategoryModel {
  _id: string;
  slug: string;
  name: string;
  image: IImageModel;
  parent: null | ICategoryModel;
}

export interface IProductTagModel {
  name: string;
  slug: string;
  groupName: string;
}

export interface IProductModel {
  _id: string;
  slug: string;
  name: string;
  price: number;
  description?: string;
  relevance: number;
  brand: IBrandModel;
  category: ICategoryModel;
  scraped_slug: string;
  tags: IProductTagModel[];
  images: IImageModel[];
  original_source?: string;
  state: "active" | "inactive";
}

export interface IBasicProduct
  extends Pick<
    IProductModel,
    "_id" | "name" | "price" | "slug" | "original_source"
  > {
  image: string;
  brand_name: string;
}
export interface IWishlistItem extends IBasicProduct {}

export interface ICartItem extends IBasicProduct {
  checkout_type: ILeadTypes;
}

export interface IUserModel extends ITimeStamp {
  _id: string;
  user_name: string;
  name?: string;
  mobile?: string;
  email?: string;
  wishlist?: IBasicProduct[];
}

export interface ILeadModel {
  _id: string;
  products: IBasicProduct[];
  lead_type: ILeadTypes;
  user: IUserModel;
  size?: TSizes;
  createdAt: string;
}

export interface IStoryModel {
  media: IMediaModel;
  action: IAction;
  groupSlug: string;
  groupLogo: IImageModel;
  title: string;
}

export interface IBaseInfo {
  title: string;
  description: string | null;
  image: IImageModel;
  action: IAction;
}

export interface INotification extends IBaseInfo {}

export interface IEvent extends IBaseInfo {
  slug: string;
}

export interface IOfferModel extends IBaseInfo {
  slug: string;
  brand?: IBrandModel;
}

export interface IUserActionLog extends ITimeStamp {
  action_type: TUserActionTypes;
  message?: string;
  // user: IUserModel;
}
