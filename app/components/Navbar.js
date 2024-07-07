"use client";
import { FaBars } from "react-icons/fa";
import { FaInbox } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { FaUserPlus } from "react-icons/fa";
import { MdOutlineLogin } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { MdOutlineLogout } from "react-icons/md";

import Link from "next/link";
import { useFetchUserQuery } from "../redux_toolkit/consumeAPI";

const Navbar = () => {
  const { data: user, isSuccess } = useFetchUserQuery();

  return (
    <navbar className="flex flex-row-reverse justify-between text-xl border-b-gray-500 border-b-[1px]">
      <div className=" flex items-center gap-1">
        <div className="centered cursor-pointer navbar_bg_hover">
          <FaSearch />
        </div>

        {isSuccess && (
          <>
            <div className="centered cursor-pointer navbar_bg_hover gap-1">
              <div>{user?.nickName}</div>
              {user?.image ? (
                <img
                  alt=""
                  src={"Images/photo.jpg"}
                  className="w-6 h-6 rounded-md"
                />
              ) : (
                <Link href="/users/dashboard">
                  <FaUser />
                </Link>
              )}
            </div>
            {/* <div className="centered cursor-pointer navbar_bg_hover"> */}
            {/*   <Link href="/users/inbox"> */}
            {/*     <FaInbox /> */}
            {/*   </Link> */}
            {/* </div> */}
            <div className="centered cursor-pointer navbar_bg_hover">
              <Link href="/users/logout">
                <MdOutlineLogout />
              </Link>
            </div>
          </>
        )}
        {!isSuccess && (
          <>
            <div className="centered cursor-pointer navbar_bg_hover">
              <Link href="/users/register">
                <FaUserPlus />
              </Link>
            </div>
            <div className="centered cursor-pointer navbar_bg_hover">
              <Link href="/users/login">
                <MdOutlineLogin />
              </Link>
            </div>
          </>
        )}
      </div>
      <div className="flex items-center justify-between">
        {/* <div className="cursor-pointer centered navbar_bg_hover"> */}
        {/*   <FaBars /> */}
        {/* </div> */}

        <div className="cursor-pointer centered navbar_bg_hover">
          <Link href="/" className="cursor-pointer ">
            Logo
          </Link>
        </div>
      </div>
    </navbar>
  );
};

export default Navbar;
