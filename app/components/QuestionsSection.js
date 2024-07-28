"use client";
import TopQuestions from "./TopQuestions";
import QuestionsOrder from "./QuestionsOrder";
import Question from "./Question";
import { useEffect, useState } from "react";
import { questionOrderEnum } from "./QuestionsOrder";
import ErrorComponent from "./ErrorComponent";
import { useFetchQuestionsQuery } from "../redux_toolkit/consumeAPI";
import Modal from "./Modal";

export default function QuestionSection({ className }) {
  const [order, setOrder] = useState(questionOrderEnum.newest);
  const [payload, setPayload] = useState({
    orderBy: "created_at",
    orderDirection: "DESC",
  });
  const { data: questions, error, isLoading } = useFetchQuestionsQuery(payload);

  function setOrderHandler(input) {
    setOrder(input);
  }
  useEffect(() => {
    switch (order) {
      case questionOrderEnum.newest:
        setPayload({
          orderBy: questionOrderEnum.newest,
          orderDirection: "DESC",
        });
        break;
      case questionOrderEnum.hotest:
        setPayload({
          orderBy: questionOrderEnum.hotest,
          orderDirection: "DESC",
        });
        break;
      case questionOrderEnum.noAnswer:
        setPayload({
          orderBy: questionOrderEnum.newest,
          orderDirection: "ASC",
          searchField: questionOrderEnum.noAnswer,
          searchFieldValue: "=0",
        });
        break;
      case questionOrderEnum.notSolved:
        setPayload({
          orderBy: questionOrderEnum.newest,
          orderDirection: "ASC",
          searchField: questionOrderEnum.notSolved,
          searchFieldValue: "=0",
        });
        break;
    }
  }, [order]);

  return (
    <div className={className}>
      <Modal />
      <TopQuestions />
      <QuestionsOrder order={order} setOrder={setOrderHandler} />
      <div className="mt-4">
        {error ? (
          <ErrorComponent error="قطع ارتباط با سرور" />
        ) : (
          questions?.map((q) => {
            return <Question key={q.id} {...q} />;
          })
        )}
      </div>
    </div>
  );
}
