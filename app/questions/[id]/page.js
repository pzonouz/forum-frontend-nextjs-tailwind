import QuestionPage from "@/app/components/QuestionPage";

const Page = async ({ params: { id } }) => {
  const resQuestion = await fetch(`http://localhost/api/v1/questions/${id}`, {
    cache: "no-store",
  });
  const question = await resQuestion.json();

  return <QuestionPage question={question} />;
};
export default Page;
