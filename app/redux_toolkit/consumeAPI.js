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
      viewUpQuestion: builder.query({
        query(id) {
          return `questions/${id}/view_up`;
        },
        invalidatesTags: ["question", "answer"],
      }),
      makeAnswerSolved: builder.mutation({
        query: (id) => ({
          url: `answers/${id}/solved`,
          method: "POST",
        }),
        invalidatesTags: ["answer", "question"],
      }),
      createAnswer: builder.mutation({
        query: ({ questionId, ...question }) => ({
          url: `answers/${questionId}`,
          method: "POST",
          body: question,
        }),
        invalidatesTags: ["answer", "question"],
      }),
      fetchAnswersOfQuestion: builder.query({
        query(
          questionId,
          limit = 100,
          orderBy = "created_at",
          orderDirection = "DESC",
        ) {
          return `answers/${questionId}/?limit=${limit}&sort_by=${orderBy}&sort_direction=${orderDirection}`;
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
        query(args) {
          return `questions/?limit=${args?.limit ? args?.limit : 100}&order_by=${args?.orderBy ? args?.orderBy : "created_at"}&order_direction=${args?.orderDirection ? args?.orderDirection : ""}&search_field=${args?.searchField ? args?.searchField : ""}&search_field_value=${args?.searchFieldValue ? args?.searchFieldValue : ""}`;
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
        invalidatesTags: ["score_question", "question"],
      }),
      fetchScoreQuestion: builder.query({
        query(id) {
          return `scores/questions/${id}`;
        },
        providesTags: ["score_question", "question"],
      }),
      createScoreAnswer: builder.mutation({
        query: ({ id, ...payload }) => ({
          url: `scores/answers/${id}`,
          method: "POST",
          body: payload,
        }),
        invalidatesTags: ["score_answer", "answer", "question"],
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
  useViewUpQuestionQuery,
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
  useMakeAnswerSolvedMutation,
} = api;
export default api;
