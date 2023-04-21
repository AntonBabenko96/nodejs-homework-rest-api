const contactsService = require("../models");

const { ctrlWrapper } = require("../utils/ctrlWrapper");

const { HttpError } = require("../helpers");

const getAllContacts = async (req, res) => {
  const result = await contactsService.listContacts();
  res.json(result);
};

const getContactsById = async (req, res) => {
  const { contactId } = req.params;
  console.log(req.params);
  const result = await contactsService.getContactById(contactId);
  if (!result) {
    throw HttpError(404);
  }
  res.json(result);
};

const addContact = async (req, res) => {
  const result = await contactsService.addContact(req.body);
  console.log(result);
  res.status(201).json(result);
};

const deleteContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await contactsService.removeContact(contactId, req.body);
  if (!result) {
    throw HttpError(404);
  }
  res.json({ message: "Delete success" });
};

const updateContactById = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await contactsService.updateContact(contactId, req.body);

  if (!result) {
    throw HttpError(404);
  }
  res.json(result);
};

module.exports = {
  getAllContacts: ctrlWrapper(getAllContacts),
  getContactsById: ctrlWrapper(getContactsById),
  addContact: ctrlWrapper(addContact),
  deleteContact: ctrlWrapper(deleteContact),
  updateContactById: ctrlWrapper(updateContactById),
};
