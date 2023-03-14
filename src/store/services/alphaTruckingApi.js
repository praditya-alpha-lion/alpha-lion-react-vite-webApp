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
        // headers.set('method', 'POST');
        return headers;
      }
    },
  }),

  endpoints: (builder) => ({
    // views api endpoint

    GetBases: builder.query({
      query: () => ({
        url: '/API/V1/bases',
        method: 'POST',
      }),
    }),
    GetModel: builder.query({
      query: (tableId) => ({
        url: `/API/V1/getmodel/${tableId}`,
        method: 'POST',
      }),
    }),
    GetTableData: builder.query({
      query: (tableId) => ({
        url: `/API/V1/getdata/${tableId}`,
        method: 'POST',
      }),
    }),
    // http://localhost/API/V1/getmodel/<send table_id here>
    GetLoad: builder.query({
      query: () => ({
        url: '/API/V1/getload',
        method: 'POST',
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
        body: { model: payload },
        method: 'POST',
      }),
    }),
    // OPERATIONS API
    GetDriverRecruitmentData: builder.query({
      query: () => ({
        url: 'API/V1/getDriverRecruitmentData',
        method: 'POST',
      }),
    }),
    GetSocialMedia: builder.query({
      query: () => ({
        url: 'API/V1/getSocialMedia',
        method: 'POST',
      }),
    }),
    GetDriverHiringInstructions: builder.query({
      query: () => ({
        url: 'API/V1/getDriverHiringInstructions',
        method: 'POST',
      }),
    }),
    GetSmsViolationSummary: builder.query({
      query: () => ({
        url: 'API/V1/getSmsViolationSummary',
        method: 'POST',
      }),
    }),
    GetExaminationTickets: builder.query({
      query: () => ({
        url: 'API/V1/getExaminationTickets',
        method: 'POST',
      }),
    }),
    GetInsuranceCompany: builder.query({
      query: () => ({
        url: 'API/V1/getInsuranceCompany',
        method: 'POST',
      }),
    }),
    GetInsuranceAdjuster: builder.query({
      query: () => ({
        url: 'API/V1/getInsuranceAdjuster',
        method: 'POST',
      }),
    }),
    GetInsuranceClaims: builder.query({
      query: () => ({
        url: 'API/V1/getInsuranceClaims',
        method: 'POST',
      }),
    }),
    GetRecordableAccidents: builder.query({
      query: () => ({
        url: 'API/V1/getRecordableAccidents',
        method: 'POST',
      }),
    }),
    GetAssets: builder.query({
      query: () => ({
        url: 'API/V1/getAssets',
        method: 'POST',
      }),
    }),
    GetLossRuns: builder.query({
      query: () => ({
        url: 'API/V1/getLossRuns',
        method: 'POST',
      }),
    }),
    GetCarriers: builder.query({
      query: () => ({
        url: 'API/V1/getCarriers',
        method: 'POST',
      }),
    }),
  }),
});

export const {
  useGetRecruitmentDHTeamDataQuery,
  useGetSmsViolationSummaryQuery,
  useGetDriverHiringInstructionsQuery,
  useGetCourtClaimDataQuery,
  useGetDriverHiringFormDataQuery,
  useGetCarriersDataQuery,
  useGetCarriersQuery,
  useGetClaimsQuery,
  useGetLoadQuery,
  useGetAssetsQuery,
  useGetLossRunsQuery,
  useGetRecordableAccidentsQuery,
  useGetInsuranceClaimsQuery,
  useGetInsuranceAdjusterQuery,
  useGetInsuranceCompanyQuery,
  useGetExaminationTicketsQuery,
  useGetTrucksQuery,
  useGetDriversQuery,
  useGetTrailersQuery,
  useGetSavedViewQuery,
  useGetSocialMediaQuery,
  usePostViewsMutation,
  // |||||||||||||
  useGetBasesQuery,
  useGetModelQuery,
  useGetTableDataQuery,
} = alphaTruckingApi;
