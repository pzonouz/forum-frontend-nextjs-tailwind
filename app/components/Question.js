import classNames from "classnames";
import Link from "next/link";

const Question = ({
  id,
  scoreCount,
  view,
  answerCount,
  title,
  userName = "ناشناس",
  createdAt,
  userId,
  solved,
}) => {
  const date = new Date(createdAt);
  const createdAtPersian = date.toLocaleString("fa-IR");
  return (
    <div className="px-4 py-2 mt-1 border-b-gray-400 border-b-[1px]">
      <div className="flex flex-row items-center ">
        <div className="question_header_item">
          <p>{scoreCount}</p>
          <p>رای</p>
        </div>
        <div
          className={classNames("question_header_item", {
            " text-green-700 bg-green-100 border-[1px] border-green-700":
              solved,
          })}
        >
          <p>{answerCount}</p>
          <p>جواب</p>
        </div>
        <div className="question_header_item">
          <p>{view}</p>
          <p>بازدید</p>
        </div>
      </div>
      <Link
        href={`/questions/${id}`}
        className="text-blue-600 flex flex-row text-md"
      >
        {title}
      </Link>
      <div className="flex items-center justify-between">
        <div className=" text-gray-400 text-sm">{createdAtPersian}</div>
        <Link
          className="text-blue-500 text-sm flex flex-row-reverse"
          href={`users/${userId}`}
        >
          {userName}
        </Link>
      </div>
    </div>
  );
};

export default Question;
