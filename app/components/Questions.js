import Question from "./Question";

export const Questions = (props) => {
  const { questions } = props;
  return (
    <div className="mt-4">
      {questions?.map((q) => {
        return <Question key={q.id} {...q} />;
      })}
    </div>
  );
};
