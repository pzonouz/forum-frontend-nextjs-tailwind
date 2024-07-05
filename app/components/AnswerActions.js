"use client";
import { FaCircleChevronUp, FaCircleChevronDown } from "react-icons/fa6";
import {
  useCreateScoreAnswerMutation,
  useFetchAnswersOfQuestionQuery,
  useFetchScoreAnswerQuery,
  useFetchUserQuery,
  useMakeAnswerSolvedMutation,
} from "../redux_toolkit/consumeAPI";
import React, { useEffect } from "react";
import classNames from "classnames";
import { FaCheck } from "react-icons/fa";
import { useRouter } from "next/navigation";
import Loading from "./Loading";
import { toast } from "react-toastify";

const AnswerActions = (props) => {
  const { answer, question } = props;
  const id = answer?.id;
  const router = useRouter();
  const {
    data: score,
    isError: isErrorFetch,
    isLoading: scoreLoading,
  } = useFetchScoreAnswerQuery(id);
  const [
    createScore,
    {
      isError: isErrorCreate,
      error: errorCreate,
      isLoading: createScoreLoading,
    },
  ] = useCreateScoreAnswerMutation();
  const { data: user, isSuccess: loggedIn } = useFetchUserQuery();
  const [
    makeAnswerSolved,
    { isSuccess, isLoading: markSolvedLoading, error: markSolvedError },
  ] = useMakeAnswerSolvedMutation();
  useEffect(() => {
    if (isSuccess) {
      router.refresh();
    }
  }, [isSuccess, router]);
  useEffect(() => {
    if (errorCreate?.data?.includes("Vote", "Before")) {
      toast.error(" قبلا رای شما ثبت شده است");
    }
    if (errorCreate?.data?.includes("Same", "User")) {
      toast.error("نمی توانید به جواب خود رای دهید");
    }
  }, [isErrorCreate, errorCreate]);

  useEffect(() => {
    toast.error(markSolvedError?.data);
  }, [markSolvedError]);
  const upClickHandler = () => {
    if (!loggedIn) {
      window.location.href = `/users/login?callback=/questions/${question?.id}`;
      return;
    }
    const data = { id, operator: "plus" };
    createScore(data);
  };
  const downClickHandler = () => {
    if (!loggedIn) {
      window.location.href = `/users/login?callback=/questions/${question?.id}`;
      return;
    }
    const data = { id, operator: "minus" };
    createScore(data);
  };
  return (
    <div className="relative flex items-center">
      {(scoreLoading || createScoreLoading || markSolvedLoading) && <Loading />}
      {user?.id == question?.userId && (
        <FaCheck
          onClick={() => {
            makeAnswerSolved(id);
          }}
          className={classNames("cursor-pointer hover:text-green-700", {
            "text-green-700": answer?.solved,
            "text-gray-200": !answer?.solved,
          })}
        />
      )}
      <div>
        <div
          className={classNames(
            "flex flex-col items-center justify-around gap-1",
          )}
        >
          <FaCircleChevronUp
            className="text-xl cursor-pointer text-gray-500"
            onClick={upClickHandler}
          />
          <div>
            <p className="text-black">
              {isErrorFetch ? "error" : score?.score}
            </p>
          </div>
          <FaCircleChevronDown
            className="text-xl cursor-pointer text-gray-500"
            onClick={downClickHandler}
          />
        </div>
      </div>
    </div>
  );
};

export default AnswerActions;
