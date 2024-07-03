"use client";
import classNames from "classnames";
import {
  useDeleteQuestionMutation,
  useFetchQuestionQuery,
  useFetchUserQuery,
} from "@/app/redux_toolkit/consumeAPI";
import { useEffect } from "react";
import ErrorComponent from "./ErrorComponent";
import Loading from "./Loading";
import { useRouter } from "next/navigation";

const DeleteQuestion = (props) => {
  const { id } = props;
  const router = useRouter();
  const { data: question } = useFetchQuestionQuery(id);
  const [deleteQuestion, { isLoading, isSuccess }] =
    useDeleteQuestionMutation();
  const { isError: isUserError, data: user } = useFetchUserQuery();
  useEffect(() => {
    if (isSuccess) {
      window.location.href = `/`;
    }
  }, [isSuccess, id]);

  return isUserError ||
    (user?.id != question?.userId && user?.role != "admin") ? (
    <ErrorComponent error="نمیتوانید این سوال را حذف کنید" />
  ) : (
    <div className=" w-screen h-screen">
      {isLoading && <Loading />}
      <div className=" w-1/2 h-1/4 my-auto mx-auto flex items-center justify-between">
        <div
          className="button button_error w-20"
          onClick={() => {
            deleteQuestion(id);
          }}
        >
          حذف
        </div>
        <div
          className="button button_natural w-20"
          onClick={() => router.back()}
        >
          لغو
        </div>
      </div>
    </div>
  );
};

export default DeleteQuestion;
