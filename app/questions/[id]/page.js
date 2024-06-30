import QuestionPage from "@/app/components/QuestionPage";

const Page = async ({ params: { id } }) => {
  const res = await fetch(`http://localhost/api/v1/questions/${id}`);
  const question = await res.json();
  return <QuestionPage question={question} />;
};
export default Page;
