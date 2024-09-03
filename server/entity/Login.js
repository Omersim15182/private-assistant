const { EntitySchema, Culomn } = require("typeorm");

module.exports = new EntitySchema({
  name: "Login",
  tableName: "login",
  columns: {
    name: {
      type: "varchar",
      primary: true,
      nullable: false, // Primary keys should not be nullable
    },
    id: {
      type: "varchar",
      nullable: true,
    },
    date: {
      type: "timestamp",
      nullable: true,
    },
  },
});
