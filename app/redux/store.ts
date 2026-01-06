import { configureStore } from "@reduxjs/toolkit";
import searchModalReducer from "./slices/searchModalSlice";
import loginModalReducer from "./slices/loginModalSlice";
import authReducer from "./slices/authSlice";
import interestingReducer from "./slices/interestingSlice";

export const store = configureStore({
  reducer: {
    searchModal: searchModalReducer,
    auth: authReducer,
    interesting: interestingReducer,
    loginModal: loginModalReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
