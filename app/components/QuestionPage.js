import QuestionActions from "./QuestionActions";
import CreateAnswer from "./CreateAnswer";
import Answers from "./Answers";

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
      </div>
      <Answers />
      <CreateAnswer question_id={question?.id} />
    </div>
  );
};

export default QuestionPage;
