import { IProductModel } from "../common";

export interface ILoadedProductsSlice {
  pageName: string | null;
  loadedSearchItems: IProductModel[];
  totalCount: number;
  currentPage: number;
  latestScrollPosition: number | null;
}

// reducer payload interfaces
export interface ISetLoadedProducts {
  data: Omit<ILoadedProductsSlice, "latestScrollPosition">;
}
