import express from "express";
import {
  getQuestions,
  addQuestion,
  deleteQuestion,
  editQuestion,
  getOnlyUserQuestions,
} from "../controller/questions.js";
const router = express.Router();

// Болсон
router.get("/", getQuestions);
router.post("/", addQuestion);
router.delete("/:id", deleteQuestion);
router.put("/:id", editQuestion);

// Туршилт хэрэглэгчийн profile хэсэг дээр оруулсан асуултийг нь харуулах
router.get("/userQuestions/:id", getOnlyUserQuestions);

export default router;
