"use client";

import React from "react";
import { useFetchFilesQuery } from "../redux_toolkit/consumeAPI";
import Link from "next/link";

const FilesView = (props) => {
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
          <div key={file.id} className="mb-2">
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
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilesView;
