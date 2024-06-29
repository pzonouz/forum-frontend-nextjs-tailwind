import Link from "next/link";
import { useGetUserQuery } from "../redux_toolkit/consumeAPI";

const TopQuestions = () => {
  const { isError } = useGetUserQuery();
  return (
    <div>
      <div className="flex items-center justify-between p-4">
        <div className="font-bold">سوالات برتر</div>
        <Link
          href={isError ? "/users/login" : "/questions/create_question"}
          className="button button_primary"
        >
          طرح سوال
        </Link>
      </div>
    </div>
  );
};

export default TopQuestions;
