import { IUserSlice } from "@/services/interfaces/redux/user";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: IUserSlice = {
  userLoggedIn: false,
  userLoggingIn: false,
  productLeadRequested: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    setUserLoggedIn: (state, action: PayloadAction<boolean>) => {
      return { ...state, userLoggedIn: action.payload };
    },
    setUserLoggingIn: (state, action: PayloadAction<boolean>) => {
      return { ...state, userLoggingIn: action.payload };
    },
    updateProductLeadRequest: (
      state,
      action: PayloadAction<IUserSlice["productLeadRequested"]>
    ) => {
      return { ...state, productLeadRequested: action.payload };
    },
  },
});

export const { setUserLoggedIn, setUserLoggingIn, updateProductLeadRequest } =
  userSlice.actions;
export default userSlice.reducer;
