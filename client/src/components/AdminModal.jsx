import React from "react";
import { MdDashboard } from "react-icons/md";
import { Link } from "react-router-dom";

const AdminModal = () => {
  return (
    <div className="min-h-[647px] absolute left-0 p-3 bg-white border-r-[1px] border-t-[1px] w-60">
      <ul className="w-full">
        <Link to="/admin">
          <li className="flex items-center justify-center border-b-[1px] pb-1 border-slate-400 cursor-pointer text-lg hover:text-blue-500 ease-in-out duration-200 font-semibold">
            <MdDashboard className="mr-2" /> Хяналтын самбар
          </li>
        </Link>
      </ul>
    </div>
  );
};

export default AdminModal;
