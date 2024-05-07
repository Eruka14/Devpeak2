import { db } from "../connection.js";
import moment from "moment";
import jwt from "jsonwebtoken";

// Асуудалтай
export const getAnswers = (req, res) => {
  const q =
    "SELECT a.*, u.id AS user_id, username, image FROM answers AS a JOIN users AS u ON (u.id = a.user_id) WHERE a.question_id = ? ORDER BY a.created_date DESC";
  db.query(q, [req.query.question_id], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

// Ажиллаж байгаа
export const addAnswer = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Нэвтрэх эрхгүй!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token хүчингүй байна.");
    const q =
      "INSERT INTO answers (`desc`, `created_date`, `question_id`, `user_id`) VALUES (?)";

    const values = [
      req.body.desc,
      moment(Date()).format("YYYY-MM-DD HH:mm:ss"),
      req.body.question_id,
      userInfo.id,
    ];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(400).json(err);
      return res.status(200).json("Хариулт амжилттай нийтлэгдлээ.");
    });
  });
};

// Ажиллаж байгаа гэхдээ логик асуудал байж магадгүй.
// export const deleteAnswer = (req, res) => {
//   const token = req.cookies.accessToken;
//   if (!token) return res.status(401).json("Нэвтрэх эрхгүй!");

//   jwt.verify(token, "secretkey", (err, userInfo) => {
//     if (err) return res.status(403).json("Token хүчингүй байна.");
//     const q =
//       "DELETE FROM answers WHERE `id`=? AND `question_id`=? AND `user_id`=?";

//     db.query(
//       q,
//       [req.params.id, req.body.question_id, userInfo.id],
//       (err, data) => {
//         if (err) return res.status(500).json(err);
//         if (data.affectedRows > 0)
//           return res.status(200).json("Хариулт амжилттай устгагдлаа");
//         return res.status(403).json("Хүсэлт амжилтгүй!");
//       }
//     );
//   });
// };

export const deleteAnswer = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Нэвтрэх эрхгүй!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token хүчингүй байна.");
    const q = "DELETE FROM answers WHERE `id`=? AND `user_id`=?";

    db.query(q, [req.params.id, userInfo.id], (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.affectedRows > 0)
        return res.status(200).json("Хариулт амжилттай устгагдлаа");
      return res.status(403).json("Хүсэлт амжилтгүй!");
    });
  });
};

// Ажиллаж байгаа.
export const editAnswer = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Нэвтрэх эрхгүй!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token хүчингүй байна.");
    const q = "UPDATE answers SET `desc`=? WHERE `id`=? AND `user_id`=?";

    db.query(q, [req.body.desc, req.params.id, userInfo.id], (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.affectedRows > 0) return res.json("Амжилттай шинчиллээ.");
      return res.status(403).json("Хүсэлт амжилтгүй!");
    });
  });
};
