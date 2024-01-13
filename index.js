const { program } = require("commander");
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
} = require("./contacts");
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse();

const options = program.opts();

// TODO: рефакторити
async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const contacts = await listContacts();
      return console.table(contacts); // ...
      break;

    case "get":
      const contactById = await getContactById(id);
      return console.log(contactById); // ... id
      break;

    case "add":
      const newContact = await addContact(name, email, phone);
      return console.log(newContact); // ... name email phone
      break;

    case "remove":
      const contactRemove = await removeContact(id);
      return console.log(contactRemove); // ... id
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(options);
