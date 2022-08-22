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
let account: string;

export const createAcc = async (req: Request, res: Response) => {
  const { name, amount, email } = req.body;
  account = await knex("Account holders")
    .insert({
      name,
      amount,
      email,
      account_number: Math.floor(Math.random() * 10000000000),
    })
    .then((result: string) => {
      res.status(200).json({
        message: `account with name '${name}' created successfully`,
      });
      console.log("data inserted");
    })
    .catch((err: string) => {
      res.send(`error: ${err}`);
    })
    .finally(() => {
      knex.destroy();
    });
};

export const getAcc = async (req: Request, res: Response) => {
  const account = await knex("Account holders").select("*");
  res.send(account);
  console.log("hi", account);
};

export const getsingleAcc = async (req: Request, res: Response) => {
  try {
    const { accountNumber } = req.body;
    const account = await knex("Account holders")
      .where("account_number", accountNumber)
      .select("*");
    if (account.length == 0) {
      res.status(200).json({ msg: "account found", account });
    }
    res.status(200).json({ msg: "account not found", account });
    console.log("single", account);
  } catch (error) {
    res.status(200).send(error);
  }
};
export default getAcc;
