import { db } from "../connection.js";
import jwt from "jsonwebtoken";

// Ажиллаж байгаа
export const getUser = (req, res) => {
  const user_id = req.params.user_id;
  const q = "SELECT * FROM users WHERE id = ?";

  db.query(q, [user_id], (err, data) => {
    if (err) return res.status(500).json(err);
    const { password, ...info } = data[0];
    return res.json(info);
  });
};

// Ажиллаж байгаа.
export const editUser = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Нэвтрэх эрхгүй!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token хүчингүй байна.");

    const q = "UPDATE users SET `username`= ?, bio= ?, `image`= ?  WHERE id=?";

    db.query(
      q,
      [req.body.username, req.body.bio, req.body.image, userInfo.id],
      (err, data) => {
        if (err) return res.status(500).json(err);
        if (data.affectedRows > 0) return res.json("Амжилттай шинчиллээ.");
        return res.status(403).json("Хүсэлт амжилтгүй!");
      }
    );
  });
};
