"use client";

import axios from "axios";
import { useState } from "react";
import classNames from "classnames";
import { toast } from "react-toastify";

const FileUploadAdmin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [titleErr, setTitleErr] = useState(null);
  const [fileErr, setFileErr] = useState(null);
  const formData = new FormData();
  const fileUploadHandler = async (e) => {
    if (titleErr) return;
    if (title.length == 0) {
      setTitleErr("بدون نام");
      return;
    }
    if (e.target.files[0]?.size > 52428800) {
      e.target.value = null;
      setFileErr("حداکثر حجم فایل ۵۰ مگابایت");
      return;
    } else {
      setFileErr(null);
    }
    formData.append("file", e.target.files[0]);
    formData.append("title", title);
    try {
      setIsLoading(true);
      await axios.post(
        `${process.env.BACKEND_URL}files/upload_admin`,
        formData,
      );
      setIsLoading(false);
      toast.success("با موفقیت انجام شد");
      window.location.reload();
    } catch (error) {
      toast.error(error);
    }
    e.target.value = null;
  };
  return (
    <div className="flex flex-col max-w-md w-full p-2 gap-2">
      <div className="flex gap-2">
        {isLoading && (
          <span className="loading loading-spinner loading-lg text-primary"></span>
        )}
        <input
          type="text"
          className={classNames("input input-bordered w-full", {
            "input-error": titleErr,
          })}
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            fetch(`${process.env.BACKEND_URL}/files/is_filename_unique`, {
              headers: { "Content-Type": "application/json" },
              method: "POST",
              body: JSON.stringify({ title: e.target.value }),
            })
              .then((res) => {
                if (!res?.ok && res?.status == 409) {
                  setTitleErr("نام تکراری");
                } else {
                  setTitleErr(null);
                }
              })
              .catch((err) => {
                setIsLoading(false);
                console.log(err);
                toast.error(err?.data);
              });
          }}
        />
      </div>
      {titleErr && (
        <p className="text-error text-right text-xs -mt-1">{titleErr}</p>
      )}
      <input
        type="file"
        name="file"
        className={classNames("file-input file-input-bordered w-full", {
          "border-error": fileErr,
        })}
        onChange={fileUploadHandler}
      />
      {fileErr && <p className="text-error text-xs -mt-2">{fileErr}</p>}
    </div>
  );
};

export default FileUploadAdmin;
