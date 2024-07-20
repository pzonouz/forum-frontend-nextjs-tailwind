"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import classNames from "classnames";
import {
  useCreateQuestionMutation,
  useFetchUserQuery,
} from "@/app/redux_toolkit/consumeAPI";
import { useEffect, useLayoutEffect } from "react";
import FileUpload from "./FileUpload";
import { useSelector } from "react-redux";
import { createSelector } from "@reduxjs/toolkit";

const schema = z.object({
  title: z
    .string()
    .min(6, { message: "حداقل ۶ کاراکتر را وارد کنید" })
    .max(40, { message: "عنوان را کوتاهتر وارد نمایید" }),
  description: z.string().min(20, { message: "حداقل ۲۰ کاراکتر را وارد کنید" }),
});
const CreateQuestion = () => {
  const [createQuestion, { error, isError, isSuccess }] =
    useCreateQuestionMutation();
  const filesSelector = createSelector(
    (state) => state.filesReducer,
    (state) => state.items,
  );
  const files = useSelector(filesSelector);
  const onSubmit = async (data) => {
    data.files = files;
    createQuestion(data);
  };
  const { isError: isUserError } = useFetchUserQuery();
  useLayoutEffect(() => {
    if (isUserError) {
      window.location.href = "/users/login?callback=/questions/create_question";
    }
  }, [isUserError]);
  useEffect(() => {
    if (isSuccess) {
      window.location.href = "/";
    }
  }, [isSuccess]);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col px-4 py-2 gap-2 max-w-lg mx-auto mt-6"
    >
      <input
        {...register("title")}
        type="text"
        className={classNames("input input-bordered", {
          "input-error": errors?.title,
        })}
        placeholder="عنوان سوال"
      />
      <p className="text-xs text-error">{errors.title?.message}</p>
      <textarea
        {...register("description")}
        className={classNames("input input-bordered", {
          "input-error": errors?.description,
        })}
        rows={10}
        placeholder="توضیحات سوال"
      />
      <p className="text-xs text-error">{errors.description?.message}</p>
      <FileUpload />
      <input className="btn btn-primary" type="submit" value="ثبت" />
      {isError && (
        <p className="text-xs text-error">{JSON.stringify(error?.data)}</p>
      )}
    </form>
  );
};

export default CreateQuestion;
