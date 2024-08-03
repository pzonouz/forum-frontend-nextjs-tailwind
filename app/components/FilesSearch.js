"use client";

import { useEffect, useState } from "react";
import {
  useFetchFilesCollectionQuery,
  useSearchFilesMutation,
} from "../redux_toolkit/consumeAPI";
import Link from "next/link";
import Loading from "../components/Loading";
import { toast } from "react-toastify";
import classNames from "classnames";

const FilesSearch = (props) => {
  const { className } = props;
  const { data } = useFetchFilesCollectionQuery();
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searching, setSearching] = useState(false);
  const [shortError, setShortError] = useState(false);
  const [searchFile] = useSearchFilesMutation();

  useEffect(() => {
    setFiles(data);
  }, [data]);
  const changeHandler = async (title) => {
    if (title.length == 0) {
      setFiles(data);
      setShortError(false);
      setSearching(false);
      return;
    }
    setSearching(true);
    if (title.length < 3 && title.length > 0) {
      setShortError(true);
      setSearching(false);
      return;
    } else {
      setSearching(true);
      setShortError(false);
    }
    try {
      setLoading(true);
      const search = await searchFile(title).unwrap();
      setFiles(search);
      setSearching(true);
      setLoading(false);
    } catch (error) {
      toast.error(error);
      setLoading(false);
    }
  };
  return (
    <div className={`mx-4 ${className}`}>
      {loading && <Loading />}
      <label className="input input-bordered flex items-center gap-2 mt-4">
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
          placeholder="جستجو در تمام فایلها"
          onChange={(e) => {
            changeHandler(e.target.value);
          }}
        />
      </label>
      {shortError && (
        <p className="text-xs text-error">حداقل سه حرف وارد نمایید</p>
      )}

      {!searching && (
        <h2 className="font-xl text-center font-bold text-lg mt-4">
          آخرین فایلهای اضافه شده
        </h2>
      )}

      <div className="flex flex-col mt-4 p-4 bg-gray-100 text-md rounded-sm border-y-gray-200 border-[1px]">
        {files?.map((file, index) => (
          <Link
            className={classNames(
              "cursor-pointer text-primary p-4 border-gray-300 border-[1px] hover:text-orange-500 ",
              {
                "bg-gray-300": (index + 1) % 2,
              },
            )}
            href={`${process.env.WEBSITE_NAME}/files/${file?.id}`}
            key={file?.id}
          >
            {file?.title}
          </Link>
        ))}
        {!files?.length && searching && (
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
export default FilesSearch;
