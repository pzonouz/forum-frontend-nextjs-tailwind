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

const schema = z.object({
  description: z.string().min(5, { message: "حداقل ۵ کاراکتر را وارد کنید" }),
});
const EditAnswer = (props) => {
  const { id } = props;
  const { data: answer } = useFetchAnswerQuery(id);
  const [editAnswer, { error, isError, isSuccess }] = useEditAnswerMutation();
  const onSubmit = async (data) => {
    editAnswer({ id, ...data });
  };
  const { isError: isUserError, data: user } = useFetchUserQuery();
  useEffect(() => {
    if (isSuccess) {
      window.location.href = `/questions/${answer?.questionId}`;
    }
  }, [isSuccess]);

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
      {isUserError || (user?.id != answer?.userId && user?.role != "admin") ? (
        <ErrorComponent error="نمیتوانید این سوال را ویرایش کنید" />
      ) : null}
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
};

export default EditAnswer;
