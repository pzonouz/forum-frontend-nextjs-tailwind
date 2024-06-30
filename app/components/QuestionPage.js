import { FaCircleChevronUp, FaCircleChevronDown } from "react-icons/fa6";
import QuestionActions from "./QuestionActions";

const QuestionPage = (props) => {
  const { question } = props;
  return (
    <div className="p-4">
      <div>
        <div className="flex items-center gap-2">
          <QuestionActions id={question?.id} />
          <div>{question?.title}</div>
        </div>
        <div className="px-6 py-2">{question?.description}</div>
      </div>
    </div>
  );
};

export default QuestionPage;
