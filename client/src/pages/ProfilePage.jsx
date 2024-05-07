import React, { useContext, useState } from "react";
import HomeNavbar from "../components/HomeNavbar";
import { AuthContext } from "../context/authContext";
import defaultProfileImage from "../assets/defaultUser.png";
import { FaRegEdit } from "react-icons/fa";
import {
  useQuery,
  useQueryClient,
  QueryClientProvider,
  QueryClient,
} from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import { makeRequest } from "../axios";
import UpdateProfile from "../components/UpdateProfile";
import Question from "../components/Question";

const ProfilePage = () => {
  const user_id = useLocation().pathname.split("/")[2];
  const { currentUser } = useContext(AuthContext);
  const [openUpdateUser, setOpenUpdateUser] = useState(false);

  const { isLoading, error, data } = useQuery({
    queryKey: ["user"],
    queryFn: () =>
      makeRequest.get("/users/find/" + user_id).then((res) => {
        return res.data;
      }),
  });

  const userData = { ...data };

  const {
    isLoading: Loading,
    error: err,
    data: userQuestions,
  } = useQuery({
    queryKey: ["questions"],
    queryFn: () =>
      makeRequest.get(`/questions/userQuestions/${user_id}`).then((res) => {
        return res.data;
      }),
  });
  return (
    <div className="min-h-screen bg-slate-50">
      <HomeNavbar />
      <div className="flex-col w-[35%] justify-center mx-auto mt-10 bg-white py-4 px-3 shadow-md rounded-md mb-6">
        <div className="relative">
          <div className="flex justify-center">
            <img
              src={"/upload/" + userData.image || defaultProfileImage}
              alt="Profile picture"
              className="w-28 h-28 rounded-full border-4 border-slate-500 mt-5"
            />
          </div>
          {userData.id === currentUser.id ? (
            <div
              className="absolute right-6 top-5 cursor-pointer w-3 h-3"
              onClick={() => setOpenUpdateUser(!openUpdateUser)}
            >
              <FaRegEdit className="text-xl" />
            </div>
          ) : null}
        </div>
        <div className="flex justify-center mt-3">
          <h1 className="text-3xl font-semibold">{userData.username}</h1>
        </div>
        <div className="flex justify-center mt-4 text-slate-500">
          <div className="">Намтар :</div> <br />
        </div>
        <div className="my-3 p-2">
          <p className="text-center">
            {userData.bio || "Хэрэглэгч өөрийн намтарыг оруулаагүй байна."}
          </p>
        </div>
      </div>
      {openUpdateUser && (
        <UpdateProfile setOpenUpdateUser={setOpenUpdateUser} user={userData} />
      )}
      <div className="grid max-w-2xl gap-5 mx-auto">
        {err ? (
          "Алдаа гарлаа."
        ) : Loading ? (
          "Уншиж байна."
        ) : userQuestions.length > 0 ? (
          userQuestions.map((questions) => (
            <Question key={questions.id} question={questions} />
          ))
        ) : (
          <div className="text-center text-gray-700 bg-white rounded-md py-2">
            {"Хэрэглэгч асуулт асуугаагүй байна."}
          </div>
        )}
      </div>
    </div>
  );
};

const ProfilePageWithQuery = () => {
  const queryClient = new QueryClient(); // Instantiate queryClient within the component
  return (
    <QueryClientProvider client={queryClient}>
      {" "}
      {/* Check if queryClient exists */}
      <ProfilePage />
    </QueryClientProvider>
  );
};

export default ProfilePageWithQuery;
