import React, { useState, useEffect } from "react";
import { FcConferenceCall } from "react-icons/fc";
import { makeRequest } from "../../axios";

const AdminGetUsers = () => {
  const [allUsers, setAllUsers] = useState(0);

  useEffect(() => {
    const fetchUserCount = async () => {
      try {
        const response = await makeRequest.get("/admin/getUsers");
        setAllUsers(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchUserCount();
  }, []);

  return (
    <div className="w-62 h-40 rounded-md bg-white shadow-md p-4 flex items-center border">
      <div className="flex justify-between items-center">
        <div className="mr-1">
          <p className="text-center font-bold text-4xl">{allUsers}</p>
          <p className="text-lg text-slate-500">Нийт хэрэглэгч</p>
        </div>
        <div>
          <FcConferenceCall className="h-20 w-20" />
        </div>
      </div>
    </div>
  );
};

export default AdminGetUsers;
