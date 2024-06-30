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
      fetchQuestions: builder.query({
        query(limit = 100, sortBy = "created_at", sortDirection = "DESC") {
          // return `questions/?limit=${limit}&sort_by=${sortBy}&sort_direction=${sortDirection}`;
          return `questions/`;
        },
      }),
      fetchQuestion: builder.query({
        query(id) {
          return `questions/${id}`;
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
  useFetchQuestionsQuery,
  useRegisterUserMutation,
  useLoginUserMutation,
  useGetUserQuery,
  useCreateQuestionMutation,
} = api;
export default api;
