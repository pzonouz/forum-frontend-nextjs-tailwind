import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost/api/v1/",
    credentials: "include",
    headers: {
      "content-type": "application/json",
    },
  }),
  endpoints(builder) {
    return {
      fetchQuestion: builder.query({
        query(limit = 10) {
          return `questions/?limit=${limit}`;
        },
      }),
      createQuestion: builder.mutation({
        query: ({ ...question }) => ({
          url: `questions/`,
          method: "POST",
          body: question,
        }),
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
      getUser: builder.query({
        query() {
          return `users/`;
        },
      }),
    };
  },
});

export const {
  useFetchQuestionQuery,
  useRegisterUserMutation,
  useLoginUserMutation,
  useGetUserQuery,
  useCreateQuestionMutation,
} = api;
export default api;
