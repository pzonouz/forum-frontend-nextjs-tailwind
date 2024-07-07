"use client";
import { MdDashboard } from "react-icons/md";
import { BsFillQuestionSquareFill } from "react-icons/bs";
import { RiQuestionAnswerFill } from "react-icons/ri";
import { usePathname } from "next/navigation";
import classNames from "classnames";
import Link from "next/link";

export default function DashboardLayout({ children }) {
  const pathname = usePathname();
  return (
    <div>
      <div className=" flex flex-col text-5xl p-2 fixed top-1/2 -translate-y-1/2 bg-gray-200 gap-2 rounded-md">
        <Link href="/users/dashboard">
          <MdDashboard
            className={classNames(
              "hover:bg-slate-800 hover:text-white cursor-pointer rounded-md p-2",
              { "bg-slate-800 text-white": pathname.endsWith("dashboard") },
            )}
          />
        </Link>
        <Link href="/users/dashboard/questions">
          <BsFillQuestionSquareFill
            className={classNames(
              "hover:bg-gray-800 hover:text-white cursor-pointer rounded-md p-2",
              { "bg-slate-800 text-white": pathname.endsWith("questions") },
            )}
          />
        </Link>
        <Link href="/users/dashboard/answers">
          <RiQuestionAnswerFill
            className={classNames(
              "hover:bg-gray-800 hover:text-white cursor-pointer rounded-md p-2",
              { "bg-slate-800 text-white": pathname.endsWith("answers") },
            )}
          />
        </Link>
      </div>
      <div className=" mr-20 ml-10 mt-10 p-2 rounded-md h-80 bg-gray-100">
        {children}
      </div>
    </div>
  );
}
