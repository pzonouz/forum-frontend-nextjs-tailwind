import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.BACKEND_URL,
    credentials: "include",
    headers: {
      "content-type": "application/json",
    },
  }),
  tagTypes: [
    "score_question",
    "score_answer",
    "question",
    "answer",
    "user",
    "file",
  ],
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
      fetchAnswersOfUser: builder.query({
        query() {
          return `answers/current_user/`;
        },
        providesTags: ["question", "answer"],
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
      fetchAnswer: builder.query({
        query(id) {
          return `answers/${id}/`;
        },
        providesTags: ["answer"],
      }),
      fetchQuestions: builder.query({
        query(args) {
          return `questions/?limit=${args?.limit ? args?.limit : 100}&order_by=${args?.orderBy ? args?.orderBy : "created_at"}&order_direction=${args?.orderDirection ? args?.orderDirection : ""}&search_field=${args?.searchField ? args?.searchField : ""}&search_field_value=${args?.searchFieldValue ? args?.searchFieldValue : ""}`;
        },
        providesTags: ["question"],
      }),
      fetchQuestion: builder.query({
        query(id) {
          return `questions/${id}/`;
        },
        providesTags: ["question"],
      }),
      fetchQuestionsOfUser: builder.query({
        query() {
          return `questions/current_user/`;
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
      editAnswer: builder.mutation({
        query: ({ id, ...answer }) => ({
          url: `answers/${id}`,
          method: "PATCH",
          body: answer,
        }),
        invalidatesTags: ["answer", "question"],
      }),
      deleteAnswer: builder.mutation({
        query: (id) => ({
          url: `answers/${id}`,
          method: "DELETE",
        }),
        invalidatesTags: ["answer", "question"],
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
          return `scores/questions/${id}/`;
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
          return `scores/answers/${id}/`;
        },
        providesTags: ["score_answer"],
      }),
      forgetPassword: builder.mutation({
        query: (email) => ({
          url: `users/forget_password/${email}`,
          method: "GET",
        }),
        invalidatesTags: [],
      }),
      forgetPasswordCallback: builder.mutation({
        query: ({ password, token }) => ({
          url: `users/forget_password_callback/${token}/`,
          method: "POST",
          body: { password: password },
        }),
        invalidatesTags: [],
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
      editUser: builder.mutation({
        query: ({ ...user }) => ({
          url: `users/`,
          method: "PATCH",
          body: user,
        }),
        invalidatesTags: ["user"],
      }),
      logoutUser: builder.mutation({
        query: () => ({
          url: `users/logout`,
        }),
      }),
      fetchUser: builder.query({
        query() {
          return `users/`;
        },
        providesTags: ["user"],
      }),
      deleteFile: builder.mutation({
        query: (id) => ({
          url: `files/${id}`,
          method: "DELETE",
        }),
        invalidatesTags: ["file"],
      }),
      deleteFileAdmin: builder.mutation({
        query: (id) => ({
          url: `files/${id}/admin`,
          method: "DELETE",
        }),
        invalidatesTags: ["file"],
      }),
      editFile: builder.mutation({
        query: ({ id, ...file }) => ({
          url: `files/${id}`,
          method: "PATCH",
          body: file,
        }),
        invalidatesTags: ["file"],
      }),
      fetchFilesCollection: builder.query({
        query() {
          return `files/collection/`;
        },
        providesTags: ["file"],
      }),
      searchFiles: builder.mutation({
        query: (filename) => ({
          url: `files/collection/?title=${filename}`,
          method: "GET",
        }),
        providesTags: ["file"],
      }),
      fetchFiles: builder.query({
        query(data) {
          return `files/?search_field=${data?.searchField}&search_field_value=${data?.searchFieldValue}`;
        },
        providesTags: ["file"],
      }),
    };
  },
});

export const {
  useViewUpQuestionQuery,
  useFetchQuestionsQuery,
  useFetchQuestionQuery,
  useFetchQuestionsOfUserQuery,
  useFetchAnswerQuery,
  useEditQuestionMutation,
  useCreateQuestionMutation,
  useDeleteQuestionMutation,
  useRegisterUserMutation,
  useLoginUserMutation,
  useLogoutUserMutation,
  useFetchUserQuery,
  useEditUserMutation,
  useCreateScoreQuestionMutation,
  useCreateScoreAnswerMutation,
  useFetchScoreQuestionQuery,
  useFetchScoreAnswerQuery,
  useFetchAnswersOfQuestionQuery,
  useFetchAnswersOfUserQuery,
  useCreateAnswerMutation,
  useMakeAnswerSolvedMutation,
  useEditAnswerMutation,
  useDeleteAnswerMutation,
  useForgetPasswordMutation,
  useForgetPasswordCallbackMutation,
  useFetchFilesQuery,
  useFetchFilesCollectionQuery,
  useDeleteFileMutation,
  useDeleteFileAdminMutation,
  useEditFileMutation,
  useSearchFilesMutation,
} = api;
export default api;
