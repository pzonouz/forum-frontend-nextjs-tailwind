"use client";
import {
  useFetchFilesQuery,
  useFetchUserQuery,
} from "../redux_toolkit/consumeAPI";
import Link from "next/link";
import { useState } from "react";
import { AiFillEdit } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { IoIosCloseCircle } from "react-icons/io";

const FilesView = (props) => {
  const { data: user } = useFetchUserQuery();
  const [edit, setEdit] = useState(null);
  const { searchField, searchFieldValue, classes = "" } = props;
  const {
    data: files,
    isError,
    error,
  } = useFetchFilesQuery({
    searchField: searchField,
    searchFieldValue: searchFieldValue,
  });
  const getExtension = (filename) => {
    const splited = filename.split(".");
    return splited[splited.length - 1];
  };
  return (
    <div className={classes}>
      <div className="flex gap-2 items-center">
        {files?.map((file, index) => (
          <div key={file.id} className="mb-2 p-2">
            <div className="relative">
              {getExtension(file?.filename) == "jpg" ||
              getExtension(file?.filename) == "jpeg" ||
              getExtension(file?.filename) == "png" ? (
                <Link
                  href={`${process.env.BACKEND_URL}files/download/${file.filename}`}
                >
                  <img
                    className="w-16 h-16 rounded-md"
                    src={`${process.env.BACKEND_URL}files/download/${file.filename}`}
                    alt=""
                  />
                </Link>
              ) : (
                <Link
                  href={`${process.env.BACKEND_URL}files/download/${file.filename}`}
                  className="w-16 h-16 bg-gray-300 centered rounded-md"
                >
                  {`file-${index + 1}`}
                </Link>
              )}
              <div className="flex absolute -top-2 -right-2 text-xl gap-10 items-center">
                <AiFillEdit
                  className="cursor-pointer text-primary"
                  onClick={() => {
                    setEdit(index);
                  }}
                />
                <MdDelete className="cursor-pointer text-error" />
              </div>
            </div>
            {user.role == "admin" && edit == index && (
              <form className="mt-3 flex flex-col gap-3 relative p-3">
                <IoIosCloseCircle
                  className="absolute cursor-pointer text-error -top-2 -right-2 text-xl"
                  onClick={() => {
                    setEdit(null);
                  }}
                />
                <input className="input input-bordered" type="text" />
                <button className="btn btn-primary" type="submit">
                  ثبت
                </button>
              </form>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilesView;
