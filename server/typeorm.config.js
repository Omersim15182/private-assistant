require("dotenv").config();
const path = require("path");

module.exports = {
  type: "postgres",
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT || 5432,
  username: process.env.DB_USERNAME || "postgres",
  password: process.env.DB_PASSWORD || "omer",
  database: process.env.DB_NAME || "PrivateAssistant",
  synchronize: true,
  logging: false,
  entities: [path.join(__dirname, "entity/*.js")],
  migrations: [path.join(__dirname, "migration/*.js")],
  cli: {
    entitiesDir: "entity",
    migrationsDir: "migration",
  },
};
