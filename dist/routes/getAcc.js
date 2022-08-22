"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// import { getAcc } from "../controller/getAcc";
const createAcc_1 = __importDefault(require("../controller/createAcc"));
const createAcc_2 = require("../controller/createAcc");
var router = express_1.default.Router();
router.get("/getAcc", createAcc_1.default);
router.get("/getsingleAcc", createAcc_2.getsingleAcc);
exports.default = router;
