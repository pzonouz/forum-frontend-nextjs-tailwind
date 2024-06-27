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
      registerUser: builder.mutation({
        query: ({ ...user }) => ({
          url: `users/register`,
          method: "POST",
          body: user,
        }),
      }),
      loginUser: builder.mutation({
        query: ({ ...user }) => ({
          url: `users/login`,
          method: "POST",
          body: user,
        }),
      }),
    };
  },
});

export const {
  useFetchQuestionQuery,
  useRegisterUserMutation,
  useLoginUserMutation,
} = api;
export default api;
