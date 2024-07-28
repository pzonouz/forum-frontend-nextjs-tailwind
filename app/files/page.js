"use client";

import { useState } from "react";
import { useSearchFilesMutation } from "../redux_toolkit/consumeAPI";
import Link from "next/link";
import Loading from "../components/Loading";
import { toast } from "react-toastify";

const FilesPage = () => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [shortError, setShortError] = useState(false);
  const [searchFile] = useSearchFilesMutation();
  const changeHandler = async (title) => {
    if (title.length == 0) {
      setFiles([]);
      setShortError(false);
      return;
    }
    if (title.length < 3 && title.length > 0) {
      setShortError(true);
      return;
    } else {
      setShortError(false);
    }
    try {
      setLoading(true);
      const files = await searchFile(title).unwrap();
      setFiles(files);
      setSearched(true);
      setLoading(false);
    } catch (error) {
      toast.error(error);
      setLoading(false);
    }
  };
  return (
    <div>
      {loading && <Loading />}
      <label className="input input-bordered flex items-center gap-2 max-w-sm mx-auto mt-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="h-4 w-4 opacity-70"
        >
          <path
            fillRule="evenodd"
            d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
            clipRule="evenodd"
          />
        </svg>
        <input
          type="text"
          className="grow"
          placeholder="جستجو"
          onChange={(e) => {
            changeHandler(e.target.value);
          }}
        />
      </label>
      {shortError && (
        <p className="text-xs text-error">حداقل سه حرف وارد نمایید</p>
      )}
      <div className="flex flex-col gap-2 mt-2 px-4 text-lg">
        {files?.map((file) => (
          <Link
            className="cursor-pointer text-primary"
            href={`files/${file?.id}`}
            key={file?.id}
          >
            {file?.title}
          </Link>
        ))}
        {!files.length && searched && (
          <div className="flex flex-col items-center gap-4">
            <div className="text-gray-600">فایلی با این مشخصات یافت نشد</div>
            <Link className="btn btn-primary" href="/files/request">
              درخواست فایل
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
export default FilesPage;
