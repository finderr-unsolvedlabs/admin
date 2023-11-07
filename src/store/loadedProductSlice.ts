import {
  ILoadedProductsSlice,
  ISetLoadedProducts,
} from "@/services/interfaces/redux/loaded";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: ILoadedProductsSlice = {
  pageName: null,
  loadedSearchItems: [],
  totalCount: 0,
  currentPage: 1,
  latestScrollPosition: null,
};

export const loadedProductsSlice = createSlice({
  name: "loadedProducts",
  initialState: initialState,
  reducers: {
    setLoadedProduct: (state, action: PayloadAction<ISetLoadedProducts>) => {
      return { ...state, ...action.payload.data };
    },
    updateLoadedProductScrollPosition: (
      state,
      action: PayloadAction<number>
    ) => {
      state.latestScrollPosition = action.payload;
    },
  },
});

export const { setLoadedProduct, updateLoadedProductScrollPosition } =
  loadedProductsSlice.actions;
export default loadedProductsSlice.reducer;
