import express from "express";
import { getAnswers, getQuestions, getUsers } from "../controller/admin.js";
const router = express.Router();

router.get("/getUsers", getUsers);
router.get("/getQuestions", getQuestions);
router.get("/getAnswers", getAnswers);

export default router;
