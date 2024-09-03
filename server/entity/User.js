const { EntitySchema, Column } = require("typeorm");

module.exports = new EntitySchema({
  name: "User",
  tableName: "users",
  columns: {
    id: {
      type: "varchar",
      primary: true,
      generated: "uuid",
    },
    email: {
      type: "varchar",
      unique: true,
    },
    name: {
      type: "varchar",
    },
    password: {
      type: "varchar",
    },
    photo: {
      type: "text",
    },
  },
});
