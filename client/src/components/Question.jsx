import React, { useState, useContext } from "react";
import { HiDotsVertical } from "react-icons/hi";
import { HiLightningBolt } from "react-icons/hi";
import { HiOutlineLightningBolt } from "react-icons/hi";
import { MdOutlineQuestionAnswer } from "react-icons/md";
import { AuthContext } from "../context/authContext";
import { Link } from "react-router-dom";
import Answers from "./Answers";
import moment from "../mongolianLocale";
import Markdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { makeRequest } from "../axios";
import defaultProfileImage from "../assets/defaultUser.png";

const Question = ({ question }) => {
  // const Up = false;
  const [openAnswers, setOpenAnswers] = useState(false);
  const [openHorizanMenu, setOpenHorizonMenu] = useState(false);

  const { currentUser } = useContext(AuthContext);
  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery({
    queryKey: ["likes", question.id],
    queryFn: () =>
      makeRequest.get("/likes?question_id=" + question.id).then((res) => {
        return res.data;
      }),
  });

  const mutation = useMutation({
    mutationFn: async (liked) => {
      if (liked) return makeRequest.delete("/likes?question_id=" + question.id);
      return makeRequest.post("/likes", { question_id: question.id });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["likes"]);
    },
  });

  const { isLoading: isLoadingAnswers, data: answersData } = useQuery({
    queryKey: ["answers", question.id],
    queryFn: () =>
      makeRequest.get("/answers?question_id=" + question.id).then((res) => {
        return res.data;
      }),
  });

  const deleteMutation = useMutation({
    mutationFn: async (question_id) => {
      return makeRequest.delete("/questions/" + question_id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["questions"]);
    },
  });

  const handleClick = async () => {
    mutation.mutate(data.includes(currentUser.id));
  };

  const handleDelete = async () => {
    deleteMutation.mutate(question.id);
  };

  return (
    <div className="bg-white border rounded-md shadow-md p-4">
      {/* username, image, dots */}
      <div className="flex justify-between">
        <div className="flex gap-3 items-center">
          <Link to={`/profile/${question.user_id}`}>
            <img
              src={"/upload/" + question.image || defaultProfileImage}
              alt="Нүүр зураг"
              className="w-9 h-9 rounded-full"
            />
          </Link>
          <div className="">
            <p className="font-semibold">{question.username}</p>
            <p className="text-[10px] text-slate-500 font-semibold">
              {moment(question.created_date).fromNow()}
            </p>
          </div>
        </div>
        <div className="flex">
          <div
            className="cursor-pointer mt-3"
            onClick={() => setOpenHorizonMenu(!openHorizanMenu)}
          >
            <HiDotsVertical />
          </div>
          {openHorizanMenu && question.user_id === currentUser.id && (
            <div className="absolute right-[440px]">
              <div className=" bg-red-500 text-white shadow-md rounded-t-md px-3 py-2 hover:bg-red-400 cursor-pointer text-sm">
                <button onClick={handleDelete}>Устгах</button>
              </div>
              <Link to={`/editquestion?edit=${question.id}`} state={question}>
                <div className="bg-green-500 text-white shadow-md  px-3 py-2 rounded-b-md hover:bg-green-400 cursor-pointer text-sm">
                  <button>Засах</button>
                </div>
              </Link>
            </div>
          )}
        </div>
      </div>
      {/* title */}
      <div className="mt-3 font-semibold">{question.title}</div>
      <div className="mt-3 rounded-sm p-2 overflow-x-auto overflow-y-auto max-h-96 max-w-2xl text-sm">
        <Markdown
          children={question.desc}
          components={{
            code(props) {
              const { children, className, node, ...rest } = props;
              const match = /language-(\w+)/.exec(className || "");
              return match ? (
                <SyntaxHighlighter
                  {...rest}
                  PreTag="div"
                  children={String(children).replace(/\n$/, "")}
                  language={match[1]}
                  style={oneDark}
                />
              ) : (
                <code {...rest} className={className}>
                  {children}
                </code>
              );
            },
          }}
        />
      </div>
      {/* like, answers */}
      <div className="mt-4">
        <hr />
      </div>
      <div className="flex gap-20 mx-5 mt-4">
        <div className="flex items-center cursor-pointer ">
          {isLoading ? (
            "Уншиж байна..."
          ) : data.includes(currentUser.id) ? (
            <HiLightningBolt
              className="text-yellow-400 text-xl"
              onClick={handleClick}
            />
          ) : (
            <HiOutlineLightningBolt className="text-xl" onClick={handleClick} />
          )}
          <p className="ml-2 font-semibold text-slate-500">
            {data ? data.length : 0}
          </p>
        </div>
        <div
          className="flex items-center cursor-pointer"
          onClick={() => setOpenAnswers(!openAnswers)}
        >
          <MdOutlineQuestionAnswer className="text-xl text-slate-800" />
          <p className="ml-2 font-semibold">
            {isLoadingAnswers ? "Уншиж байна..." : answersData.length}
          </p>
        </div>
      </div>
      {openAnswers && <Answers question_id={question.id} question={question} />}
    </div>
  );
};

const Component = ({ value, language }) => {
  return (
    <SyntaxHighlighter language={language} style={dark}>
      {value}
    </SyntaxHighlighter>
  );
};

export default Question;
