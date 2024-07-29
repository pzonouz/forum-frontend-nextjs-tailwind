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
  const [forgetPassword, { isError, error, isSuccess, isLoading }] =
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
      <div className=" text-center text-xl font-bold mb-6">بازیابی پسورد</div>
      <input
        {...register("email")}
        className={classNames("input input-bordered", {
          "input-error": errors?.email,
        })}
        type="text"
        placeholder="ایمیل"
      />
      {errors?.email && (
        <p className="text-error text-xs">{errors?.email?.message}</p>
      )}
      <button className="btn btn-primary flex">
        <div>ارسال ایمیل</div>
        {isLoading && <p className="loading loading-spinner"></p>}
      </button>
    </form>
  );
};

export default ForgetPassordPage;
