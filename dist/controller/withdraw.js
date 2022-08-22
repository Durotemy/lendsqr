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
exports.makeWithdraw = void 0;
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
const makeWithdraw = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { accountNumber, amount, description } = req.body;
        if (!accountNumber) {
            return res.status(404).json({ msg: "account number is required" });
        }
        const accountToWithDrawFrom = yield knex("Account holders")
            .where("account_number", accountNumber)
            .select("*");
        if (accountToWithDrawFrom.length == 0) {
            return res.status(404).json({ msg: "Account not found" });
        }
        console.log("account found", accountToWithDrawFrom);
        if (Number(accountToWithDrawFrom[0].amount < Number(amount))) {
            return res.status(404).json({
                msg: `you cannot make withdrawal, you have insufficient balance of ${accountToWithDrawFrom[0].amount}`,
            });
        }
        if (Number(accountToWithDrawFrom[0].amount) > Number(amount)) {
            const newAmount = Number(accountToWithDrawFrom[0].amount) - Number(amount);
            const update = yield knex("Account holders")
                .where("account_number", accountNumber)
                .update({ amount: newAmount });
            if (update) {
                return res.status(200).json({
                    confirmation: "withdrawal successful",
                    msg: `${amount} paid for ${description} received`,
                });
            }
        }
        yield knex("transactions made").insert({
            account_number: accountNumber,
            amount,
            type: "withdraw",
            description,
            date: new Date().toISOString().slice(0, 10),
        });
        res
            .status(200)
            .json({ accountToWithDrawFrom: accountToWithDrawFrom[0].amount });
    }
    catch (error) {
        console.log("error");
        res.status(404).json({
            message: error.message,
        });
    }
});
exports.makeWithdraw = makeWithdraw;
