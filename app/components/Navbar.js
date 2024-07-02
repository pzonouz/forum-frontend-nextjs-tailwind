"use client";
import { FaBars } from "react-icons/fa";
import { FaInbox } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { IoIosHelpCircle } from "react-icons/io";
import Image from "next/image";
import pic from "../../public/Images/photo.jpg";
import Link from "next/link";
import { useFetchUserQuery } from "../redux_toolkit/consumeAPI";

const Navbar = () => {
  const { data: user, isSuccess } = useFetchUserQuery();

  return (
    <navbar className="flex flex-row-reverse justify-between text-xl border-b-gray-500 border-b-[1px]">
      <div className=" flex items-center gap-1">
        {isSuccess && (
          <div className="centered cursor-pointer navbar_bg_hover">
            <Image alt="" src={pic} className="w-6 h-6 rounded-md" />
          </div>
        )}
        <div className="centered cursor-pointer navbar_bg_hover">
          <FaSearch />
        </div>
        <div className="centered cursor-pointer navbar_bg_hover">
          <FaInbox />
        </div>
        <div className="centered cursor-pointer navbar_bg_hover">
          <IoIosHelpCircle />
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="cursor-pointer centered navbar_bg_hover">
          <FaBars />
        </div>

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
