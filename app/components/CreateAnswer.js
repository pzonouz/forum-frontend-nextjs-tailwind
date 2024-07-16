"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import classNames from "classnames";
import ErrorComponent from "./ErrorComponent";
import {
  useCreateAnswerMutation,
  useFetchUserQuery,
} from "../redux_toolkit/consumeAPI";
import Loading from "./Loading";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const CreateAnswer = (props) => {
  const { isSuccess } = useFetchUserQuery();
  const router = useRouter();
  const [createAnswer, { isLoading, isSuccess: isSuccessAnswers }] =
    useCreateAnswerMutation();
  const { questionId } = props;
  const schema = z.object({
    description: z.string().min(5, { message: "حداقل ۵ کاراکتر وارد نمایید" }),
  });
  const createAnswerHandler = (data) => {
    createAnswer({
      questionId,
      ...data,
    });
  };
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    if (isSuccessAnswers) {
      router.refresh();
      reset();
    }
  }, [isSuccessAnswers, router, reset]);
  return (
    <div>
      {!isSuccess && <ErrorComponent error="برای مشارکت لطفا وارد شوید" />}
      <form
        onSubmit={handleSubmit(createAnswerHandler)}
        className="w-full p-4 flex flex-col gap-2 relative"
      >
        <textarea
          className={classNames(
            "border-[1px] outline-none p-2 rounded-md w-full border-gray-400",
            { "border-red-600": errors?.description?.message },
          )}
          rows={10}
          {...register("description")}
        ></textarea>
        {errors?.description && (
          <p className="text-xs text-error">{errors?.description?.message}</p>
        )}
        <button className="btn btn-primary flex">
          <div>ثبت</div>
          {isLoading && <p className="loading loading-spinner"></p>}
        </button>
      </form>
    </div>
  );
};

export default CreateAnswer;
