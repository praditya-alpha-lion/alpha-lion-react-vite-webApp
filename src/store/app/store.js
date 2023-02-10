import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import messageReducer from "../features/messageSlice";
import loadReducer from "../features/loadSlice";
import globalStateManagementReducer from "../features/globalStateManagementSlice";
import { alphaTruckingApi } from "../services/alphaTruckingApi";
import { setupListeners } from "@reduxjs/toolkit/query";
import authReducer from "../features/auth/authSlice";
import viewsManagementReducer from "../features/viewsManagementSlice";

const reducer = {
  [alphaTruckingApi.reducerPath]: alphaTruckingApi.reducer,
  message: messageReducer,
  load: loadReducer,
  globalState: globalStateManagementReducer,
  auth: authReducer,
  views: viewsManagementReducer,
};

export const store = configureStore({
  reducer: reducer,
  devTools:
    import.meta.env.VITE_SERVER_REDUX_TOOLKIT_VISIBILITY === "true"
      ? true
      : false,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(alphaTruckingApi.middleware),
});
setupListeners(store.dispatch);
