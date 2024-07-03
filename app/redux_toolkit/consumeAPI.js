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
  tagTypes: ["score_question", "score_answer", "question", "answer"],
  endpoints(builder) {
    return {
      createAnswer: builder.mutation({
        query: ({ questionId, ...question }) => ({
          url: `answers/${questionId}`,
          method: "POST",
          body: question,
        }),
        invalidatesTags: ["answer"],
      }),
      fetchAnswersOfQuestion: builder.query({
        query(
          question_id,
          limit = 100,
          sortBy = "created_at",
          sortDirection = "DESC",
        ) {
          return `answers/${question_id}/?limit=${limit}&sort_by=${sortBy}&sort_direction=${sortDirection}`;
        },
        providesTags: ["answer"],
      }),
      fetchQuestion: builder.query({
        query(id) {
          return `questions/${id}`;
        },
        providesTags: ["question"],
      }),
      fetchQuestions: builder.query({
        query(limit = 100, sortBy = "created_at", sortDirection = "DESC") {
          return `questions/?limit=${limit}&sort_by=${sortBy}&sort_direction=${sortDirection}`;
        },
        providesTags: ["question"],
      }),
      fetchQuestion: builder.query({
        query(id) {
          return `questions/${id}`;
        },
        providesTags: ["question"],
      }),
      createQuestion: builder.mutation({
        query: ({ ...question }) => ({
          url: `questions/`,
          method: "POST",
          body: question,
        }),
        invalidatesTags: ["question"],
      }),
      editQuestion: builder.mutation({
        query: ({ id, ...question }) => ({
          url: `questions/${id}`,
          method: "PATCH",
          body: question,
        }),
        invalidatesTags: ["question"],
      }),
      deleteQuestion: builder.mutation({
        query: (id) => ({
          url: `questions/${id}`,
          method: "DELETE",
        }),
        invalidatesTags: ["question"],
      }),

      createScoreQuestion: builder.mutation({
        query: ({ id, ...payload }) => ({
          url: `scores/questions/${id}`,
          method: "POST",
          body: payload,
        }),
        invalidatesTags: ["score_question"],
      }),
      fetchScoreQuestion: builder.query({
        query(id) {
          return `scores/questions/${id}`;
        },
        providesTags: ["score_question"],
      }),
      createScoreAnswer: builder.mutation({
        query: ({ id, ...payload }) => ({
          url: `scores/answers/${id}`,
          method: "POST",
          body: payload,
        }),
        invalidatesTags: ["score_answer"],
      }),
      fetchScoreAnswer: builder.query({
        query(id) {
          return `scores/answers/${id}`;
        },
        providesTags: ["score_answer"],
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
      fetchUser: builder.query({
        query() {
          return `users/`;
        },
      }),
    };
  },
});

export const {
  useFetchQuestionsQuery,
  useFetchQuestionQuery,
  useEditQuestionMutation,
  useCreateQuestionMutation,
  useDeleteQuestionMutation,
  useRegisterUserMutation,
  useLoginUserMutation,
  useFetchUserQuery,
  useCreateScoreQuestionMutation,
  useCreateScoreAnswerMutation,
  useFetchScoreQuestionQuery,
  useFetchScoreAnswerQuery,
  useFetchAnswersOfQuestionQuery,
  useCreateAnswerMutation,
} = api;
export default api;
