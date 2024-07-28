"use client";
import { useFetchUserQuery } from "../redux_toolkit/consumeAPI";
import ErrorComponent from "./ErrorComponent";
import { useEffect } from "react";
import FilesAdmin from "./FilesAdmin";

const Admin = () => {
  const { data: user, isError, isSuccess } = useFetchUserQuery();
  useEffect(() => {
    if (isSuccess && user?.Role != "admin") {
      window.location.href = "/users/login";
    }
  }, [isSuccess]);
  return (
    <div>
      {isError ? (
        <ErrorComponent error={"قطع ارتباط با سرور"} />
      ) : (
        <FilesAdmin />
      )}
    </div>
  );
};

export default Admin;
