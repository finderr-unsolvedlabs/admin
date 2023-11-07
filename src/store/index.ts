import { configureStore } from "@reduxjs/toolkit";
import loadedProductReducer from "@/store/loadedProductSlice";
import userReducer from "@/store/userSlice";
import appReducer from "@/store/appSlice";

export const store = configureStore({
  reducer: {
    loadedProducts: loadedProductReducer,
    user: userReducer,
    app: appReducer,
  },
});
