import { IUserSlice } from "@/services/interfaces/redux/user";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: IUserSlice = {
  userLoggedIn: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    setUserLoggedIn: (state, action: PayloadAction<boolean>) => {
      return { ...state, userLoggedIn: action.payload };
    },
  },
});

export const { setUserLoggedIn } = userSlice.actions;
export default userSlice.reducer;
