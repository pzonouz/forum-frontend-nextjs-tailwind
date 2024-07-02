import React from "react";
import AnswerActions from "./AnswerActions";

const Answer = (props) => {
  return (
    <div className="py-2 flex items-center px-4 gap-2">
      <AnswerActions id={props?.answer?.id} />
      <div>{props?.answer?.description}</div>
    </div>
  );
};

export default Answer;
