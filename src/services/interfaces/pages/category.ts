import { ICategoryModel, IProductModel } from "../common";

export interface ICategoryPage {
  category: ICategoryModel;
  products: IProductModel[];
}
