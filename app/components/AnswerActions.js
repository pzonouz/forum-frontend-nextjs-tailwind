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

const AnswerActions = (props) => {
  const { answer, questionId } = props;
  const id = answer?.id;
  const router = useRouter();
  const { data: score, isError: isErrorFetch } = useFetchScoreAnswerQuery(id);
  const [createScore, { isError: isErrorCreate }] =
    useCreateScoreAnswerMutation();
  const { isSuccess: loggedIn } = useFetchUserQuery();
  const [makeAnswerSolved, { isSuccess }] = useMakeAnswerSolvedMutation();
  useEffect(() => {
    if (isSuccess) {
      router.refresh();
    }
  }, [isSuccess, router]);
  const upClickHandler = () => {
    if (!loggedIn) {
      window.location.href = `/users/login?callback=/questions/${questionId}`;
      return;
    }
    const data = { id, operator: "plus" };
    createScore(data);
  };
  const downClickHandler = () => {
    if (!loggedIn) {
      window.location.href = `/users/login?callback=/questions/${questionId}`;
      return;
    }
    const data = { id, operator: "minus" };
    createScore(data);
  };
  return (
    <div className="relative flex items-center">
      <FaCheck
        onClick={() => {
          makeAnswerSolved(id);
        }}
        className={classNames("cursor-pointer hover:text-green-700", {
          "text-green-700": answer?.solved,
          "text-gray-200": !answer?.solved,
        })}
      />
      <div>
        {isErrorCreate && (
          <p className="error absolute w-48">قبلا رای شما ثبت شده است</p>
        )}
        <div
          className={classNames(
            "flex flex-col items-center justify-around gap-1",
            { "mt-2": isErrorCreate },
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
