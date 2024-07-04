import React from "react";
import AnswerActions from "./AnswerActions";
import classNames from "classnames";

const Answer = (props) => {
  const { questionId, answer } = props;
  return (
    <div
      className={classNames("py-2 flex items-center px-4 gap-2", {
        "bg-green-200": answer?.solved,
      })}
    >
      <AnswerActions questionId={questionId} answer={answer} />
      <div>{answer?.description}</div>
    </div>
  );
};

export default Answer;
