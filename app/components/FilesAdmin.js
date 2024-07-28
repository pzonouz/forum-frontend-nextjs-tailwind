"use client";

import { useFetchFilesCollectionQuery } from "../redux_toolkit/consumeAPI";
import ErrorComponent from "./ErrorComponent";
import FileUploadAdmin from "./FileUploadAdmin";
import FileViewAdmin from "./FileViewAdmin";

const FilesAdmin = () => {
  const { data: files, isError } = useFetchFilesCollectionQuery();
  return (
    <div>
      {isError ? (
        <ErrorComponent error={"قطع ارتباط با سرور"} />
      ) : (
        <div>
          <FileUploadAdmin />
          {files?.map((file) => {
            return <FileViewAdmin file={file} key={file?.id} />;
          })}
        </div>
      )}
    </div>
  );
};

export default FilesAdmin;
