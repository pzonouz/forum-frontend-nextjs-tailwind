import Files from "./components/Files";
import QuestionSection from "./components/QuestionsSection";

const Home = () => {
  return (
    <div className="flex flex-row gap-1">
      <QuestionSection className={"w-full md:w-1/2"} />
      <Files className="w-1/2 hidden md:block" />
    </div>
  );
};

export default Home;
