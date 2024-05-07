import React, { useContext, useState, useEffect } from "react";
import { MdLogout } from "react-icons/md";
import DevpeakLogo from "../assets/Logo.png";
import { useNavigate } from "react-router-dom";
import { FaBell } from "react-icons/fa";
import { Link } from "react-router-dom";
import defaultProfileImage from "../assets/defaultUser.png";
import { AuthContext } from "../context/authContext";
import { makeRequest } from "../axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const HomeNavbar = () => {
  // const [search, setSearch] = useState("");
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  // Шинэ нэмсэн react query
  const { isLoading, error, data } = useQuery({
    queryKey: ["users"],
    queryFn: () =>
      makeRequest.get(`/users/find/${currentUser.id}`).then((res) => {
        return res.data;
      }),
  });

  // Авсан хэрэглэгчийн өгөгдлийг задлаж байна.
  const userData = { ...data };

  const toastSuccessHandler = () => {
    toast.success("Амжилттай гарлаа", {
      position: "top-center",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Slide,
    });
  };

  const handleLogout = async () => {
    try {
      localStorage.removeItem("user");
      await makeRequest.post("/auth/logout");
      toastSuccessHandler();
      setTimeout(() => navigate("/login"), 1600);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition:Slide
      />
      <div className="border-b-[1px] border-slate-200 w-full top-0 sticky bg-white z-50">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center h-14 justify-between">
          <Link to="/home">
            <h1 className="text-lg font-bold sm:text-2xl px-2 sm:px-0 cursor-pointer flex">
              <img
                src={DevpeakLogo}
                alt="Devpeak logo"
                width={40}
                className="mr-2"
              />{" "}
              Devpeak
            </h1>
          </Link>
          {/* <Search setSearch={setSearch} search={search} /> */}
          <div className="flex items-center">
            <div className="mr-10 cursor-pointer hover:bg-slate-200 rounded-md p-2">
              {/* <FaBell /> */}
            </div>
            <Link to={`/profile/${currentUser.id}`}>
              <div className="flex border px-3 py-1 rounded-md cursor-pointer hover:bg-slate-300">
                <img
                  src={"/upload/" + (userData.image || defaultProfileImage)}
                  alt="User"
                  className="rounded-full h-7 w-7"
                />
                <p className="ml-2 font-semibold">{userData.username}</p>
              </div>
            </Link>
            <div
              className="ml-4 cursor-pointer hover:bg-slate-200 p-2 rounded-md"
              onClick={handleLogout}
            >
              <MdLogout />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeNavbar;
