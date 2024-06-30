"use client";
import TopQuestions from "./components/TopQuestions";
import QuestionsOrder from "./components/QuestionsOrder";
import Question from "./components/Question";
import Loading from "./components/Loading.js";
import { useState } from "react";
import { useFetchQuestionsQuery } from "./redux_toolkit/consumeAPI";
import { questionOrderEnum } from "./components/QuestionsOrder";

export default function Home() {
  const [order, setOrder] = useState(questionOrderEnum.newest);
  const { data: questions, error, isLoading } = useFetchQuestionsQuery();

  function setOrderHandler(input) {
    setOrder(input);
  }

  return (
    <div>
      <TopQuestions />
      <QuestionsOrder order={order} setOrder={setOrderHandler} />
      <div className="mt-4">
        {isLoading ? (
          <Loading />
        ) : error ? (
          <div>Error</div>
        ) : (
          questions?.map((q) => {
            return <Question key={q.id} {...q} />;
          })
        )}
      </div>
    </div>
  );
}
