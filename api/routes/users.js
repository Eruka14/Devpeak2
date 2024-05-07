import express from "express";
import { getUser, editUser } from "../controller/users.js";
const router = express.Router();

router.get("/find/:user_id", getUser);
router.put("/", editUser);

export default router;
