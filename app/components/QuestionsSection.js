"use client";
import TopQuestions from "./TopQuestions";
import QuestionsOrder from "./QuestionsOrder";
import Question from "./Question";
import Loading from "./Loading.js";
import { useEffect, useState } from "react";
import { questionOrderEnum } from "./QuestionsOrder";
import ErrorComponent from "./ErrorComponent";
import { useFetchQuestionsQuery } from "../redux_toolkit/consumeAPI";

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
      <TopQuestions />
      <QuestionsOrder order={order} setOrder={setOrderHandler} />
      <div className="mt-4">
        {isLoading ? (
          <Loading />
        ) : error ? (
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
