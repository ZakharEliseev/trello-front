import { notification } from "antd";

import { configureStore, isRejectedWithValue } from "@reduxjs/toolkit";

import { authApi } from "../Auth/api/auth";

import profileSlice from "./profileSlice";

export const rtkQueryErrorLogger = () => (next: any) => (action: any) => {
  if (isRejectedWithValue(action)) {
    notification.error({
      title: "Ошибка запроса",
      description: action.payload?.data?.title || "Что-то пошло не так",
    });
  }
  return next(action);
};

export const store = configureStore({
  reducer: {
    profile: profileSlice,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, rtkQueryErrorLogger),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
