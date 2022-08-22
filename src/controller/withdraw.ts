import express, { Request, Response } from "express";
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
export const makeWithdraw = async (req: Request, res: Response) => {
  try {
    const { accountNumber, amount, description } = req.body;

    if (!accountNumber) {
      return res.status(404).json({ msg: "account number is required" });
    }
    const accountToWithDrawFrom = await knex("Account holders")
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
      const newAmount =
        Number(accountToWithDrawFrom[0].amount) - Number(amount);
      const update = await knex("Account holders")
        .where("account_number", accountNumber)
        .update({ amount: newAmount });
      if (update) {
        return res.status(200).json({
          confirmation: "withdrawal successful",
          msg: `${amount} paid for ${description} received`,
        });
      }
    }
    await knex("transactions made").insert({
      account_number: accountNumber,
      amount,
      type: "withdraw",
      description,
      date: new Date().toISOString().slice(0, 10),
    });

    res
      .status(200)
      .json({ accountToWithDrawFrom: accountToWithDrawFrom[0].amount });
  } catch (error: any) {
    console.log("error");
    res.status(404).json({
      message: error.message,
    });
  }
};
