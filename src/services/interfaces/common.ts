import { AlertColor } from "@mui/material";

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
  description: string;
  stores: IStoreModel[];
  relevance: number;
  brand: IBrandModel;
  category: ICategoryModel;
  tags: IProductTagModel[];
  images: IImageModel[];
}

export interface IUserModel {
  _id: string;
  user_name: string;
  name?: string;
  mobile?: string;
  email?: string;
}

export interface ILeadModel {
  _id: string;
  product: IProductModel;
  user: IUserModel;
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
