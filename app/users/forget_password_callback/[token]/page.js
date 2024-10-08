"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import classNames from "classnames";
import { useForgetPasswordCallbackMutation } from "@/app/redux_toolkit/consumeAPI";
import { useEffect } from "react";
import { toast } from "react-toastify";

const ForgetPasswordCallback = ({ params }) => {
  const [forgetPasswordCallback, { isError, error, isSuccess, isLoading }] =
    useForgetPasswordCallbackMutation();
  const schema = z
    .object({
      password1: z.string().min(6, { message: "حداقل ۶ کاراکتر رو وارد کنید" }),
      password2: z.string().min(6, { message: "حداقل ۶ کاراکتر رو وارد کنید" }),
    })
    .superRefine((val, ctx) => {
      if (val.password1 != val.password2) {
        ctx.addIssue({
          message: "پسوردها منطبق نیستند",
          path: ["password2"],
        });
      }
    });
  const sumbitHandler = (data) => {
    forgetPasswordCallback({ password: data?.password1, token: params?.token });
  };

  useEffect(() => {
    if (isError) {
      toast.error(error?.data);
    }
  }, [isError, error]);
  useEffect(() => {
    if (isSuccess) {
      toast.success("با موفقیت انجام شد");
      window.location.href = "/users/login";
    }
  }, [isSuccess]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });
  return (
    <form
      onSubmit={handleSubmit(sumbitHandler)}
      className="flex flex-col gap-2 w-5/6 max-w-sm mx-auto mt-12"
    >
      <div className=" text-center text-xl font-bold mb-6">تغییر پسورد</div>
      <input
        className={classNames("input input-bordered", {
          "input-error": errors?.password1,
        })}
        type="password"
        {...register("password1")}
      />
      {errors?.password1 && (
        <p className="text-xs text-error">{errors?.password1?.message}</p>
      )}
      <input
        className={classNames("input input-bordered", {
          "input-error": errors?.password2,
        })}
        type="password"
        {...register("password2")}
      />
      {errors?.password2 && (
        <p className="text-xs text-error">{errors?.password2?.message}</p>
      )}
      <button className="btn btn-primary flex">
        <div>ثبت</div>
        {isLoading && <p className="loading loading-spinner"></p>}
      </button>
    </form>
  );
};

export default ForgetPasswordCallback;
