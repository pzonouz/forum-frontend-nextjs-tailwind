"use client";

import { useFetchQuestionOfUserQuery } from "@/app/redux_toolkit/consumeAPI";
import Link from "next/link";

export default function QuestionsPage() {
  const { data: questions } = useFetchQuestionOfUserQuery();
  return (
    <div className="flex flex-col gap-1">
      {questions?.map((q) => (
        <Link
          className="text-blue-500"
          href={`/questions/${q?.key}`}
          key={q?.id}
        >
          {q?.title}
        </Link>
      ))}
    </div>
  );
}
