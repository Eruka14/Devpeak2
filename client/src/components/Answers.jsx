import React, { useContext, useState, useEffect } from "react";
import { makeRequest } from "../axios";
import { HiDotsVertical } from "react-icons/hi";
import { AuthContext } from "../context/authContext";
import Mybutton from "./Mybutton";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import moment from "../mongolianLocale";
import defaultProfileImage from "../assets/defaultUser.png";

const Answers = ({ question_id, question }) => {
  const { currentUser } = useContext(AuthContext);
  const [answerDesc, setAnswerDesc] = useState("");
  const [openEditAnswer, setOpenEditAnswer] = useState(false);
  const [editedAnswerDesc, setEditedAnswerDesc] = useState("");
  const [openAnswerMenu, setOpenAnswerMenu] = useState([]);
  const queryClient = useQueryClient();

  const {
    isLoading,
    error,
    data: answers,
  } = useQuery({
    queryKey: ["answers"],
    queryFn: () =>
      makeRequest.get("/answers?question_id=" + question_id).then((res) => {
        return res.data;
      }),
  });

  useEffect(() => {
    if (answers) {
      setOpenAnswerMenu(new Array(answers.length).fill(false));
    }
  }, [answers]);

  moment.locale("mn");

  // Шинэ асуултыг realtime харуулна
  const mutation = useMutation({
    mutationFn: async (newAnswer) => {
      return makeRequest.post("/answers", newAnswer);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["answers"]);
    },
  });

  //  Асуулт нэмэх
  const handleClick = async (e, index) => {
    e.preventDefault();
    mutation.mutate({ desc: answerDesc, question_id });
    setAnswerDesc("");
    const newOpenAnswerMenu = [...openAnswerMenu];
    newOpenAnswerMenu[index] = false;
    setOpenAnswerMenu(newOpenAnswerMenu);
  };

  // Асуултны menu нээж хаах
  const toggleAnswerMenu = (index) => {
    const newOpenAnswerMenu = [...openAnswerMenu];
    newOpenAnswerMenu[index] = !newOpenAnswerMenu[index];
    setOpenAnswerMenu(newOpenAnswerMenu);
  };

  // Асуултны menu-ны засахыг нээж хаах
  const handleEditButton = (index) => {
    const newOpenAnswerMenu = [...openAnswerMenu];
    newOpenAnswerMenu[index] = false; // Close the menu for the clicked answer
    setOpenAnswerMenu(newOpenAnswerMenu);
    setOpenEditAnswer(answers[index].id); // Set openEditAnswer to the clicked answer's id
  };

  // Асуулт устгах үед realtime харуулах
  const deleteMutation = useMutation({
    mutationFn: async (answer_id) => {
      return makeRequest.delete("/answers/" + answer_id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["questions"]);
    },
  });

  //Асуулт устгах товч дарагдах үед ажиллах функц
  const handleDelete = async (answer_id, index) => {
    deleteMutation.mutate(answer_id);
    const newOpenAnswerMenu = [...openAnswerMenu];
    newOpenAnswerMenu.splice(index, 1);
    setOpenAnswerMenu(newOpenAnswerMenu);
  };

  // Асуултыг засах  товч дарагдах үед realtime харуулах
  const editMutation = useMutation({
    mutationFn: async ({ answer_id, desc }) => {
      return makeRequest.put(`/answers/${answer_id}`, { desc });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["questions"]);
    },
  });

  // Асуулт товч дарагдах үед ажиллах функц
  const handleEdited = async (answer_id) => {
    await editMutation.mutate({
      answer_id: answer_id,
      desc: editedAnswerDesc,
    });
    setOpenEditAnswer(false);
  };

  const {
    isLoading: Loading,
    error: err,
    data: DataUser,
  } = useQuery({
    queryKey: ["users"],
    queryFn: () =>
      makeRequest.get(`/users/find/${currentUser.id}`).then((res) => {
        return res.data;
      }),
  });

  return (
    <div className="flex-col">
      <div className="flex items-center mt-5">
        <img
          src={"/upload/" + DataUser.image}
          alt="Profile picture"
          className="w-8 h-8 rounded-full"
        />
        <textarea
          type="text"
          name="desc"
          value={answerDesc}
          placeholder="Хариулт..."
          className="w-[80%] ml-3 border p-1 rounded-md pl-3 resize-y h-9 max-h-20 min-h-9 focus:outline-none transition ease-in-out focus:border-blue-400 focus:border-2 focus:duration-200"
          onChange={(e) => setAnswerDesc(e.target.value)}
        />
        <Mybutton
          style="bg-green-600 rounded-md py-1 font-semibold text-white mb-2 hover:bg-green-500 ease-in-out duration-300"
          onClick={handleClick}
        >
          Нийтлэх
        </Mybutton>
      </div>
      {/* Асуултыг map аар давтах */}
      {isLoading
        ? "Уншиж байна..."
        : Array.isArray(openAnswerMenu) &&
          answers.map((answer, index) => (
            <div className="w-full bg-white p-2 mt-2 ml-1" key={answer.id}>
              <div className="flex items-center justify-between">
                <div className="flex">
                  <img
                    src={"/upload/" + answer.image}
                    alt="profile image"
                    className="w-7 h-7 rounded-full"
                  />
                  <p className="text-md font-semibold ml-2">
                    {answer.username}
                  </p>
                </div>
                {/* Асуултын Menu */}
                <div
                  className="cursor-pointer"
                  onClick={() => toggleAnswerMenu(index)}
                >
                  <HiDotsVertical />
                </div>
                {/* Menu-ны 2 товчлуур */}
                {openAnswerMenu.length > index &&
                  openAnswerMenu[index] &&
                  answer.user_id === currentUser.id && (
                    <div className="absolute right-[440px]">
                      <div
                        className=" bg-red-500 text-white shadow-md rounded-t-md px-3 py-2 hover:bg-red-400 cursor-pointer text-xs"
                        onClick={() => handleDelete(answer.id, index)}
                      >
                        <button>Устгах</button>
                      </div>
                      <div
                        className="bg-green-500 text-white shadow-md  px-3 py-2 rounded-b-md hover:bg-green-400 cursor-pointer text-xs"
                        onClick={() => handleEditButton(index)}
                      >
                        <button>Засах</button>
                      </div>
                    </div>
                  )}
              </div>
              {/* Асуулт засах товч дарах үед харагдах комп */}
              {openEditAnswer === answer.id && (
                <div className="w-[600px] h-26 bg-white absolute rounded-md shadow-md p-2">
                  <textarea
                    name="editedDesc"
                    id="editedDesc"
                    onChange={(e) => setEditedAnswerDesc(e.target.value)}
                    className="border rounded-md w-full p-2 overflow-y-auto text-sm"
                  ></textarea>
                  <div className="flex">
                    <Mybutton
                      style="w-[15%] bg-red-600 rounded-md py-1 text-white mb-2 hover:bg-red-500 ease-in-out duration-300 text-[15px] font-semibold"
                      onClick={() => setOpenEditAnswer(false)}
                    >
                      Цуцлах
                    </Mybutton>
                    <Mybutton
                      style="w-[15%] bg-green-600 rounded-md py-1 text-white mb-2 hover:bg-green-500 ease-in-out duration-300 text-[15px] font-semibold"
                      onClick={() => handleEdited(answer.id)} // Pass answer.id to handleEdited
                    >
                      Засах
                    </Mybutton>
                  </div>
                </div>
              )}
              <div className="flex justify-between items-center">
                <p className="min-w-[75%] max-w-[75%] ml-9 rounded-sm">
                  {answer.desc}
                </p>
                <p className="flex items-center text-[10px] text-gray-400 font-semibold mr-5">
                  {moment(answer.created_date).fromNow()}
                </p>
              </div>
            </div>
          ))}
    </div>
  );
};

export default Answers;
