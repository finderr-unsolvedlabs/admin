import { IAppSlice } from "@/services/interfaces/redux/app";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: IAppSlice = {
  blockBodyScroll: false,
};

export const appSlice = createSlice({
  name: "app",
  initialState: initialState,
  reducers: {
    blockBodyScroll: (state, action: PayloadAction<boolean>) => {
      return { ...state, blockBodyScroll: action.payload };
    },
  },
});

export const { blockBodyScroll } = appSlice.actions;
export default appSlice.reducer;
