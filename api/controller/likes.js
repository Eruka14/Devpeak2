import { db } from "../connection.js";
import jwt from "jsonwebtoken";

export const getLikes = (req, res) => {
  const q = "SELECT user_id FROM likes WHERE question_id = ?";

  db.query(q, [req.query.question_id], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data.map((like) => like.user_id));
  });
};

export const addLike = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Нэвтрэх эрхгүй!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token хүчингүй байна.");

    const q = "INSERT INTO likes (`user_id`,`question_id`) VALUES (?) ";
    const values = [userInfo.id, req.body.question_id];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Нийтлэл таалагдлаа");
    });
  });
};

export const deleteLike = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Нэвтрэх эрхгүй!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token хүчингүй байна.");

    const q = "DELETE FROM likes WHERE `user_id` = ? AND `question_id` = ?";

    db.query(q, [userInfo.id, req.query.question_id], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Нийтлэлийн like цуцаллаа");
    });
  });
};
