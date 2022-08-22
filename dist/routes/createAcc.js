"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const createAcc_1 = require("../controller/createAcc");
var router = express_1.default.Router();
router.post("/createAcc", createAcc_1.createAcc);
exports.default = router;
