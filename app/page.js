import Link from "next/link";
import QuestionSection from "./components/QuestionsSection";

const Home = () => {
  return (
    <div className="w-full">
      <div className="text-center max-w-md mx-auto my-4">
        <Link href="/files" className="btn btn-success text-white ">
          ورد به بخش نقشه و فایهای بیکد و ریمپ انواع ایسیو ها
        </Link>
      </div>
      {/* <div className="text-center max-w-md mx-auto my-4"> */}
      {/*   <div className="btn btn-error text-white "> */}
      {/*     ورود به بخش کلاس های آموزشی رایگان(به زودی) */}
      {/*   </div> */}
      {/* </div> */}
      <QuestionSection />
    </div>
  );
};

export default Home;
