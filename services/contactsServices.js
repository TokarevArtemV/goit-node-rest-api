import Contact from "../models/Contact.js";

// додав колекцію groups для запам'ятовування і тренування з методом populate()
const listContacts = () => Contact.find().populate("group", "name");

const getContactById = (contactId) => Contact.findById(contactId);

const removeContact = (contactId) => Contact.findByIdAndDelete(contactId);

const addContact = (data) => Contact.create(data);

const updateContactById = (id, data) =>
  Contact.findByIdAndUpdate(id, data).populate("group", "name");

const updateStatusContactById = (id, data) =>
  Contact.findByIdAndUpdate(id, data).populate("group", "name");

export default {
  listContacts,
  addContact,
  getContactById,
  removeContact,
  updateContactById,
  updateStatusContactById,
};
