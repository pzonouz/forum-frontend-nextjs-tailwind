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
    (user?.ID != question?.userId && user?.Role != "admin") ? (
    <ErrorComponent error="نمیتوانید این سوال را حذف کنید" />
  ) : (
    <div className="mt-12 ">
      {/* {isLoading && <Loading />} */}
      <div className=" w-1/2 h-1/4 my-auto mx-auto flex items-center justify-between">
        <div
          className="btn btn-error w-20"
          onClick={() => {
            deleteQuestion(id);
          }}
        >
          حذف
        </div>
        <div className="btn btn-natural w-20" onClick={() => router.back()}>
          لغو
        </div>
      </div>
    </div>
  );
};

export default DeleteQuestion;
