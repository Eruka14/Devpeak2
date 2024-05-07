import React from "react";
import Error from "../assets/Error.svg";

const NotFoundPage = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <p className="font-bold text-4xl flex items-center gap-4">
        <span className="mt-1 text-slate-700">404</span>{" "}
        <span className="font-normal text-slate-500 ">|</span>{" "}
        <span className="text-2xl font-normal mt-1 text-slate-600">
          Тухайн хуудас олдсонгүй.
        </span>
      </p>
    </div>
  );
};

export default NotFoundPage;
