import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import messageReducer from "../features/messageSlice";
import loadReducer from "../features/loadSlice";
import globalStateManagementReducer from "../features/globalStateManagementSlice";
import userAuthenticationReducer from "../features/userAuthenticationSlice";
import { alphaTruckingApi } from "../services/alphaTruckingApi";
import { setupListeners } from "@reduxjs/toolkit/query";

import authReducer from "../features/authSlice";
import messageAuthReducer from "../features/messageAuth";

const reducer = {
  [alphaTruckingApi.reducerPath]: alphaTruckingApi.reducer,
  message: messageReducer,
  load: loadReducer,
  globalStateManagement: globalStateManagementReducer,
  userAuthentication: userAuthenticationReducer,
  authSlice: authReducer,
  messageAuth: messageAuthReducer,
};

export const store = configureStore({
  reducer: reducer,
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(alphaTruckingApi.middleware),
});
setupListeners(store.dispatch);
