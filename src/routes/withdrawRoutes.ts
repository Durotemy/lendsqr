import express, { Router } from "express";
import { makeWithdraw } from "../controller/withdraw";
const router = express.Router();

router.post("/withdraw", makeWithdraw);

export default router;
