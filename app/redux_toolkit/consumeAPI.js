import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost/api/v1/",
    credentials: "include",
  }),
  endpoints(builder) {
    return {
      fetchQuestion: builder.query({
        query(limit = 10) {
          return `questions/?limit=${limit}`;
        },
      }),
    };
  },
});

export const { useFetchQuestionQuery } = api;
export default api;
