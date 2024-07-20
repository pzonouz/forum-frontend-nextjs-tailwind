"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import classNames from "classnames";
import {
  useEditQuestionMutation,
  useFetchQuestionQuery,
  useFetchUserQuery,
} from "@/app/redux_toolkit/consumeAPI";
import { useEffect } from "react";
import ErrorComponent from "./ErrorComponent";
import FileUploadEdit from "./FileUploadEdit";
import { createSelector } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

const schema = z.object({
  title: z
    .string()
    .min(6, { message: "حداقل ۶ کاراکتر را وارد کنید" })
    .max(40, { message: "عنوان را کوتاهتر وارد نمایید" }),
  description: z.string().min(20, { message: "حداقل ۲۰ کاراکتر را وارد کنید" }),
});
const EditQuestion = (props) => {
  const { id } = props;
  const { data: question } = useFetchQuestionQuery(id);
  const [editQuestion, { error, isError, isSuccess }] =
    useEditQuestionMutation();
  const filesSelector = createSelector(
    (state) => state.filesReducer,
    (state) => state.items,
  );
  const files = useSelector(filesSelector);
  const onSubmit = async (data) => {
    data.files = files;
    editQuestion({ id, ...data });
  };
  const { isError: isUserError, data: user } = useFetchUserQuery();
  useEffect(() => {
    if (isSuccess) {
      window.location.href = `/questions/${id}`;
    }
  }, [isSuccess, id]);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({ values: question, resolver: zodResolver(schema) });
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col px-4 py-2 gap-2"
    >
      {isUserError ||
      (user?.id != question?.userId && user?.role != "admin") ? (
        <ErrorComponent error="نمیتوانید این سوال را ویرایش کنید" />
      ) : null}
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
      <FileUploadEdit type={"question"} id={id} />
      <p className="text-xs text-error">{errors.description?.message}</p>
      <input className="btn btn-primary" type="submit" value="ثبت" />
      {isError && (
        <p className="text-xs text-error">{JSON.stringify(error?.data)}</p>
      )}
    </form>
  );
};

export default EditQuestion;
