"use client";
import { FaCircleChevronUp, FaCircleChevronDown } from "react-icons/fa6";

const QuestionActions = (props) => {
  const { id } = props;
  return (
    <div className="flex flex-col items-center justify-around gap-1">
      <FaCircleChevronUp />
      <p>1</p>
      <FaCircleChevronDown />
    </div>
  );
};

export default QuestionActions;
