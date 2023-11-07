import { IBrandModel, IProductModel, IStoreModel, TOption } from "../common";

export type ISortByOptions = "price-low-to-high" | "price-high-to-low";
export type TValidViews = "products" | "stores" | "brands";
export const searchViews: TValidViews[] = ["products", "brands", "stores"];

export type TSearchState = {
  filters?: {
    brands?: string[];
    categories?: string[];
  };
  sort_by?: ISortByOptions;
  search_query?: string;
  page: number;
  limit: number;
};

export type TValidSearchPages = "search" | "brandCatalog" | "storeCatalog";

export type SearchComponentsProps = {
  hide?: {
    filterAndSortByBar?: boolean;
    brandFilter?: boolean;
    categoryFilter?: boolean;
    viewsTab?: boolean;
  };
  defaultValues?: Partial<TSearchState>;
  displayState?: {
    filtersOpen?: boolean;
  };
  pageType: TValidSearchPages;
};

export type TDataList =
  | { type: "products"; items: IProductModel[]; totalCount: number }
  | { type: "brands"; items: IBrandModel[]; totalCount: number }
  | { type: "stores"; items: IStoreModel[]; totalCount: number };

export type TProductFiltersOptions = {
  categories: { main: string; mainSlug: string; children: TOption[] }[];
  brands: TOption[];
  sort_by: ISortByOptions[];
  price: { min?: number; max?: number };
};
