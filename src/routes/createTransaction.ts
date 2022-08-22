import express from "express";
import { createTransaction } from "../controller/transaction";

const router = express.Router();
router.post("/createTransaction", createTransaction);
export default router;
