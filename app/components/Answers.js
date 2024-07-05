import Answer from "./Answer";

const Answers = async (props) => {
  const { answers, question } = props;
  return (
    <div className="p-2 flex flex-col gap-2">
      {answers?.map((answer) => (
        <Answer key={answer?.id} answer={answer} question={question} />
      ))}
    </div>
  );
};

export default Answers;
