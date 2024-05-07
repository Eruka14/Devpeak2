import React, { useState, useEffect } from "react";
import { FcVoicePresentation } from "react-icons/fc";
import { makeRequest } from "../../axios";

const AdminGetQuestions = () => {
  const [allQuestions, setQuestions] = useState(0);

  useEffect(() => {
    const fetchUserCount = async () => {
      try {
        const response = await makeRequest.get("/admin/getQuestions");
        setQuestions(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchUserCount();
  }, []);
  return (
    <div className="w-60 h-40 rounded-md bg-white shadow-md p-4 flex items-center border">
      <div className="flex justify-between items-center">
        <div className="mr-4">
          <p className="text-center font-bold text-4xl">{allQuestions}</p>
          <p className="text-lg text-slate-500">Нийт асуулт</p>
        </div>
        <div>
          <FcVoicePresentation className="h-20 w-20" />
        </div>
      </div>
    </div>
  );
};

export default AdminGetQuestions;
