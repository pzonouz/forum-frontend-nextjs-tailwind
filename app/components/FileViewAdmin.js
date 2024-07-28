"use client";

import Link from "next/link";
import { AiFillEdit } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import classNames from "classnames";
import {
  useDeleteFileAdminMutation,
  useEditFileMutation,
} from "../redux_toolkit/consumeAPI";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const FileViewAdmin = (props) => {
  const { file } = props;
  const [title, setTitle] = useState(file?.title);
  const [titleUniqueError, setTitleUniqueError] = useState(false);
  const [editActivated, setEditActivated] = useState(false);
  const [
    editFile,
    { isError: isErrorEdit, error: errorEdit, isSuccess: isSuccessEdit },
  ] = useEditFileMutation();
  const [
    deleteFile,
    { isError: isErrorDelete, error: errorDelete, isSuccess: isSuccessDelete },
  ] = useDeleteFileAdminMutation();
  const router = useRouter();

  useEffect(() => {
    if (editActivated) {
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
    }
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

  return (
    <div className="">
      <div className="flex items-center justify-between border-b-gray-500 border-b-[2px] px-4 py-2">
        <Link
          href={`${process.env.BACKEND_URL}files/download/${file.filename}`}
        >
          {file?.title}
        </Link>
        <div className="flex items-center justify-between gap-2 text-xl ">
          <AiFillEdit
            className="cursor-pointer text-primary"
            onClick={() => {
              setEditActivated(true);
              document
                .getElementById(`file_edit_modal_${file?.id}`)
                .showModal();
            }}
          />
          <MdDelete
            className="cursor-pointer text-error"
            onClick={() =>
              document
                .getElementById(`file_delete_modal_${file?.id}`)
                .showModal()
            }
          />
        </div>
      </div>
      <>
        <dialog id={`file_edit_modal_${file?.id}`} className="modal">
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
                    setEditActivated(false);
                    document
                      .getElementById(`file_edit_modal_${file?.id}`)
                      .close();
                  }}
                >
                  <p> ثبت</p>
                </button>
              </div>
            </form>
          </div>
        </dialog>
        <dialog id={`file_delete_modal_${file?.id}`} className="modal">
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
                      .getElementById(`file_delete_modal_${file?.id}`)
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
    </div>
  );
};

export default FileViewAdmin;
