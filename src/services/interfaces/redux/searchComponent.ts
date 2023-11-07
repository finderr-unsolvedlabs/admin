import {
  ISortByOptions,
  TDataList,
  TSearchState,
  TValidSearchPages,
  TValidViews,
} from "@/services/interfaces/components/searchPageComponent";

export interface ISearchComponentRedux {
  searchPageLoadedItems: TDataList;
  searchPageFilters: TSearchState;
  brandCatalogPageLoadedItems: TDataList;
  brandCatalogPageFilters: TSearchState;
  storeCatalogPageLoadedItems: TDataList;
  storeCatalogPageFilters: TSearchState;
  latestScrollPosition: number | null;
}

// reducer payload interfaces
export interface ISetDataListAction {
  pageType: TValidSearchPages;
  data: TDataList;
}

export interface IIncrementCurrentPage {
  pageType: TValidSearchPages;
  currentPage: number;
}

export interface IUpdateSearchQuery {
  pageType: TValidSearchPages;
  searchQuery: string;
}

export interface IToggleView {
  pageType: TValidSearchPages;
  view: TValidViews;
}

export interface ISetPageFilter {
  pageType: TValidSearchPages;
  data: TSearchState;
}

export interface IToggleSortBy {
  pageType: TValidSearchPages;
  option: ISortByOptions | null;
}

export interface IUpdateFilter {
  pageType: TValidSearchPages;
  updateType: "add" | "remove";
  filterType: keyof TSearchState["filters"];
  value: string[];
}
