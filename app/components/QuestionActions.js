"use client";
import { FaCircleChevronUp, FaCircleChevronDown } from "react-icons/fa6";
import {
  useCreateScoreQuestionMutation,
  useFetchScoreQuestionQuery,
  useFetchUserQuery,
} from "../redux_toolkit/consumeAPI";
import React, { useEffect } from "react";
import classNames from "classnames";
import { toast } from "react-toastify";

const QuestionActions = (props) => {
  const { id } = props;
  const { data: score, isError: isErrorFetch } = useFetchScoreQuestionQuery(id);
  const [createScore, { isError: isErrorCreate, error: errorCreate }] =
    useCreateScoreQuestionMutation();
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
  useEffect(() => {
    if (errorCreate?.data?.includes("Vote", "Before")) {
      toast.error(" قبلا رای شما ثبت شده است");
    }
    if (errorCreate?.data?.includes("Same", "User")) {
      toast.error("نمی توانید به سوال خود رای دهید");
    }
  }, [isErrorCreate, errorCreate]);
  return (
    <div className="relative">
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

export default QuestionActions;
