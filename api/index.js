import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { rateLimit } from "express-rate-limit";
import userRouter from "./routes/users.js";
import authRouter from "./routes/auth.js";
import likesRouter from "./routes/likes.js";
import answersRouter from "./routes/answers.js";
import questionsRouter from "./routes/questions.js";
import adminRouter from "./routes/admin.js";
import multer from "multer";
// express ашиглана.
const app = express();

// Middleware
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", true);
  next();
});

//амжигдаж буй өгөгдөл json оор дамжина.
app.use(express.json());
// Cors ашиглана
app.use(
  cors({
    origin: ["http://localhost:8000", "http://localhost:5173"],
  })
);
// Cookie
app.use(cookieParser());

const limiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 минут, 60 сек, 1000 мс
  limit: 15, // Ижил IP хаягнаас нэгэн зэрэг 15 удаа хандалт хийнэ. Тэрнээс хэтэрвэл 5 минут турш хандалт хязгаарлна.
  standardHeaders: "draft-7", // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
  // store: ... , // Redis, Memcached, etc. See below.
  message: "Хандах хүсэлт хэтэрлээ. Та 5 минутын дараа дахин оролдоно уу!",
});

app.use("/api/auth/login", limiter);

//file upload multer library
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../client/public/upload"); //save to a folder/
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname); //rename the file with date
  },
});

const upload = multer({ storage: storage });

app.post("/api/upload", upload.single("file"), (req, res) => {
  const file = req.file;
  res.status(200).json(file.filename);
});

// App router-ийг зааж өгч байна.
app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/likes", likesRouter);
app.use("/api/answers", answersRouter);
app.use("/api/questions", questionsRouter);
app.use("/api/admin", adminRouter);

// backend 8000 port дээр ажиллана
app.listen(8000, () => {
  console.log("8000 port дээр API ажиллаж байна.");
});
