import express from "express";
// import { getAcc } from "../controller/getAcc";
import getAcc from "../controller/createAcc";
import { getsingleAcc } from "../controller/createAcc";
var router = express.Router();
router.get("/getAcc", getAcc);
router.get("/getsingleAcc", getsingleAcc);
export default router;
