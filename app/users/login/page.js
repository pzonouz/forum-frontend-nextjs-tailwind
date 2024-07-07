"use client";

import { useEffect } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import classNames from "classnames";
import { useLoginUserMutation } from "@/app/redux_toolkit/consumeAPI";
import Loading from "@/app/components/Loading";
import { useRouter, useSearchParams } from "next/navigation";
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
      {isLoading ? <Loading /> : null}
      <h1 className=" text-xl font-bold centered">ورود</h1>
      <form
        onSubmit={handleSubmit(submitHandler)}
        className=" flex flex-col w-full gap-2 justify-center"
      >
        <input
          {...register("email")}
          type="text"
          className={classNames("input w-full", {
            "error-border": errors?.email?.message,
          })}
        />
        <p className="error text-start">{errors?.email?.message}</p>
        <input
          {...register("password")}
          type="text"
          className={classNames("input w-full", {
            "error-border": errors?.password?.message,
          })}
        />

        <p className="error text-start">{errors?.password?.message}</p>
        <button
          className="button button_primary w-full text-white"
          type="submit"
        >
          ورود
        </button>
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
        {isSuccess && <p className="success">با موفقیت انجام شد</p>}
        {isError && <p className="error">{JSON.stringify(error?.data)}</p>}
      </form>
    </div>
  );
};
export default Login;
