import { IAction, IBrandModel } from "./common";

export interface IProductUpdateForm {
  category?: string;
  tags?: string[];
}

export interface IBulkUpdateProductsForm {
  products: string[];
  category?: string;
  changeState?: "active" | "inactive";
}

export interface IBrandUpdateForm {
  name: string;
  description: string | null;
  contact: { phone: string };
  logo_key: string;
  profile_pic_key?: string;
  cover_images_keys: string[];
  state: string;
  rating: number;
  social_links?: {
    instagram?: string;
  };
  store?: IBrandModel["store"];
}

export interface ICreateBrandForm {
  name: string;
  description: string | undefined;
  contact: { phone: string | undefined };
  logo_key: string;
  profile_pic_key: string | undefined;
  cover_images_keys: string[] | undefined;
  rating: number;
  social_links: {
    instagram?: string | undefined;
  };
  slug?: string;
}

export interface ICreateEventForm {
  title: string;
  description?: string;
  imageKey: string;
  expiry_date: string;
  action: IAction;
}

export interface ICreateOfferForm {
  title: string;
  description?: string;
  imageKey: string;
  brand_id?: string;
  expiry_date: string;
  action: IAction;
}

export interface ICreateCollectionForm {
  name: string;
  description?: string;
  products: string[];
}
