"use client";
import { FaSearch } from "react-icons/fa";
import { FaUserPlus } from "react-icons/fa";
import { MdOutlineLogin } from "react-icons/md";
import { MdOutlineLogout } from "react-icons/md";

import Link from "next/link";
import { useFetchUserQuery } from "../redux_toolkit/consumeAPI";

const Navbar = () => {
  const { data: user, isSuccess } = useFetchUserQuery();
  const closeElem = () => {
    const elem = document.activeElement;
    if (elem) {
      elem?.blur();
    }
  };

  return (
    <navbar className="flex flex-row-reverse justify-between text-xl border-b-gray-500 border-b-[1px]">
      <div className=" flex items-center">
        <div className="centered cursor-pointer navbar_bg_hover">
          <Link href="/search" className="p-2">
            <FaSearch />
          </Link>
        </div>
        {isSuccess && (
          <>
            <Link
              className="centered cursor-pointer navbar_bg_hover"
              href="/users/dashboard"
            >
              <div>{user?.NickName}</div>
            </Link>
            <div className="centered cursor-pointer navbar_bg_hover">
              <Link href="/users/logout" className="p-2">
                <MdOutlineLogout />
              </Link>
            </div>
          </>
        )}
        {!isSuccess && (
          <>
            <div className="centered cursor-pointer navbar_bg_hover">
              <Link href="/users/register" className="p-2">
                <FaUserPlus />
              </Link>
            </div>
            <div className="centered cursor-pointer navbar_bg_hover">
              <Link href="/users/login" className="p-2">
                <MdOutlineLogin />
              </Link>
            </div>
          </>
        )}
      </div>
      <div className="flex items-center justify-between">
        {/* <div className="dropdown"> */}
        {/*   <div tabIndex="0" role="button" className="btn btn-ghost btn-circle"> */}
        {/*     <svg */}
        {/*       xmlns="http://www.w3.org/2000/svg" */}
        {/*       className="h-5 w-5" */}
        {/*       fill="none" */}
        {/*       viewBox="0 0 24 24" */}
        {/*       stroke="currentColor" */}
        {/*     > */}
        {/*       <path */}
        {/*         strokeLinecap="round" */}
        {/*         strokeLinejoin="round" */}
        {/*         strokeWidth="2" */}
        {/*         d="M4 6h16M4 12h16M4 18h16" */}
        {/*       /> */}
        {/*     </svg> */}
        {/*   </div> */}
        {/*   <ul */}
        {/*     tabIndex="0" */}
        {/*     className=" text-xl menu dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow flex flex-col gap-1" */}
        {/*   > */}
        {/*     <li onClick={closeElem}> */}
        {/*       <Link href="/">خانه</Link> */}
        {/*     </li> */}
        {/*     <li onClick={closeElem} className="lg:hidden"> */}
        {/*       <Link href="/files">فایلها</Link> */}
        {/*     </li> */}
        {/*     <li onClick={closeElem}> */}
        {/*       <Link href="/aboutus">درباره ما</Link> */}
        {/*     </li> */}
        {/*   </ul> */}
        {/* </div> */}
        <div className="cursor-pointer centered navbar_bg_hover">
          <Link href="/" className="cursor-pointer ">
            انجمن برق خودرو
          </Link>
        </div>
      </div>
    </navbar>
  );
};

export default Navbar;
