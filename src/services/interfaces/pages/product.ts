import { IProductModel } from "../common";

export interface IProductPageData {
  data: {
    product: IProductModel;
    similar_products: IProductModel[];
    more_from_brand: IProductModel[];
  };
}
