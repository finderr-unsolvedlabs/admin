import { IAction } from "./common";

export interface IProductUpdateForm {
  category?: string;
  tags?: string[];
}

export interface IBulkUpdateProductsForm {
  products: string[];
  category?: string;
  changeState?: "active" | "inactive";
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
