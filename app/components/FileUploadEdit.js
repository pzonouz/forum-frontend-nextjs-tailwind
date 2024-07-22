"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { IoIosCloseCircle } from "react-icons/io";
import {
  useDeleteFileMutation,
  useFetchFilesQuery,
  useFetchUserQuery,
} from "../redux_toolkit/consumeAPI";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { addFile, removeFile, setFiles } from "../redux_toolkit/filesSlice.js";
import { createSelector } from "@reduxjs/toolkit";

const FileUploadEdit = ({ type, id }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [deleteFile] = useDeleteFileMutation();
  const [err, setErr] = useState(null);
  const dispatch = useDispatch();
  const filesSelector = createSelector(
    (state) => state.filesReducer,
    (state) => state.items,
  );
  const files = useSelector(filesSelector);
  const { data: filesFromServer, refetch } = useFetchFilesQuery({
    searchField: `${type}_id`,
    searchFieldValue: id,
  });
  useEffect(() => {
    refetch();
  }, [id]);
  useEffect(() => {
    if (filesFromServer && filesFromServer?.length > 0) {
      dispatch(setFiles(filesFromServer));
    }
  }, [filesFromServer]);
  const formData = new FormData();
  const getExtension = (filename) => {
    const splited = filename?.split(".");
    return splited[splited?.length - 1];
  };
  const fileUploadHandler = async (e) => {
    if (e.target.files[0]?.size > 2097152) {
      e.target.value = null;
      setErr("حداکثر حجم فایل ۲ مگابایت");
      return;
    }
    formData.append("file", e.target.files[0]);
    formData.append(`${type}_id`, id);
    try {
      setIsLoading(true);
      const res = await axios.post(
        `${process.env.BACKEND_URL}files/upload`,
        formData,
      );
      setIsLoading(false);
      dispatch(addFile(res?.data));
    } catch (error) {
      setIsLoading(false);
    }
    e.target.value = null;
  };
  return (
    <div>
      <div className="flex gap-2 items-center">
        {files?.map((file, index) => (
          <div key={file.id} className="mb-2">
            <div className="relative">
              <IoIosCloseCircle
                className="cursor-pointer absolute -translate-y-1/2 translate-x-1/2 text-red-600"
                onClick={() => {
                  deleteFile(file.id);
                  dispatch(removeFile(file));
                }}
              />
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
                <a
                  href={`${process.env.BACKEND_URL}files/download/${file.filename}`}
                  className="w-16 h-16 bg-gray-300 centered rounded-md"
                >
                  {`file-${index + 1}`}
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="flex centered w-full p-0">
        {isLoading && (
          <span className="loading loading-spinner loading-lg text-primary"></span>
        )}
        <input
          type="file"
          name="file"
          className="file-input file-input-bordered w-full"
          onChange={fileUploadHandler}
        />
        {err && <p>err</p>}
      </div>
    </div>
  );
};

export default FileUploadEdit;
