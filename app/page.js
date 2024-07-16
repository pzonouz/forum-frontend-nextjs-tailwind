"use client";
import TopQuestions from "./components/TopQuestions";
import QuestionsOrder from "./components/QuestionsOrder";
import Question from "./components/Question";
import Loading from "./components/Loading.js";
import { useEffect, useState } from "react";
import { useFetchQuestionsQuery } from "./redux_toolkit/consumeAPI";
import { questionOrderEnum } from "./components/QuestionsOrder";
import ErrorComponent from "./components/ErrorComponent";
import Files from "./components/Files";

export default function Home() {
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
    <div className="flex flex-row-reverse gap-1">
      <Files className="w-1/2 hidden md:block " />
      <div className="w-full md:w-1/2">
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
    </div>
  );
}
