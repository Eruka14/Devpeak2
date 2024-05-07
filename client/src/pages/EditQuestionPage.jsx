import React, { useState } from "react";
import HomeNavbar from "../components/HomeNavbar";
import Mybutton from "../components/Mybutton";
import { makeRequest } from "../axios";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const EditQuestionPage = () => {
  const navigate = useNavigate();
  const state = useLocation().state;
  const question_id = useLocation().search.split("=")[1];
  const [editInputs, setEditInputs] = useState({
    title: state?.title || "",
    desc: state?.desc || "",
  });

  const handleChange = (e) => {
    setEditInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async () => {
    try {
      await makeRequest.put(`/questions/${question_id}`, editInputs);
      navigate("/home");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="min-h-screen bg-slate-50">
      <HomeNavbar />
      <div className="bg-white max-w-2xl mx-auto border p-2 rounded-md mt-10 shadow-md">
        <div>
          <input
            id="title"
            type="text"
            placeholder="Гарчиг"
            name="title"
            value={editInputs.title}
            className="border p-2 my-2 w-[100%] rounded-md focus:outline-none transition ease-in-out focus:border-blue-400 focus:border-2 focus:duration-100"
            onChange={handleChange}
          />
        </div>
        <div>
          <textarea
            name="desc"
            id=""
            cols="30"
            rows="10"
            placeholder="Нэмэлт мэдээлэл"
            value={editInputs.desc}
            className="border w-[100%] p-2 rounded-md focus:outline-none transition ease-in-out focus:border-blue-400 focus:border-2 focus:duration-100"
            onChange={handleChange}
          ></textarea>
        </div>
        <div>
          <Mybutton
            style="w-[15%] bg-green-600 rounded-md py-1 text-white mb-2 hover:bg-green-500 ease-in-out duration-300 text-[15px] font-semibold"
            onClick={handleClick}
          >
            Засах
          </Mybutton>
        </div>
      </div>
    </div>
  );
};

export default EditQuestionPage;
