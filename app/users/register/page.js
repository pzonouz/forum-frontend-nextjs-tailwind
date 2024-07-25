"use client";
import classNames from "classnames";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRegisterUserMutation } from "@/app/redux_toolkit/consumeAPI";
import { useEffect, useState } from "react";

const Register = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [nickName, setNickName] = useState("");
  const [nickNameError, setNickNameError] = useState(false);
  const schema = z
    .object({
      email: z
        .string()
        .min(1, { message: "ایمیل را وارد نمایید" })
        .email({ message: "ساختار ایمیل درست نیست" }),
      password1: z.string().min(6, { message: "حداقل ۶ کاراکتر وارد نمایید" }),
      password2: z.string().min(6, { message: "حداقل ۶ کاراکتر وارد نمایید" }),
      nickName: z.string().min(1, { message: "نام را وارد نمایید" }),
      phoneNumber: z
        .string()
        .min(11, { message: "موبایل را درست وارد نمایید" }),
    })
    .superRefine((value, ctx) => {
      if (value.password1 !== value.password2) {
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

  const [
    registerUser,
    { error: registeredData, isSuccess, isLoading, isError },
  ] = useRegisterUserMutation();

  useEffect(() => {
    if (isSuccess) {
      window.location.href = "/users/login";
    }
  }, [isSuccess]);

  useEffect(() => {
    fetch(`${process.env.BACKEND_URL}users/is_unique_email`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ email: email }),
    }).then((res) => {
      if (!res.ok && res.status == 409) {
        setEmailError(true);
      } else {
        setEmailError(false);
      }
    });
  }, [email]);
  useEffect(() => {
    fetch(`${process.env.BACKEND_URL}users/is_unique_nickname`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ nickName: nickName }),
    }).then((res) => {
      if (!res.ok && res.status == 409) {
        setNickNameError(true);
      } else {
        setNickNameError(false);
      }
    });
  }, [nickName]);
  const submitHandler = (data) => {
    data.password = data.password1;
    registerUser(data);
  };
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
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          className={classNames("input input-bordered w-full", {
            "input-error": errors?.email || emailError,
          })}
        />
        <p className="text-xs text-error ">{errors?.email?.message}</p>
        {emailError && <p className="text-xs text-error "> قبلا ثبت شده است</p>}
        <input
          {...register("password1")}
          placeholder="پسورد"
          type="password"
          className={classNames("input input-bordered w-full", {
            "input-error": errors?.password1?.message,
          })}
        />
        <p className="text-xs text-error ">{errors?.password1?.message}</p>
        <input
          placeholder="پسورد"
          {...register("password2")}
          type="password"
          className={classNames("input input-bordered w-full", {
            "input-error":
              errors?.password2?.message || errors?.confirmPassword?.message,
          })}
        />
        <p className="text-xs text-error ">{errors?.password2?.message}</p>
        <input
          placeholder="نام"
          value={nickName}
          {...register("nickName")}
          type="text"
          onChange={(e) => {
            setNickName(e.target.value);
          }}
          className={classNames("input input-bordered w-full", {
            "input-error": errors?.nickName?.message || nickNameError,
          })}
        />
        <p className="text-xs text-error">{errors?.nickName?.message}</p>
        {nickNameError && (
          <p className="text-xs text-error "> قبلا ثبت شده است</p>
        )}

        <input
          placeholder="تلفن همراه"
          {...register("phoneNumber")}
          type="text"
          className={classNames("input input-bordered w-full", {
            "input-error": errors?.phoneNumber?.message,
          })}
        />
        <p className="text-xs text-error">{errors?.phoneNumber?.message}</p>
        <p className="text-xs text-error">{errors?.confirmPassword?.message}</p>
        <button
          className="btn btn-primary"
          disabled={emailError || nickNameError}
        >
          <div>ثبت</div>
          {isLoading && <p className="loading loading-spinner"></p>}
        </button>
        {isError && (
          <p className="text-xs text-error">
            {JSON.stringify(registeredData?.data)}
          </p>
        )}
      </form>
    </div>
  );
};
export default Register;
