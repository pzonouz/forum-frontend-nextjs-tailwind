"use client";
import { useFetchUserQuery } from "../redux_toolkit/consumeAPI";
import ErrorComponent from "./ErrorComponent";
import { useEffect } from "react";
import FilesAdmin from "./FilesAdmin";

const Admin = () => {
  const { data: user, isError, isSuccess, error } = useFetchUserQuery();
  useEffect(() => {
    if (isSuccess && user?.Role != "admin") {
      window.location.href = "/users/login";
    }
    if (isError && error?.status == 401) {
      window.location.href = "/users/login";
    }
  }, [isSuccess, isError, error]);
  return (
    <div>
      {isError && error?.status != 401 ? (
        <ErrorComponent error={"قطع ارتباط با سرور"} />
      ) : (
        <FilesAdmin />
      )}
    </div>
  );
};

export default Admin;
