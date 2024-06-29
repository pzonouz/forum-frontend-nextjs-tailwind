"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import classNames from "classnames";
import {
  useCreateQuestionMutation,
  useGetUserQuery,
} from "@/app/redux_toolkit/consumeAPI";
import { useLayoutEffect } from "react";

const schema = z.object({
  title: z.string().min(6, { message: "حداقل ۶ کاراکتر را وارد کنید" }),
  description: z.string().min(6, { message: "حداقل ۶ کاراکتر را وارد کنید" }),
});
export default function CreateQuestion() {
  const [createQuestion, { error, isError, isSuccess }] =
    useCreateQuestionMutation();
  const onSubmit = async (data) => {
    createQuestion(data);
  };
  const { isError: isUserError } = useGetUserQuery();
  useLayoutEffect(() => {
    if (isUserError) {
      window.location.href = "/users/login";
    }
  }, [isUserError]);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col px-4 py-2 gap-2"
    >
      <input
        {...register("title")}
        type="text"
        className={classNames("input", { "error-border": errors?.title })}
        placeholder="عنوان سوال"
      />
      <p className="error">{errors.title?.message}</p>
      <textarea
        {...register("description")}
        className={classNames("input", { "error-border": errors?.description })}
        rows={10}
        placeholder="توضیحات سوال"
      />
      <p className="error">{errors.description?.message}</p>
      <input className="button button_primary" type="submit" value="ثبت" />
      {isError && <p className="error">{JSON.stringify(error?.data)}</p>}
      {isSuccess && <p className="success">{"با موقعیت ایجاد شد"}</p>}
    </form>
  );
}
