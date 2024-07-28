"use client";
import {
  useDeleteAnswerMutation,
  useFetchAnswerQuery,
  useFetchUserQuery,
} from "@/app/redux_toolkit/consumeAPI";
import { useEffect } from "react";
import ErrorComponent from "./ErrorComponent";
import Loading from "./Loading";
import { useRouter } from "next/navigation";

const DeleteAnswer = (props) => {
  const { id } = props;
  const router = useRouter();
  const { data: answer } = useFetchAnswerQuery(id);
  const [deleteAnswer, { isLoading, isSuccess }] = useDeleteAnswerMutation();
  const { isError: isUserError, data: user } = useFetchUserQuery();
  useEffect(() => {
    if (isSuccess) {
      window.location.href = `/questions/${answer?.questionId}`;
    }
  }, [isSuccess, answer]);

  return isUserError ||
    (user?.ID != answer?.userId && user?.Role != "admin") ? (
    <ErrorComponent error="نمیتوانید این جواب را حذف کنید" />
  ) : (
    <div className=" w-screen h-screen">
      {/* {isLoading && <Loading />} */}
      <div className=" w-1/2 h-1/4 my-auto mx-auto flex items-center justify-between">
        <div
          className="btn btn-error w-20"
          onClick={() => {
            deleteAnswer(id);
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

export default DeleteAnswer;
