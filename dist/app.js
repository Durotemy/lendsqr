"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_errors_1 = __importDefault(require("http-errors"));
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const morgan_1 = __importDefault(require("morgan"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = require("./model/db");
const createAcc_1 = __importDefault(require("./routes/createAcc"));
const getAcc_1 = __importDefault(require("./routes/getAcc"));
const createTransaction_1 = __importDefault(require("./routes/createTransaction"));
const withdrawRoutes_1 = __importDefault(require("./routes/withdrawRoutes"));
dotenv_1.default.config();
// createAccountTable();
const app = (0, express_1.default)();
// view engine setup
app.set("views", path_1.default.join(__dirname, "views"));
app.set("view engine", "jade");
app.use((0, morgan_1.default)("dev"));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.static(path_1.default.join(__dirname, "public")));
app.use("/createTransactionTable", db_1.createTransactionTable);
app.use("/createAccountTable", db_1.createAccountTable);
app.use("/validate", createAcc_1.default);
app.use("/get", getAcc_1.default);
app.use("/transaction", createTransaction_1.default);
app.use("/withdraw", withdrawRoutes_1.default);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next((0, http_errors_1.default)(404));
});
app.listen(3000, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
// error handler
module.exports = app;
