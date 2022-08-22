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
exports.createTransaction = void 0;
const option = {
    client: "mysql",
    version: "5.7",
    connection: {
        host: "localhost",
        user: "root",
        password: "1234567890..",
        database: "transaction",
    },
};
const knex = require("knex")(option);
const createTransaction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { sender, receiver, amount, transactionDetails } = req.body;
    if (!sender) {
        return res.status(404).send("sender is required");
    }
    if (!receiver) {
        return res.status(404).send("receiver is required");
    }
    if (!amount) {
        return res.status(404).send("amount is required");
    }
    const senderAccount = yield knex("Account holders")
        .where("account_number", sender)
        .select("*");
    const receiverAccount = yield knex("Account holders")
        .where("account_number", receiver)
        .select("*");
    if (senderAccount.length === 0) {
        return res.status(404).send("sender account not found");
    }
    if (receiverAccount.length === 0) {
        return res.status(404).send("receiver account not found");
    }
    if (Number(senderAccount[0].amount) < Number(amount)) {
        return res.status(404).send("insufficient balance");
    }
    const senderAmount = Number(senderAccount[0].amount) - amount;
    const receiverAmount = Number(receiverAccount[0].amount) + Number(amount);
    console.log("received", receiverAmount);
    const senderUpdate = yield knex("Account holders")
        .where("account_number", sender)
        .update({ amount: senderAmount });
    const receiverUpdate = yield knex("Account holders")
        .where("account_number", receiver)
        .update({ amount: receiverAmount });
    if (senderUpdate && receiverUpdate) {
        return res.send("transaction successful");
    }
    const transaction = yield knex("transaction")
        .insert({
        sender: senderAccount[0].account_number,
        receiver: receiverAccount[0].account_number,
        amount: amount,
    })
        .then((result) => {
        res.send(result);
        console.log("data inserted");
    })
        .catch((err) => {
        res.send(`error: ${err}`);
    })
        .finally(() => { });
    console.log("hi", transaction);
});
exports.createTransaction = createTransaction;
const transaction = (req, res) => {
    const { sender, receiver, amount } = req.body;
};
