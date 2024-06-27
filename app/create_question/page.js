"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import classNames from "classnames";

const schema = z.object({
  title: z.string().min(6, { message: "حداقل ۶ کاراکتر را وارد کنید" }),
  description: z.string().min(6, { message: "حداقل ۶ کاراکتر را وارد کنید" }),
});
export default function CreateQuestion() {
  const onSubmit = async (data) => {
    console.log(data);
    try {
      const response = await fetch("/api/v1/questions/", {
        headers: {
          Accept: "application/json",
        },
        body: JSON.stringify(data),
        method: "POST",
      });
      if (!response.ok) {
        throw new Error(await response.text());
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col px-4 py-2 gap-2"
    >
      <input
        {...register("title")}
        type="text"
        className={classNames("input", { "error-border": errors?.title })}
        placeholder="عنوان سوال"
      />
      <p className="error">{errors.title?.message}</p>
      <textarea
        {...register("description")}
        className={classNames("input", { "error-border": errors?.description })}
        rows={10}
        placeholder="توضیحات سوال"
      />
      <p className="error">{errors.description?.message}</p>
      <input className="button button_primary" type="submit" value="ثبت" />
    </form>
  );
}
