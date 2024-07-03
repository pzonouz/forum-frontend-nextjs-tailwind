import QuestionActions from "./QuestionActions";
import CreateAnswer from "./CreateAnswer";
import Answers from "./Answers";
import Link from "next/link";
import ViewUpQuestion from "./ViewUpQuestion";

const QuestionPage = (props) => {
  const { question } = props;
  return (
    <div>
      <div className="p-2 border-b-2 border-gray-400">
        <div className="flex items-center gap-2">
          <QuestionActions id={question?.id} />
          <div>{question?.title}</div>
        </div>
        <div className="px-6 py-2">{question?.description}</div>
        <div className="flex gap-2 w-20 ml-0 mr-auto">
          <Link href={`${question?.id}/edit`} className="text-xs text-blue-500">
            ویرایش
          </Link>
          <Link
            href={`${question?.id}/delete`}
            className="text-xs text-red-500"
          >
            حذف
          </Link>
        </div>
      </div>
      <ViewUpQuestion id={question?.id} />
      <Answers questionId={question?.id} />
      <CreateAnswer questionId={question?.id} />
    </div>
  );
};

export default QuestionPage;
