"use client";

import { useFetchAnswersOfUserQuery } from "@/app/redux_toolkit/consumeAPI";
import Link from "next/link";

export default function AnswersPage() {
  const { data: answers } = useFetchAnswersOfUserQuery();
  return (
    <div className="flex flex-col gap-1">
      {answers?.map((a) => (
        <Link
          className="text-blue-500"
          href={`/questions/${a?.questionId}`}
          key={a?.id}
        >
          {a?.description}
        </Link>
      ))}
    </div>
  );
}
