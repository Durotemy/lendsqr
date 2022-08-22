import express from "express";
import { createAcc } from "../controller/createAcc";
var router = express.Router();
router.post("/createAcc", createAcc);
export default router;
