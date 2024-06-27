import Link from "next/link";
import React from "react";

const TopQuestions = () => {
  return (
    <div>
      <div className="flex items-center justify-between p-4">
        <div className="font-bold">سوالات برتر</div>
        <Link href="/create_question" className="button button_primary">
          طرح سوال
        </Link>
      </div>
    </div>
  );
};

export default TopQuestions;
