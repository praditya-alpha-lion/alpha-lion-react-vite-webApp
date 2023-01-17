import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const alphaTruckingApi = createApi({
  reducerPath: "alphaTruckingApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_SERVER_URL,
  }),

  endpoints: (builder) => ({
    GetLoad: builder.query({
      query: () => ({
        url: "/API/V1/getload",
        method: "POST",
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
