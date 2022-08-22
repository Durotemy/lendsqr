import createError from "http-errors";
import express from "express";
import path from "path";
import logger from "morgan";
import dotenv from "dotenv";
import { createAccountTable, createTransactionTable } from "./model/db";
import createAccount from "./routes/createAccount";
import createAcc from "./routes/createAcc";
import getAcc from "./routes/getAcc";
import createTransaction from "./routes/createTransaction";
import withdraw from "./routes/withdrawRoutes";
dotenv.config();
// createAccountTable();
const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "public")));

app.use("/createTransactionTable", createTransactionTable);
app.use("/createAccountTable", createAccountTable);
app.use("/validate", createAcc);
app.use("/get", getAcc);
app.use("/transaction", createTransaction);
app.use("/withdraw", withdraw);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});
app.listen(3000, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
// error handler

module.exports = app;
