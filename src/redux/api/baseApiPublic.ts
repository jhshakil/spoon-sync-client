import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApiPublic = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.BASE_URL,
  }),
  tagTypes: [],
  endpoints: () => ({}),
});
