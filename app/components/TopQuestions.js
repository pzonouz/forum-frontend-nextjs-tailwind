import Link from "next/link";

const TopQuestions = () => {
  return (
    <div>
      <div className="flex items-center justify-between p-4">
        <h1 className="font-bold">سوالات برتر</h1>
        <Link href={"/questions/create_question"} className="btn btn-primary">
          طرح سوال
        </Link>
      </div>
    </div>
  );
};

export default TopQuestions;
