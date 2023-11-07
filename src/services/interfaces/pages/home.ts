import { Dictionary } from "lodash";
import {
  IBaseInfo,
  IBrandModel,
  ICategoryModel,
  IEvent,
  IOfferModel,
  IProductModel,
  IStoreModel,
  IStoryModel,
} from "../common";

export interface IEventOrOffer extends IBaseInfo {
  type: "events" | "offers";
  slug: string;
}

export interface IHomeCat {
  slug: string;
  name: string;
  children: string[];
  image: string;
}

export interface IHomePageProps {
  data: {
    featured_categories: IHomeCat[];
    featured_products: IProductModel[];
    featured_stores: IStoreModel[];
    featured_brands: IBrandModel[];
    diwali_picks: IProductModel[];
    events: IEventOrOffer[];
    offers: IEventOrOffer[];
    stories: Dictionary<IStoryModel[]>;
  };
}
