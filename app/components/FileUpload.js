"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { IoIosCloseCircle } from "react-icons/io";
import { useDeleteFileMutation } from "../redux_toolkit/consumeAPI";
import Link from "next/link";

const FileUpload = (props) => {
  const { filesSetter } = props;
  const [deleteFile] = useDeleteFileMutation();
  const [isLoading, setIsLoading] = useState(false);
  const [files, setFiles] = useState([]);
  useEffect(() => {
    filesSetter(files);
  }, [files]);
  const formData = new FormData();
  const getExtension = (filename) => {
    const splited = filename.split(".");
    return splited[splited.length - 1];
  };
  const fileUploadHandler = async (e) => {
    formData.append("file", e.target.files[0]);
    try {
      setIsLoading(true);
      const res = await axios.post(
        `${process.env.BACKEND_URL}files/upload`,
        formData,
      );
      setIsLoading(false);
      setFiles((files) => {
        return [...files, { ...res?.data }];
      });
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
                  setFiles((files) => files.filter((f) => f?.id != file?.id));
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
          <span class="loading loading-spinner loading-lg text-primary"></span>
        )}
        <input
          type="file"
          name="file"
          class="file-input file-input-bordered w-full"
          onChange={fileUploadHandler}
        />
      </div>
    </div>
  );
};

export default FileUpload;
