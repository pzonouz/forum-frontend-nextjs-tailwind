"use client";

import { useEffect } from "react";
import { getCookie, setCookie } from "cookies-next";

const Modal = () => {
  useEffect(() => {
    const modalCookie = getCookie("modal_showed");
    if (!modalCookie) {
      const modal = document.getElementById("modal");
      modal.showModal();
      setCookie("modal_showed", true, { maxAge: 60 * 60 * 24 * 365 });
    }
  }, []);

  return (
    <dialog
      id="modal"
      className="modal w-5/6 h-fit mx-auto my-auto border-none text-lg"
    >
      <ul className="bg-white text-gray-700 h-full p-2 flex flex-col gap-8">
        <li>
          با زدن علامت &equiv; در گوشه بالایی میتوانید وارد قسمت فایلها(نقشه
          -برنامه ایسیو و...) شده و فایل مورد نیاز را جتسجو کنید
        </li>
        <li>
          در کنار هر سوال و جواب فلش بالا و پایین وجود دارد،اگر سوال یا جواب را
          مناسب یافتید با زدن فلش بالا امتیاز مثبت و اگر سوال یا جواب را اشتباه
          یافتید با فلش پایین،امتیاز منفی دهید
        </li>
        <div
          className="btn btn-error text-white"
          onClick={() => {
            document.getElementById("modal").close();
          }}
        >
          بستن
        </div>
      </ul>
    </dialog>
  );
};

export default Modal;
