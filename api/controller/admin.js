import { db } from "../connection.js";

export const getUsers = (req, res) => {
  const q = "SELECT COUNT(*) AS allUsers FROM users";
  db.query(q, (err, data) => {
    if (err) return res.status(400).json(err);
    return res.status(200).json(data[0].allUsers);
  });
};

export const getAnswers = (req, res) => {
  const q = "SELECT COUNT(*) AS allAnswers FROM answers";
  db.query(q, (err, data) => {
    if (err) return res.status(400).json(err);
    return res.status(200).json(data[0].allAnswers);
  });
};

export const getQuestions = (req, res) => {
  const q = "SELECT COUNT(*) AS allQuestions FROM questions";
  db.query(q, (err, data) => {
    if (err) return res.status(400).json(err);
    return res.status(200).json(data[0].allQuestions);
  });
};
