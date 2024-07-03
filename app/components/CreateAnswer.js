"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import classNames from "classnames";
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
    <>
      {isSuccess && (
        <form
          onSubmit={handleSubmit(createAnswerHandler)}
          className="w-full p-4 flex flex-col gap-2"
        >
          {isLoading && <Loading />}
          <textarea
            className={classNames(
              "border-[1px] outline-none p-2 rounded-md w-full border-gray-400",
              { "border-red-600": errors?.answer?.message },
            )}
            rows={10}
            {...register("description")}
          ></textarea>
          {errors?.answer && <p className="error">{errors?.answer?.message}</p>}
          <button className="button button_primary">ثبت</button>
        </form>
      )}
    </>
  );
};

export default CreateAnswer;
