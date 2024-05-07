import React, { useState } from "react";
import { LuMenu } from "react-icons/lu";
import defaultPro from "../assets/defaultUser.png";
import AdminModal from "./AdminModal";
import { MdLogout } from "react-icons/md";
import { IoClose } from "react-icons/io5";

const AdminNavbar = () => {
  const [openMenu, setOpenMenu] = useState(false);
  return (
    <div className="absolute top-0 z-50 w-full border-b-[1px] bg-white">
      <div className="w-[1260px] mx-auto flex items-center justify-between h-16">
        <div
          className="p-2 cursor-pointer"
          onClick={() => setOpenMenu(!openMenu)}
        >
          {openMenu ? (
            <IoClose className="w-7 h-7" />
          ) : (
            <LuMenu className="w-6 h-6" />
          )}
        </div>
        <div className="flex items-center">
          <img
            src={defaultPro}
            alt="admin profile"
            width={30}
            height={30}
            className="rounded-full"
          />
          <p className="ml-3 font-semibold">Admin</p>
          <div className="ml-10 p-2 cursor-pointer hover:bg-slate-100 rounded-md">
            <MdLogout className="h-5 w-5" />
          </div>
        </div>
      </div>
      {openMenu && <AdminModal />}
    </div>
  );
};

export default AdminNavbar;
