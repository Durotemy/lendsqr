export const createAccountTable = async () => {
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
    .createTable("Account holders", (table: any) => {
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
    .catch((err: any) => {
      console.log(err);
      throw err;
    })
    .finally(() => {
      knex.destroy();
    });
};
export const createTransactionTable = () => {
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
    .createTable("transactions made", (table: any) => {
      table.increments("id");
      table.unsigned()
      table.string("account_number");
      table.string("amount");
      table.string("type");
      table.string("description");
      table.string("date");
    })
    .then(() => {
      console.log("table created");
    })
    .catch((err: any) => {
      console.log(err);
      throw err;
    })
    .finally(() => {
      knex.destroy();
    });
};
export default { createAccountTable, createTransactionTable };
// export default createTransactionTable;
// export  { createAccountTable, createTransactionTable };
