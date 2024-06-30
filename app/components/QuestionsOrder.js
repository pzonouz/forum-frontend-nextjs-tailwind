"use client";
import classNames from "classnames";

export const questionOrderEnum = Object.freeze({
  newest: "createdAt",
  month: "",
});
const QuestionsOrder = ({ order, setOrder }) => {
  return (
    <div className=" flex font-bold border-2 items-center justify-center w-fit mx-auto rounded-md ">
      <p
        className={classNames("topQuestionItem", {
          question_order_active: order == questionOrderEnum.newest,
        })}
        onClick={() => {
          setOrder("newest");
        }}
      >
        تازه ترین
      </p>
      <p
        className={classNames("border-r-2 topQuestionItem", {
          question_order_active: order == "hotest",
        })}
        onClick={() => {
          setOrder("hotest");
        }}
      >
        داغ ترین
      </p>
      <p
        className={classNames("border-r-2 topQuestionItem", {
          question_order_active: order == "no_answer",
        })}
        onClick={() => {
          setOrder("no_answer");
        }}
      >
        بدون جواب
      </p>
      <p
        className={classNames("border-r-2 topQuestionItem", {
          question_order_active: order == "not_solved",
        })}
        onClick={() => {
          setOrder("not_solved");
        }}
      >
        حل نشده
      </p>
    </div>
  );
};

export default QuestionsOrder;
