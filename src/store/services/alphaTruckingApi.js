import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const alphaTruckingApi = createApi({
  reducerPath: 'alphaTruckingApi',
  baseQuery: fetchBaseQuery({
    // base url of backend API
    baseUrl: import.meta.env.VITE_SERVER_URL,
    // prepareHeaders is used to configure the header of every request and gives access to getState which we use to include the token from the store
    prepareHeaders: (headers, state) => {
      const token = state.getState().auth?.userInfo?.user_token;
      if (token) {
        // include token in req header
        headers.set('authorization', `Bearer ${token}`);
        return headers;
      }
    },
  }),

  endpoints: (builder) => ({
    GetLoad: builder.query({
      query: () => ({
        url: '/API/V1/getload',
        method: 'POST',
        Authorization: `Bearer`,
      }),
    }),
    GetTrucks: builder.query({
      query: () => ({
        url: '/API/V1/getAllTrucks',
        method: 'POST',
      }),
    }),
    GetDrivers: builder.query({
      query: () => ({
        url: 'API/V1/getAllDrivers',
        method: 'POST',
      }),
    }),
    GetTrailers: builder.query({
      query: () => ({
        url: 'API/V1/getAllTrailers',
        method: 'POST',
      }),
    }),
    GetSavedView: builder.query({
      query: () => ({
        url: 'API/V1/getsavedviewmodel',
        method: 'POST',
      }),
    }),
    GetClaims: builder.query({
      query: () => ({
        url: 'API/V1/getClaimsData',
        method: 'POST',
      }),
    }),
    GetRecruitmentDHTeamData: builder.query({
      query: () => ({
        url: 'API/V1/GetRecruitmentDHTeamData',
        method: 'POST',
      }),
    }),
    GetCourtClaimData: builder.query({
      query: () => ({
        url: 'API/V1/GetCourtClaimData',
        method: 'POST',
      }),
    }),
    GetDriverHiringFormData: builder.query({
      query: () => ({
        url: 'API/V1/getDriverHiringFormData',
        method: 'POST',
      }),
    }),
    GetCarriersData: builder.query({
      query: () => ({
        url: 'API/V1/getCarriersData',
        method: 'POST',
      }),
    }),
    PostViews: builder.mutation({
      query: (payload) => ({
        url: 'API/V1/changesaved',
        method: 'POST',
        body: { model: payload },
      }),
    }),
  }),
});

export const {
  useGetRecruitmentDHTeamDataQuery,
  useGetCourtClaimDataQuery,
  useGetDriverHiringFormDataQuery,
  useGetCarriersDataQuery,
  useGetClaimsQuery,
  useGetLoadQuery,
  useGetTrucksQuery,
  useGetDriversQuery,
  useGetTrailersQuery,
  useGetSavedViewQuery,
  usePostViewsMutation,
} = alphaTruckingApi;
