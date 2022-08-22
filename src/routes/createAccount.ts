import express, { Request, Response } from "express";
import { createAccountTable, createTransactionTable } from "../model/db";
const router = express.Router();

router.post("/createAccount", createAccountTable);
router.post("/createTransaction", createTransactionTable);

export default router;
