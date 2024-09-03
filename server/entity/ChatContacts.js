const { EntitySchema, Column } = require("typeorm");

module.exports = new EntitySchema({
  name: "ChatContacts",
  tableName: "chat_contacts",
  columns: {
    userAdmin: {
      type: "varchar",
      primary: true,
      nullable: false, // Primary keys should not be nullable
    },
    contactId: {
      type: "varchar",
      primary: true,
    },
    contactName: {
      type: "varchar",
      nullable: true,
    },
    contactPhoto: {
      type: "text",
      nullable: true,
    },
  },
});
