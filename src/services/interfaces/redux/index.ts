import { IAppSlice } from "./app";
import { ILoadedProductsSlice } from "./loaded";
import { IUserSlice } from "./user";

export interface IStore {
  loadedProducts: ILoadedProductsSlice;
  user: IUserSlice;
  app: IAppSlice;
}
