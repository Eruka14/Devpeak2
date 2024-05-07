import express from "express";
import {
  getAnswers,
  addAnswer,
  deleteAnswer,
  editAnswer,
} from "../controller/answers.js";
const router = express.Router();

// Болсон
router.get("/", getAnswers);
router.post("/", addAnswer);
router.delete("/:id", deleteAnswer);
router.put("/:id", editAnswer);

export default router;
