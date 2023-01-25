import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { useSelector } from "react-redux";
// import { store } from "../app/store";

// function getUser() {
//   const user = useSelector((state) => state.userAuthentication.user);
//   return user;
// }
// const reduxStore = store.getState();
// console.log(reduxStore);

export const alphaTruckingApi = createApi({
  reducerPath: "alphaTruckingApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_SERVER_URL,
  }),

  // curl --location --request POST 'http://localhost/API/V1/getAllDrivers' \
  // --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InByYWR0aXlhQGFscGhhbGlvbmxvZ2lzdGljcy5jb20iLCJwYXNzd29yZCI6IjEyMzQ1IiwiaWF0IjoxNjc0NTk5NDY0fQ.3yqmTOyOIv4CNHYCEeEWMY4mCLbnOfgrA5r6IlhkIpc'
  endpoints: (builder) => ({
    GetLoad: builder.query({
      query: () => ({
        url: "/API/V1/getload",
        method: "POST",
        Authorization: `Bearer`,
      }),
    }),
    GetTrucks: builder.query({
      query: () => ({
        url: "/API/V1/getAllTrucks",
        method: "POST",
      }),
    }),
    GetDrivers: builder.query({
      query: () => ({
        url: "API/V1/getAllDrivers",
        method: "POST",
      }),
    }),
  }),
});

export const { useGetLoadQuery, useGetTrucksQuery, useGetDriversQuery } =
  alphaTruckingApi;
