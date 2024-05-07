import React from "react";
import AdminNavbar from "../components/AdminNavbar";
import AdminGetUsers from "../components/admin/AdminGetUsers";
import AdminGetAnswers from "../components/admin/AdminGetAnswers";
import AdminGetQuestions from "../components/admin/AdminGetQuestions";

const AdminPage = () => {
  return (
    <div>
      <AdminNavbar />
      <div className="w-[70%] mx-auto flex justify-around mt-20">
        <AdminGetUsers />
        <AdminGetAnswers />
        <AdminGetQuestions />
      </div>
    </div>
  );
};

export default AdminPage;
