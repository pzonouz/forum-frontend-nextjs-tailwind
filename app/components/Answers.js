import Answer from "./Answer";

const Answers = async (props) => {
  const { questionId } = props;
  const response = await fetch(
    `http://localhost/api/v1/answers/?search_field=question_id&search_field_value=${questionId}`,
    {
      cache: "no-store",
    },
  );
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
