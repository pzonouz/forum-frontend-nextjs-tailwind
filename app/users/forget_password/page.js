"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import classNames from "classnames";
import { useForgetPasswordMutation } from "@/app/redux_toolkit/consumeAPI";
import { useEffect } from "react";
import { toast } from "react-toastify";

const ForgetPassordPage = () => {
  const schema = z.object({
    email: z.string().email({ message: "ایمیل را به درستی وارد کنید" }),
  });
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });
  const [forgetPassword, { isError, error, isSuccess }] =
    useForgetPasswordMutation();
  const sumbitHandler = (data) => {
    forgetPassword(data.email);
  };
  useEffect(() => {
    if (isError) {
      if (error?.data.includes("No Email")) {
        toast.error("ایمیل پیدا نشد");
      }
    }
  }, [isError, error]);
  useEffect(() => {
    if (isSuccess) {
      setValue("email", "");
      toast.success("ایمیل خود را چک کنید");
    }
  }, [isSuccess]);
  return (
    <form
      className="flex flex-col w-5/6 max-w-sm mx-auto mt-12 gap-2"
      onSubmit={handleSubmit(sumbitHandler)}
    >
      <h1 className=" text-center text-xl font-bold mb-6">بازیابی پسورد</h1>
      <input
        {...register("email")}
        className={classNames("input", { "error-border": errors?.email })}
        type="text"
        placeholder="ایمیل"
      />
      {errors?.email && <p className="error">{errors?.email?.message}</p>}
      <button className="button button_primary">ارسال ایمیل</button>
    </form>
  );
};

export default ForgetPassordPage;
