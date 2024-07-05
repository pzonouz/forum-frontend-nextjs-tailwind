"use client";
import classNames from "classnames";

export const questionOrderEnum = Object.freeze({
  newest: "created_at",
  hotest: "view_count",
  noAnswer: "answer_count",
  notSolved: "solved",
});
const QuestionsOrder = ({ order, setOrder }) => {
  return (
    <div className=" flex font-bold border-2 items-center justify-center w-fit mx-auto rounded-md ">
      <p
        className={classNames("topQuestionItem", {
          question_order_active: order == questionOrderEnum.newest,
        })}
        onClick={() => {
          setOrder(questionOrderEnum.newest);
        }}
      >
        تازه ترین
      </p>
      <p
        className={classNames("border-r-2 topQuestionItem", {
          question_order_active: order == questionOrderEnum.hotest,
        })}
        onClick={() => {
          setOrder(questionOrderEnum.hotest);
        }}
      >
        داغ ترین
      </p>
      <p
        className={classNames("border-r-2 topQuestionItem", {
          question_order_active: order == questionOrderEnum.noAnswer,
        })}
        onClick={() => {
          setOrder(questionOrderEnum.noAnswer);
        }}
      >
        بدون جواب
      </p>
      <p
        className={classNames("border-r-2 topQuestionItem", {
          question_order_active: order == questionOrderEnum.notSolved,
        })}
        onClick={() => {
          setOrder(questionOrderEnum.notSolved);
        }}
      >
        حل نشده
      </p>
    </div>
  );
};

export default QuestionsOrder;
