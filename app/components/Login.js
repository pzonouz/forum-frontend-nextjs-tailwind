"use client";
import { useEffect } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import classNames from "classnames";
import { useLoginUserMutation } from "@/app/redux_toolkit/consumeAPI";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

const schema = z.object({
  email: z
    .string()
    .min(1, { message: "ایمیل را وارد نمایید" })
    .email({ message: "ساختار ایمیل درست نیست" }),
  password: z.string().min(1, { message: "پسورد را وارد نمایید" }),
});

const Login = () => {
  const callBack = useSearchParams().get("callback");
  const [loginUser, { error, isError, isSuccess, isLoading }] =
    useLoginUserMutation();

  useEffect(() => {
    if (isSuccess) {
      if (callBack) {
        window.location.href = callBack;
      } else {
        window.location.href = "/";
      }
    }
  }, [isSuccess, callBack]);

  const submitHandler = (data) => {
    loginUser(data);
  };
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });
  return (
    <div className=" w-72 mx-auto mt-12">
      <div className=" text-xl font-bold centered">ورود</div>
      <form
        onSubmit={handleSubmit(submitHandler)}
        className=" flex flex-col w-full gap-2 justify-center"
      >
        <input
          {...register("email")}
          type="text"
          className={classNames("input input-bordered w-full", {
            "input-error": errors?.email?.message,
          })}
        />
        <p className="text-xs text-error text-start">
          {errors?.email?.message}
        </p>
        <input
          {...register("password")}
          type="password"
          className={classNames("input input-bordered w-full", {
            "input-error": errors?.password?.message,
          })}
        />

        <p className="text-xs text-error text-start">
          {errors?.password?.message}
        </p>
        <button
          className="btn btn-primary w-full text-white flex"
          type="submit"
        >
          <p>ورود</p>
          {isLoading && <p className="loading loading-spinner"></p>}
        </button>
        <div className="flex items-center justify-between">
          <div className="flex gap-1 text-sm">
            <div>از </div>
            <Link
              className="text-blue-500"
              href={`/users/register?callback=${callBack}`}
            >
              اینجا
            </Link>
            <div>ثبت نام کنید</div>
          </div>
          <div className="flex gap-1 text-sm">
            <Link className="text-blue-500" href={`/users/forget_password`}>
              فراموشی پسورد
            </Link>
          </div>
        </div>
        {/* {isSuccess && <p className="success">با موفقیت انجام شد</p>} */}
        {isError && (
          <p className="text-xs text-error">
            {error?.data.includes("Login", "Password", "match")
              ? "نام کاربری و پسورد درست نیست"
              : null}
          </p>
        )}
      </form>
    </div>
  );
};
export default Login;
