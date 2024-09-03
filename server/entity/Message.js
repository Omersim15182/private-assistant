const { EntitySchema, Column } = require("typeorm");

module.exports = new EntitySchema({
  name: "Message",
  tableName: "messages",
  columns: {
    id: {
      type: "varchar",
      primary: true,
      generated: "uuid",
    },
    from_id: {
      type: "varchar",
    },
    to_id: {
      type: "varchar",
    },
    message: {
      type: "varchar",
      nullable: true,
    },
    date: {
      type: "timestamp",
      nullable: true,
    },
  },
});
