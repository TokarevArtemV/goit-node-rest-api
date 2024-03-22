import contactsService from "../services/contactsServices.js";
import HttpError from "../helpers/HttpError.js";
import controllerWrapper from "../helpers/ctrlWrapper.js";

const getAllContacts = async (req, res) => {
  const filter = {};
  const { _id } = req.user;
  const { favorite, page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;

  filter.owner = _id;

  if (favorite) filter.favorite = favorite;

  const contacts = await contactsService.listContacts(filter, { skip, limit });
  res.status(200).json(contacts);
};

const getOneContact = async (req, res) => {
  const { id } = req.params;
  const { _id: owner } = req.user;
  const contact = await contactsService.getOneContact({ _id: id, owner });

  if (!contact) throw HttpError(404);

  res.status(200).json(contact);
};

const deleteContact = async (req, res) => {
  const { id } = req.params;
  const { _id: owner } = req.user;
  const contact = await contactsService.removeContact({ _id: id, owner });

  if (!contact) throw HttpError(404);

  res.status(200).json(contact);
};

const createContact = async (req, res) => {
  const { _id: owner } = req.user;

  const contact = await contactsService.addContact({
    ...req.body,
    owner,
  });

  res.status(201).json(contact);
};

const updateContact = async (req, res) => {
  const { id } = req.params;
  const { _id: owner } = req.user;
  const contact = await contactsService.updateContactById(
    { _id: id, owner },
    req.body
  );

  if (!contact) throw HttpError(404);

  res.status(200).json(contact);
};

const updateStatusContact = async (req, res) => {
  const { id } = req.params;
  const { _id: owner } = req.user;
  const contact = await contactsService.updateStatusContactById(
    { _id: id, owner },
    req.body
  );

  if (!contact) throw HttpError(404);

  res.status(200).json(contact);
};

export default {
  getAllContacts: controllerWrapper(getAllContacts),
  getOneContact: controllerWrapper(getOneContact),
  deleteContact: controllerWrapper(deleteContact),
  createContact: controllerWrapper(createContact),
  updateContact: controllerWrapper(updateContact),
  updateStatusContact: controllerWrapper(updateStatusContact),
};
