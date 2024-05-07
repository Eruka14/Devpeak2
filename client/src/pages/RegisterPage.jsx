import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import usePasswordToggle from "../hooks/usePasswordToggle";
import Navbar from "../components/Navbar";
import { ToastContainer, toast, Bounce, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  // Нууц үг нуух болон харах icon
  const [PasswordInputType, ToggleIcon] = usePasswordToggle();
  // Алдааний мэдээллийг хадгалах төлөв
  const [Err, setErr] = useState(null);
  // Хэрэглэгчийн мэдээллийг хадгалах төлөв
  const [Inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
  });

  // Хэрэглэгчийн оруулсан мэдээллийг төлөврүү дамжуулах функц
  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  console.log(Inputs);

  const toastSuccessHandler = () => {
    toast.success("Амжилттай бүртгэлээ", {
      position: "top-center",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Zoom,
    });
  };

  const toastErrorHandler = () => {
    toast.error("Алдаа гарлаа!", {
      position: "top-center",
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Bounce,
    });
  };
  // Хэрэглэгчийн оруулсан мэдээллийг өгөгдлийн санруу дамжуулах
  const handleClick = async (e) => {
    e.preventDefault();
    if (!Inputs.username || !Inputs.email || !Inputs.password) {
      setErr("Мэдээлэл дутуу байна.");
      return;
    }
    try {
      await axios.post("http://localhost:8000/api/auth/register", Inputs);
      toastSuccessHandler();
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (Err) {
      toastErrorHandler();
      setErr(Err.response.data);
    }
  };
  console.log(Err);
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
        transition:Bounce
      />
      <Navbar />
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <form action="">
          <div className="bg-white px-6 pt-4 pb-4 rounded-md w-[300px] drop-shadow-md">
            {/* Гарчиг */}
            <h1 className="text-2xl text-center mb-4 font-medium text-gray-700">
              Бүртгүүлэх
            </h1>
            {/* Хэрэглэгчийн нэрний input */}
            <div className="my-3">
              <label htmlFor="username" className="block pb-1">
                Нэр <span className="text-red-800 font-bold">*</span>
              </label>
              <input
                type="text"
                name="username"
                onChange={handleChange}
                className="border border-slate-300 rounded-md w-[100%] h-8 pl-2 focus:outline-none transition ease-in-out focus:border-blue-400 focus:border-2 focus:duration-100"
                required
              />{" "}
            </div>
            {/* Хэрэглэгчийн и-мэйл input */}
            <div className="my-3">
              <label htmlFor="email" className="block pb-1">
                И-мэйл <span className="text-red-800 font-bold">*</span>
              </label>
              <input
                type="email"
                name="email"
                onChange={handleChange}
                className="border border-slate-300 rounded-md w-[100%] h-8 pl-2 focus:outline-none transition ease-in-out focus:border-blue-400 focus:border-2 focus:duration-100"
                required
              />{" "}
            </div>
            {/* Хэрэглэгчийн нууц үг input */}
            <div>
              <label htmlFor="password" className="block pb-1">
                Нууц үг <span className="text-red-800 font-bold">*</span>
              </label>
              <div className="flex justify-end">
                <input
                  type={PasswordInputType}
                  name="password"
                  onChange={handleChange}
                  className="border border-slate-300 rounded-md w-[100%] h-8 pl-2 focus:outline-none transition ease-in-out focus:border-blue-400 focus:border-2 focus:duration-100"
                  required
                />
                {/* hide / reveal icon button */}
                <span className="absolute z-50 cursor-pointer mt-2 mr-2">
                  {ToggleIcon}
                </span>
              </div>
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className="block w-[95%] bg-green-600 rounded-md py-1 mt-6 font-bold text-white mb-2 hover:bg-green-500 ease-in-out duration-300"
                onClick={handleClick}
              >
                Бүртгүүлэх
              </button>
            </div>
            <div className="w-[90%] pt-2 m-auto">
              <hr />
            </div>
            {/* back end-с илгээсэн алдааг харуулах */}
            {Err && (
              <p className="text-center text-sm text-red-600 mt-3">{Err}</p>
            )}
          </div>
          <div className="bg-white px-6 pt-4 pb-4 rounded-md w-[300px] drop-shadow-md mt-3">
            <p className="text-sm text-center">
              Бүртгэлтэй хэрэглэгч бол -{" "}
              <Link to="/login">
                <span className="text-blue-800 font-medium hover:text-blue-500 ">
                  Нэвтрэх
                </span>
              </Link>
            </p>
          </div>
        </form>
      </div>
    </>
  );
};

export default LoginPage;
