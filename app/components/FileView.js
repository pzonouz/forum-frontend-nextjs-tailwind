"use client";

import Link from "next/link";
import { AiFillEdit } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import classNames from "classnames";
import {
  useDeleteFileMutation,
  useEditFileMutation,
  useFetchUserQuery,
} from "../redux_toolkit/consumeAPI";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const FileView = (props) => {
  const { file, index } = props;
  const { data: user } = useFetchUserQuery();
  const [title, setTitle] = useState(file?.title);
  const [titleUniqueError, setTitleUniqueError] = useState(false);
  const [
    editFile,
    {
      isError: isErrorEdit,
      error: errorEdit,
      isLoading: isLoadingEdit,
      isSuccess: isSuccessEdit,
    },
  ] = useEditFileMutation();
  const [
    deleteFile,
    {
      isError: isErrorDelete,
      error: errorDelete,
      isLoading: isLoadingDelete,
      isSuccess: isSuccessDelete,
    },
  ] = useDeleteFileMutation();
  const router = useRouter();

  useEffect(() => {
    fetch(`${process.env.BACKEND_URL}files/is_filename_unique`, {
      method: "POST",
      body: JSON.stringify({ title: title, id: file?.id }),
      headers: { "content-type": "application/json" },
    }).then((res) => {
      if (!res?.ok) {
        setTitleUniqueError(true);
      } else {
        setTitleUniqueError(false);
      }
    });
  }, [title]);

  useEffect(() => {
    if (isErrorEdit || isErrorDelete) {
      toast.error(errorEdit?.data || errorDelete?.data);
    }
    if (isSuccessEdit || isSuccessDelete) {
      toast.success("با موفقیت انجام شد");
      router.refresh();
    }
  }, [isErrorEdit, isSuccessEdit, isErrorDelete, isSuccessDelete]);
  const getExtension = (filename) => {
    const splited = filename.split(".");
    return splited[splited.length - 1];
  };

  return (
    <div className="mb-2 p-2">
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
        {user?.Role == "admin" && (
          <div className="flex absolute -top-2 -right-2 text-xl gap-10 items-center">
            <AiFillEdit
              className="cursor-pointer text-primary"
              onClick={() =>
                document.getElementById(`file_edit_modal_${index}`).showModal()
              }
            />
            <MdDelete
              className="cursor-pointer text-error"
              onClick={() =>
                document
                  .getElementById(`file_delete_modal_${index}`)
                  .showModal()
              }
            />
          </div>
        )}
      </div>
      {user?.Role == "admin" && (
        <>
          <dialog id={`file_edit_modal_${index}`} className="modal">
            <div className="modal-box relative">
              <form method="dialog" className="mt-3 flex flex-col gap-3 p-3">
                <input
                  className={classNames("input input-bordered", {
                    "input-error": titleUniqueError,
                  })}
                  type="text"
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                />
                {titleUniqueError && (
                  <p className="text-error text-xs -mt-1">نام تکراری</p>
                )}
                <div className="flex flex-row-reverse items-center justify-between">
                  <button className="btn btn-error">بستن</button>
                  <button
                    className={classNames("btn flex", {
                      "btn-primary": !titleUniqueError,
                      "btn-disabled": titleUniqueError || file?.title == title,
                    })}
                    type="submit"
                    onClick={(e) => {
                      e.preventDefault();
                      editFile({ id: file?.id, ...{ title: title } });
                      document
                        .getElementById(`file_edit_modal_${index}`)
                        .close();
                    }}
                  >
                    <p> ثبت</p>
                  </button>
                </div>
              </form>
            </div>
          </dialog>
          <dialog id={`file_delete_modal_${index}`} className="modal">
            <div className="modal-box relative">
              <form method="dialog" className="mt-3 flex flex-col gap-3 p-3">
                <div className="flex flex-row items-center justify-between">
                  <button
                    className={classNames("btn btn-error flex")}
                    type="submit"
                    onClick={(e) => {
                      e.preventDefault();
                      deleteFile(file?.id);
                      document
                        .getElementById(`file_delete_modal_${index}`)
                        .close();
                    }}
                  >
                    <p>پاک کردن</p>
                  </button>
                  <button className="btn">بستن</button>
                </div>
              </form>
            </div>
          </dialog>
        </>
      )}
    </div>
  );
};

export default FileView;
