"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const withdraw_1 = require("../controller/withdraw");
const router = express_1.default.Router();
router.post("/withdraw", withdraw_1.makeWithdraw);
exports.default = router;
