"use client";

import { useLogoutUserMutation } from "@/app/redux_toolkit/consumeAPI";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const LogoutPage = () => {
  const router = useRouter();
  const [logout, { isSuccess }] = useLogoutUserMutation();
  useEffect(() => {
    if (isSuccess) {
      window.location.href = "/";
    }
  }, [isSuccess]);
  return (
    <div>
      <div className="text-center font-bold mt-12">آیا خارج میشوید؟</div>
      <div className="flex gap-2 items-center justify-around w-5/6 mt-12 text-center">
        <div
          onClick={() => {
            logout();
          }}
          className="button button_error"
        >
          بله
        </div>
        <div
          onClick={() => {
            router.back();
          }}
          className="button button_primary"
        >
          خیر
        </div>
      </div>
    </div>
  );
};

export default LogoutPage;
