import QuestionPage from "@/app/components/QuestionPage";

const Page = async ({ params: { id } }) => {
  const resQuestion = await fetch(
    `${process.env.BACKEND_URL}/questions/${id}/`,
    {
      cache: "no-store",
    },
  );
  const question = await resQuestion.json();

  return <QuestionPage question={question} />;
};
export default Page;
