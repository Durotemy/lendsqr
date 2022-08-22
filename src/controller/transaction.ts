import express, { Request, Response } from "express";
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
export const createTransaction = async (req: Request, res: Response) => {
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
  const senderAccount = await knex("Account holders")
    .where("account_number", sender)
    .select("*");

  const receiverAccount = await knex("Account holders")
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
  const senderUpdate = await knex("Account holders")
    .where("account_number", sender)
    .update({ amount: senderAmount });
  const receiverUpdate = await knex("Account holders")
    .where("account_number", receiver)
    .update({ amount: receiverAmount });
  if (senderUpdate && receiverUpdate) {
    return res.send("transaction successful");
  }

  const transaction = await knex("transaction")
    .insert({
      sender: senderAccount[0].account_number,
      receiver: receiverAccount[0].account_number,
      amount: amount,
    })
    .then((result: any) => {
      res.send(result);
      console.log("data inserted");
    })
    .catch((err: any) => {
      res.send(`error: ${err}`);
    })
    .finally(() => {});
  console.log("hi", transaction);
};

const transaction = (req: Request, res: Response) => {
  const { sender, receiver, amount } = req.body;
};
