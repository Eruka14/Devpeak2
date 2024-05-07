import { db } from "../connection.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Ажиллаж байгаа
export const register = (req, res) => {
  // Адилхан нэртэй хэрэглэгч байгаа эсэхийг шалгана.
  const usernameQuery = "SELECT * FROM users WHERE username = ?";
  db.query(usernameQuery, [req.body.username], (err, usernameData) => {
    if (err) return res.status(500).json(err);
    if (usernameData.length)
      return res
        .status(409)
        .json(`${req.body.username} нэртэй хэрэглэгч бүртгэлтэй байна.`);

    // Адилхан и-мэйлтэй хэрэглэгч байгаа эсэхийг шалгана.
    const emailQuery = "SELECT * FROM users WHERE email = ?";
    db.query(emailQuery, [req.body.email], (err, emailData) => {
      if (err) return res.status(500).json(err);
      if (emailData.length)
        return res.status(409).json("Хэрэглэгчийн и-мэйл бүртгэлтэй байна");

      // Хэрвээ хэрэглэгчийн и-мэйл болон нэр бүртгэлгүй байвал бүртгэлийн процессийг явуулна.
      // Хэрэглэгчийн нууц үгийг нууцлахад зориулагдсан bcrypt сангийн санамсаргүй байдлаар үүссэн давс / salt.
      const salt = bcrypt.genSaltSync(10);
      // Хэрэглэгчийн нууц үгийг нууцлах.
      const hashedPassword = bcrypt.hashSync(req.body.password, salt);
      // Хэрэглэгч хүснэгтрүү өгөгдөл хийх query.
      const insertQuery =
        "INSERT INTO users (`username`,`email`,`password`) VALUES (?)";

      const values = [req.body.username, req.body.email, hashedPassword];

      db.query(insertQuery, [values], (err, data) => {
        if (err) return res.status(500).json(err);
        else return res.status(200).json("Хэрэглэгч амжилттай бүртгэгдлээ");
      });
    });
  });
};

// Ажиллаж байгаа
export const login = (req, res) => {
  const q = "SELECT * FROM users WHERE email = ?";

  db.query(q, [req.body.email], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0) return res.status(404).json("Хэрэглэгч олдсонгүй!");
    const checkPassword = bcrypt.compareSync(
      req.body.password,
      data[0].password
    );
    if (!checkPassword)
      return res
        .status(400)
        .json("Хэрэглэгчийн нууц үг эсвэл и-мэйл буруу байна!!!");
    const token = jwt.sign({ id: data[0].id }, "secretkey");
    const { password, ...others } = data[0];
    res
      .cookie("accessToken", token, {
        httpOnly: true,
      })
      .status(200)
      .json(others);
  });
};

// Ажиллаж байгаа
export const logout = (req, res) => {
  res
    .clearCookie("accessToken", {
      secure: true,
      sameSite: "none",
    })
    .status(200)
    .json("Хэрэглэгч амжилттай гарлаа");
};

// export const register = (req, res) => {
//   // Бүртгэлтэй и-мэйл хэрэглэгч байгаа эсэхийг шалгана.
//   const q = "SELECT * FROM users WHERE email = ?";
//   db.query(q, [req.body.email], (err, data) => {
//     if (err) return res.status(500).json(err);
//     if (data.length)
//       return res.status(409).json("Хэрэглэгч бүртгэлтэй байна!!!");

//     // Байхгүй бол доорх код ажиллуулна.
//     // Санамаргүй байдлаар үүссэн давс
//     const salt = bcrypt.genSaltSync(10);
//     // Хэрэглэгчийн нууц үгийг давс ашиглан encrypt хийх.
//     const hashedPassword = bcrypt.hashSync(req.body.password, salt);
//     // users хүснэгтийн username, email, password баганд хэрэглэгч нэмэх хэсэг.
//     const q = "INSERT INTO users (`username`,`email`,`password`) VALUES (?)";

//     const values = [req.body.username, req.body.email, hashedPassword];
//     // Өгөгдлийн сантай харицах функц.
//     db.query(q, [values], (err, data) => {
//       if (err) return res.status(500).json(err);
//       else return res.status(200).json("Хэрэглэгчийг амжилттай бүртгэлээ.");
//     });
//   });
// };
