"use client";
import classNames from "classnames";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useEffect } from "react";

const Register = () => {
  const schema = z
    .object({
      email: z
        .string()
        .min(1, { message: "ایمیل را وارد نمایید" })
        .email({ message: "ساختار ایمیل درست نیست" }),
      password1: z.string().min(6, { message: "حداقل ۶ کاراکتر وارد نمایید" }),
      password2: z.string().min(6, { message: "حداقل ۶ کاراکتر وارد نمایید" }),
      nickName: z
        .string()
        .min(1, { message: "حداقل ۶ کاراکتر را وارد نمایید" }),
      phoneNumber: z
        .string()
        .min(11, { message: "موبایل را درست وارد نمایید" }),
    })
    .superRefine((value, ctx) => {
      if (value.password1 != value.password2) {
        ctx.addIssue({
          path: ["confirmPassword"],
          code: z.ZodIssueCode.custom,
          message: "پسوردها مطابقت ندارد",
        });
      }
    });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });
  const submitHandler = (data) => {};
  useEffect(() => {
    console.log(errors);
  }, [errors]);
  return (
    <div className="w-72 mx-auto mt-12">
      <h1 className="w-full text-xl font-bold centered">ثبت نام</h1>
      <form
        onSubmit={handleSubmit(submitHandler)}
        className="w-full mx-auto flex flex-col gap-2"
      >
        <input
          {...register("email")}
          placeholder="ایمیل"
          type="text"
          className={classNames("input w-full", {
            "error-border": errors?.email,
          })}
        />
        <p className="error text-xs">{errors?.email?.message}</p>
        <input
          {...register("password1")}
          placeholder="پسورد"
          type="password"
          className={classNames("input w-full", {
            "error-border": errors?.password1?.message,
          })}
        />
        <p className="error text-xs">{errors?.password1?.message}</p>
        <input
          placeholder="پسورد"
          {...register("password2")}
          type="password"
          className={classNames("input w-full", {
            "error-border":
              errors?.password2?.message || errors?.confirmPassword?.message,
          })}
        />
        <p className="error text-xs">{errors?.password2?.message}</p>
        <input
          placeholder="نام"
          {...register("nickName")}
          type="text"
          className={classNames("input w-full", {
            "error-border": errors?.nickName?.message,
          })}
        />
        <p className="error text-xs">{errors?.nickName?.message}</p>

        <input
          placeholder="تلفن همراه"
          {...register("phoneNumber")}
          type="text"
          className={classNames("input w-full", {
            "error-border": errors?.phoneNumber?.message,
          })}
        />
        <p className="error text-xs">{errors?.phoneNumber?.message}</p>
        <p className="error text-xs">{errors?.confirmPassword?.message}</p>
        <button className="button button_primary">ثبت</button>
      </form>
    </div>
  );
};
export default Register;
