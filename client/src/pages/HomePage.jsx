import React, { useContext, useState } from "react";
import { AuthContext } from "../context/authContext";
import HomeNavbar from "../components/HomeNavbar";
import CreateQuestion from "../components/CreateQuestion";
import Questions from "../components/Questions";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ProfilePage from "./ProfilePage";
import Search from "../components/Search";

const HomePage = () => {
  // const { currentUser } = useContext(AuthContext);
  const [searching, setSearching] = useState("");

  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <div className="bg-slate-50">
        <HomeNavbar />
        <div className="max-w-[70%] min-w-[70%] flex justify-center mx-auto">
          <div className="flex min-w-[63%]">
            <CreateQuestion />
            <Search setSearching={setSearching} />
          </div>
        </div>
        <hr className="my-3 mt-4 w-[40%] mx-auto" />
        <div>
          <Questions searching={searching} />
        </div>
      </div>
    </QueryClientProvider>
  );
};

export default HomePage;
