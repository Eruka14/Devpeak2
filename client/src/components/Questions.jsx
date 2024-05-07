import React, { useState } from "react";
import myPro from "../assets/myProfile.png";
import Question from "./Question";
import userPro from "../assets/Logo.png";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../axios";
import Search from "./Search";

const Questions = ({ searching }) => {
  const [search, setSearch] = useState("");
  const { isLoading, error, data } = useQuery({
    queryKey: ["questions"],
    queryFn: () =>
      makeRequest.get("/questions").then((res) => {
        return res.data;
      }),
  });
  return (
    <div className="grid max-w-2xl gap-5 mx-auto">
      {error
        ? "Алдаа гарлаа"
        : isLoading
        ? "Уншиж байна"
        : data
            .filter((question) =>
              question.title.toLowerCase().includes(searching)
            )
            .map((question) => (
              <Question question={question} key={question.id} />
            ))}
    </div>
  );
};

export default Questions;
