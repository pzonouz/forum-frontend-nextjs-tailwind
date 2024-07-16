import Link from "next/link";

const TopQuestions = () => {
  return (
    <div>
      <div className="flex items-center justify-between p-4">
        <div className="font-bold">سوالات برتر</div>
        <Link href={"/questions/create_question"} className="btn btn-primary">
          طرح سوال
        </Link>
      </div>
    </div>
  );
};

export default TopQuestions;
