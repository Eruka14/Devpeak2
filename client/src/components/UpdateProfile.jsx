import React, { useContext, useState } from "react";
import MyButton from "./Mybutton";
import { makeRequest } from "../axios";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { AuthContext } from "../context/authContext";

const UpdateProfile = ({ setOpenUpdateUser, user }) => {
  const { currentUser } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);
  const [inputs, setInputs] = useState({
    username: "",
    bio: "",
  });

  const queryClient = useQueryClient();

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const mutation = useMutation({
    mutationFn: async (user) => {
      return makeRequest.put("/users", user);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["user"]);
    },
  });

  const upload = async (file) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await makeRequest.post("/upload", formData);
      return res.data;
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let profileUrl;
    profileUrl = profile ? await upload(profile) : user.image;
    mutation.mutate({ ...inputs, image: profileUrl });
    setOpenUpdateUser(false);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="w-[40%] h-[60%] bg-white rounded-md z-50 p-10 shadow-md">
        <div>
          <h1 className="font-bold mb-5 ml-10 text-xl">Мэдээллээ шинэчлэх </h1>
        </div>
        <form>
          <div className="my-3">
            <label htmlFor="username" className="block pb-1">
              Нэр :
            </label>
            <input
              type="text"
              id="username"
              name="username"
              className="border border-slate-300 rounded-md w-[100%] h-8 pl-2 focus:outline-none transition ease-in-out focus:border-blue-400 focus:border-2 focus:duration-100"
              onChange={handleChange}
            />
          </div>
          <div className="my-3">
            <label htmlFor="bio" className="block pb-1">
              Намтар :
            </label>
            <input
              type="text"
              id="bio"
              name="bio"
              className="border border-slate-300 rounded-md w-[100%] h-8 pl-2 focus:outline-none transition ease-in-out focus:border-blue-400 focus:border-2 focus:duration-100"
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block pb-1">Зургаа оруулна уу </label>
            <div className="flex justify-center my-5">
              <input
                type="file"
                id="image"
                name="image"
                className="border border-slate-300 rounded-full pl-2 focus:outline-none transition ease-in-out focus:border-blue-400 focus:border-2 focus:duration-100 cursor-pointer"
                onChange={(e) => setProfile(e.target.files[0])}
              />
            </div>
          </div>
          <div className="flex">
            <MyButton
              style="w-[15%] bg-red-600 rounded-md py-1 text-white mb-2 hover:bg-red-500 ease-in-out duration-300 text-[15px] font-semibold"
              onClick={() => setOpenUpdateUser(false)}
            >
              Цуцлах
            </MyButton>
            <MyButton
              style="w-[15%] bg-green-600 rounded-md py-1 text-white mb-2 hover:bg-green-500 ease-in-out duration-300 text-[15px] font-semibold"
              onClick={handleSubmit}
            >
              Хадгалах
            </MyButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;
