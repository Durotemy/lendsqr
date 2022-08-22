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
exports.createTransactionTable = exports.createAccountTable = void 0;
const createAccountTable = () => __awaiter(void 0, void 0, void 0, function* () {
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
    knex.schema
        .createTable("Account holders", (table) => {
        table.increments("id");
        table.string("name");
        table.varchar("amount");
        table.string("email");
        table.varchar("account_number");
        table.string("date");
    })
        .then(() => {
        console.log("table created");
    })
        .catch((err) => {
        console.log(err);
        throw err;
    })
        .finally(() => {
        knex.destroy();
    });
});
exports.createAccountTable = createAccountTable;
const createTransactionTable = () => {
    const option2 = {
        client: "mysql",
        version: "5.7",
        connection: {
            host: "localhost",
            user: "root",
            password: "1234567890..",
            database: "transaction",
        },
    };
    const knex = require("knex")(option2);
    knex.schema
        .createTable("transactions made", (table) => {
        table.increments("id");
        table.unsigned();
        table.string("account_number");
        table.string("amount");
        table.string("type");
        table.string("description");
        table.string("date");
    })
        .then(() => {
        console.log("table created");
    })
        .catch((err) => {
        console.log(err);
        throw err;
    })
        .finally(() => {
        knex.destroy();
    });
};
exports.createTransactionTable = createTransactionTable;
exports.default = { createAccountTable: exports.createAccountTable, createTransactionTable: exports.createTransactionTable };
// export default createTransactionTable;
// export  { createAccountTable, createTransactionTable };
