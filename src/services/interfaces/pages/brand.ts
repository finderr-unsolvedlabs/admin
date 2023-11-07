import { IBrandModel, IProductModel, IStoreModel } from "../common";

export interface IBrandPageData {
  data: {
    brand: IBrandModel;
    products: IProductModel[];
    stores: IStoreModel[];
  };
}
