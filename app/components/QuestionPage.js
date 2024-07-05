import QuestionActions from "./QuestionActions";
import CreateAnswer from "./CreateAnswer";
import Answers from "./Answers";
import Link from "next/link";
import ViewUpQuestion from "./ViewUpQuestion";
import { FaCheck } from "react-icons/fa";
import classNames from "classnames";

const QuestionPage = async (props) => {
  const { question } = props;
  let solved = false;
  const response = await fetch(
    `http://localhost/api/v1/answers/?search_field=question_id&search_field_value=${question?.id}`,
    {
      cache: "no-store",
    },
  );
  const answers = await response.json();

  answers?.map((ans) => {
    if (ans?.solved == true) {
      solved = true;
    }
  });
  return (
    <div>
      <div className="p-2 border-b-2 border-gray-400">
        <div>
          <div className="flex items-center gap-2">
            <FaCheck
              className={classNames({
                "text-green-700": solved,
                "text-gray-200": !solved,
              })}
            />
            <QuestionActions id={question?.id} />
            <div>{question?.title}</div>
          </div>
          <div className="mr-10">
            <div className="mr-3">{question?.description}</div>
            <div className="flex items-center justify-between mt-2">
              <Link
                href={`/users/${question?.userId}`}
                className=" text-blue-600"
              >
                {question?.userName}
              </Link>
              <div className="flex gap-2 w-20 ml-0 mr-auto">
                <Link
                  href={`${question?.id}/edit`}
                  className="text-xs text-blue-500"
                >
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
          </div>
        </div>
      </div>
      <ViewUpQuestion id={question?.id} />
      <Answers question={question} answers={answers} />
      <CreateAnswer questionId={question?.id} />
    </div>
  );
};

export default QuestionPage;
