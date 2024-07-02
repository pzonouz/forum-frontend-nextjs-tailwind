import Answer from "./Answer";

const Answers = async () => {
  const response = await fetch("http://localhost/api/v1/answers/");
  const answers = await response.json();
  return (
    <div className="p-2 flex flex-col gap-2">
      {answers?.map((answer) => (
        <Answer key={answer?.id} answer={answer} />
      ))}
    </div>
  );
};

export default Answers;
