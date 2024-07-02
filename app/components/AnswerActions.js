"use client";
import { FaCircleChevronUp, FaCircleChevronDown } from "react-icons/fa6";
import {
  useCreateScoreAnswerMutation,
  useFetchAnswersOfQuestionQuery,
  useFetchScoreAnswerQuery,
  useFetchUserQuery,
} from "../redux_toolkit/consumeAPI";
import React from "react";
import classNames from "classnames";

const AnswerActions = (props) => {
  const { id } = props;
  const { data: score, isError: isErrorFetch } = useFetchScoreAnswerQuery(id);
  const [createScore, { isError: isErrorCreate }] =
    useCreateScoreAnswerMutation();
  const { isSuccess: loggedIn } = useFetchUserQuery();
  const upClickHandler = () => {
    if (!loggedIn) {
      window.location.href = `/users/login?callback=/questions/${id}`;
      return;
    }
    const data = { id, operator: "plus" };
    createScore(data);
  };
  const downClickHandler = () => {
    if (!loggedIn) {
      window.location.href = `/users/login?callback=/questions/${id}`;
      return;
    }
    const data = { id, operator: "minus" };
    createScore(data);
  };
  return (
    <div className="relative">
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
          <p className="text-black">{isErrorFetch ? "error" : score?.score}</p>
        </div>
        <FaCircleChevronDown
          className="text-xl cursor-pointer text-gray-500"
          onClick={downClickHandler}
        />
      </div>
    </div>
  );
};

export default AnswerActions;
