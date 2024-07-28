"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import classNames from "classnames";
import {
  useEditAnswerMutation,
  useFetchAnswerQuery,
  useFetchUserQuery,
} from "@/app/redux_toolkit/consumeAPI";
import { useEffect } from "react";
import ErrorComponent from "./ErrorComponent";
import FileUploadEdit from "./FileUploadEdit";
import { createSelector } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

const schema = z.object({
  description: z.string().min(5, { message: "حداقل ۵ کاراکتر را وارد کنید" }),
});
const EditAnswer = (props) => {
  const { id } = props;
  const { data: answer } = useFetchAnswerQuery(id);
  const [editAnswer, { error, isError, isSuccess }] = useEditAnswerMutation();
  const filesSelector = createSelector(
    (state) => state.filesReducer,
    (state) => state.items,
  );
  const files = useSelector(filesSelector);
  const onSubmit = async (data) => {
    data.files = files;
    editAnswer({ id, ...data });
  };
  const { isError: isUserError, data: user } = useFetchUserQuery();

  useEffect(() => {
    if (isSuccess) {
      window.location.href = `/questions/${answer?.questionId}`;
    }
  }, [answer?.questionId, isSuccess]);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({ values: answer, resolver: zodResolver(schema) });
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col px-4 py-2 gap-2"
    >
      {isUserError || (user?.ID != answer?.userId && user?.Role != "admin") ? (
        <ErrorComponent error="نمیتوانید این سوال را ویرایش کنید" />
      ) : null}
      <textarea
        {...register("description")}
        className={classNames("input input-bordered", {
          "input-error": errors?.description,
        })}
        rows={10}
        placeholder="توضیحات سوال"
      />
      <FileUploadEdit type={"answer"} id={answer?.id} />
      <p className="text-xs text-error">{errors.description?.message}</p>
      <input className="btn btn-primary" type="submit" value="ثبت" />
      {isError && (
        <p className="text-xs text-error">{JSON.stringify(error?.data)}</p>
      )}
    </form>
  );
};

export default EditAnswer;
