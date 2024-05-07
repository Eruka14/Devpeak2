import React, { useContext } from "react";
import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import defaultProfileImage from "../assets/defaultUser.png";
import { useQuery } from "@tanstack/react-query";

const CreateQuestion = () => {
  const { currentUser } = useContext(AuthContext);
  const { isLoading, error, data } = useQuery({
    queryKey: ["users"],
    queryFn: () =>
      makeRequest.get(`/users/find/${currentUser.id}`).then((res) => {
        return res.data;
      }),
  });

  // Авсан хэрэглэгчийн өгөгдлийг задлаж байна.
  const userData = { ...data };

  return (
    <div className="flex items-center max-w-[50%] min-w-[50%] mt-2">
      <div className="flex border pl-2 pr-1 py-1 rounded-md justify-between gap-6 shadow bg-white">
        <img
          src={"/upload/" + (userData.image || defaultProfileImage)}
          alt="myProfile"
          className="rounded-full h-9 w-9"
        />
        <Link
          to="/addquestion"
          className="flex items-center gap-2 cursor-pointer"
        >
          <FaPlus />
          <button className="px-2 bg-green-600 p-2 rounded-md text-white text-sm hover:bg-green-500 ease-in-out duration-300 font-medium">
            Асуулт үүсгэх
          </button>
        </Link>
      </div>
    </div>
  );
};

export default CreateQuestion;
