import * as fs from "fs/promises";
import { nanoid } from "nanoid";
import path from "path";

const contactsPath = path.resolve("db", "contacts.json");

function updateContacts(contacts) {
  fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
}

const listContacts = async () => {
  const contacts = await fs.readFile(contactsPath, "utf-8");

  return JSON.parse(contacts);
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const contact = contacts.find((contact) => contact.id === contactId);
  return contact || null;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId);
  if (index === -1) {
    return null;
  }
  const [delContacts] = contacts.splice(index, 1);
  await updateContacts(contacts);

  return delContacts;
};

const addContact = async (data) => {
  const newContact = {
    id: nanoid(),
    ...data,
  };
  const contacts = await listContacts();
  contacts.push(newContact);
  await updateContacts(contacts);

  return newContact;
};

const updateContactById = async (id, data) => {
  const contacts = await listContacts();
  const contactIndex = contacts.findIndex((contact) => contact.id === id);
  if (contactIndex === -1) return null;
  contacts[contactIndex] = { ...contacts[contactIndex], ...data };

  await updateContacts(contacts);
  return contacts[contactIndex];
};

export default {
  listContacts,
  addContact,
  getContactById,
  removeContact,
  updateContactById,
};
