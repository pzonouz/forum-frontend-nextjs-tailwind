import React from "react";
import AnswerActions from "./AnswerActions";
import classNames from "classnames";
import Link from "next/link";

const Answer = (props) => {
  const { question, answer } = props;
  return (
    <>
      <div
        className={classNames("py-2 px-4", {
          "bg-green-200": answer?.solved,
        })}
      >
        <div className="flex items-center">
          <AnswerActions question={question} answer={answer} />
          <div>{answer?.description}</div>
        </div>
        <div className="flex items-center justify-between px-6 mt-2">
          <Link href={`/users/${question?.userId}`} className=" text-blue-600">
            {answer?.userName}
          </Link>
          <div className="flex gap-2 w-20 ml-0 mr-auto">
            <Link
              href={`/answers/${answer?.id}/edit`}
              className="text-xs text-blue-500"
            >
              ویرایش
            </Link>
            <Link
              href={`/answers/${answer?.id}/delete`}
              className="text-xs text-red-500"
            >
              حذف
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Answer;
