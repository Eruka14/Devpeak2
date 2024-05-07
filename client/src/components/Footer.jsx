import React from "react";
import Logo from "../assets/Logo.png";

const Footer = () => {
  return (
    <div className="w-full border-t-[1px] border-slate-200 h-36 flex items-center">
      <div className="w-[1280px] flex justify-between mx-auto">
        <div className="flex items-center flex-1">
          <img src={Logo} alt="Devpeak Logo" width={40} className="mr-2" />
          <h1 className="text-lg font-bold sm:text-2xl px-2 sm:px-0 cursor-pointer flex-1">
            Devpeak
          </h1>
        </div>
        <div className="flex items-center text-slate-500">
          {new Date().getFullYear()}
        </div>
        <div className="flex-1 text-white">.</div>
      </div>
    </div>
  );
};

export default Footer;
