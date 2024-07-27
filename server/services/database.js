const { Client } = require("pg");

const client = new Client({
  // host: "pg-arcng-surajchakma-arc.a.aivencloud.com",
  // port: 16884,
  // user: "dbc",
  // password: "dbc",
  // database: "test_database",
  connectionString:
    "https://dbc:dbc@pg-arcng-surajchakma-arc.a.aivencloud.com:16884/test_database",
  ssl: {
    rejectUnauthorized: false,
  },
});

client
  .connect()
  .then(() => console.log("Connected to Aiven PostgreSQL"))
  .catch((err) => console.error("Connection error", err.stack));

module.exports = { client };
