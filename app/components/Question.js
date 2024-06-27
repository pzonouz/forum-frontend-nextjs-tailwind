import Link from "next/link";

const Question = ({ votes, views, answers, title, author, address }) => {
  return (
    <div className="px-4 py-2 mt-1 border-b-gray-400 border-b-[1px]">
      <div className="flex flex-row items-center ">
        <div className="question_header_item">
          <p>{votes}</p>
          <p>رای</p>
        </div>
        <div className="question_header_item">
          <p>{answers}</p>
          <p>جواب</p>
        </div>
        <div className="question_header_item">
          <p>{views}</p>
          <p>بازدید</p>
        </div>
      </div>
      <Link
        href={address ? address : ""}
        className="text-blue-600 mr-6 flex flex-row text-md"
      >
        {title}
      </Link>
      <Link
        className="text-blue-500 flex flex-row-reverse"
        href={`users/${author}`}
      >
        {author}
      </Link>
    </div>
  );
};

export default Question;
