import Contact from "../models/Contact.js";

// додав колекцію groups для запам'ятовування і тренування з методом populate()
const listContacts = (filter = {}, query = {}) => {
  return Contact.find(filter, "", query)
    .populate("group", "name")
    .populate("owner", "email");
};

// const getContactById = (contactId) => Contact.findById(contactId);
const getOneContact = (filter) => Contact.findOne(filter);

const removeContact = (filter) => Contact.findOneAndDelete(filter);

const addContact = (data) => Contact.create(data);

const updateContactById = (filter, data) =>
  Contact.findOneAndUpdate(filter, data)
    .populate("group", "name")
    .populate("owner", "email");

const updateStatusContactById = (filter, data) =>
  Contact.findOneAndUpdate(filter, data)
    .populate("group", "name")
    .populate("owner", "email");

export default {
  listContacts,
  addContact,
  getOneContact,
  removeContact,
  updateContactById,
  updateStatusContactById,
};
