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

const CreateAnswer = (props) => {
  const { isSuccess } = useFetchUserQuery();
  const [createAnswer, { isLoading }] = useCreateAnswerMutation();
  const { question_id } = props;
  const schema = z.object({
    description: z.string().min(5, { message: "حداقل ۵ کاراکتر وارد نمایید" }),
  });
  const createAnswerHandler = (data) => {
    createAnswer({
      question_id,
      ...data,
    });
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });
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
