"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getsingleAcc = exports.getAcc = exports.createAcc = void 0;
const option = {
    client: "mysql",
    version: "5.7",
    connection: {
        host: "localhost",
        user: "root",
        password: "1234567890..",
        database: "createAccount",
    },
};
const knex = require("knex")(option);
let account;
const createAcc = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, amount, email } = req.body;
    account = yield knex("Account holders")
        .insert({
        name,
        amount,
        email,
        account_number: Math.floor(Math.random() * 10000000000),
    })
        .then((result) => {
        res.status(200).json({
            message: `account with name '${name}' created successfully`,
        });
        console.log("data inserted");
    })
        .catch((err) => {
        res.send(`error: ${err}`);
    })
        .finally(() => {
        knex.destroy();
    });
});
exports.createAcc = createAcc;
const getAcc = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const account = yield knex("Account holders").select("*");
    res.send(account);
    console.log("hi", account);
});
exports.getAcc = getAcc;
const getsingleAcc = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { accountNumber } = req.body;
        const account = yield knex("Account holders")
            .where("account_number", accountNumber)
            .select("*");
        if (account.length == 0) {
            res.status(200).json({ msg: "account found", account });
        }
        res.status(200).json({ msg: "account not found", account });
        console.log("single", account);
    }
    catch (error) {
        res.status(200).send(error);
    }
});
exports.getsingleAcc = getsingleAcc;
exports.default = exports.getAcc;
