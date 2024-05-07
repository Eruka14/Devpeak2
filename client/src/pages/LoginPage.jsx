import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import usePasswordToggle from "../hooks/usePasswordToggle";
import Navbar from "../components/Navbar";
import { AuthContext } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast, Bounce, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [PasswordInputType, ToggleIcon] = usePasswordToggle();
  // Алдааны мэдээлэл хадгалах төлөв
  const [Err, setErr] = useState(null);
  // Хэрэглэгчийн оруулсан мэдээллийг хадгалах төлөв
  const [Inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const toastSuccessHandler = () => {
    toast.success("Амжилттай Нэвтэрлээ", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Zoom,
    });
  };

  // Хэрэглэгчийн оруулсан мэдээллийг төлөврүү дамжуулах
  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!Inputs.email || !Inputs.password) {
      setErr("И-мэйл болон нууц үгээ оруулна уу.");
      return;
    }
    try {
      await login(Inputs);
      toastSuccessHandler();
      navigate("/home");
    } catch (Err) {
      setErr(Err.response.data);
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
        transition:Bounce
      />
      <Navbar />
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <form action="">
          <div className="bg-white px-6 pt-4 pb-4 rounded-md w-[300px] drop-shadow-md">
            {/* Гарчиг */}
            <h1 className="text-2xl text-center mb-4 font-medium text-gray-700">
              Нэвтрэх
            </h1>
            {/* Хэрэглэгчийн и-мэйл input */}
            <div className="my-3">
              <label htmlFor="email" className="block pb-1">
                И-мэйл <span className="text-red-800 font-bold">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                onChange={handleChange}
                className="border border-slate-300 rounded-md w-[100%] h-8 pl-2 focus:outline-none transition ease-in-out focus:border-blue-400 focus:border-2 focus:duration-100"
                required
              />{" "}
            </div>
            {/* Хэрэглэгчийн нууц үг оруулах хэсэг */}
            <div>
              <label htmlFor="password" className="block pb-1">
                Нууц үг <span className="text-red-800 font-bold">*</span>
              </label>
              <div className="flex justify-end">
                <input
                  type={PasswordInputType}
                  id="password"
                  name="password"
                  onChange={handleChange}
                  className="border border-slate-300 rounded-md w-[100%] h-8 pl-2 focus:outline-none transition ease-in-out focus:border-blue-400 focus:border-2 focus:duration-100"
                  required
                />
                <span className="absolute mt-2 mr-2 z-50 cursor-pointer">
                  {ToggleIcon}
                </span>
              </div>
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="block w-[95%] bg-green-600 rounded-md py-1 mt-6 font-bold text-white mb-2 hover:bg-green-500 ease-in-out duration-300"
                onClick={handleLogin}
              >
                Нэвтрэх
              </button>
            </div>
            <div className="w-[90%] pt-2 m-auto">
              <hr />
            </div>
            {/* Алдаа харуулах хэсэг */}
            {Err && (
              <p className="text-center text-sm text-red-600 mt-3">{Err}</p>
            )}
          </div>
          <div className="bg-white px-6 pt-4 pb-4 rounded-md w-[300px] drop-shadow-md mt-3">
            <p className="text-sm text-center">
              Шинэ хэрэглэгч бол -{" "}
              <Link to="/register">
                <span className="text-blue-800 font-medium hover:text-blue-500 ">
                  Бүртгэл үүсгэх
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
