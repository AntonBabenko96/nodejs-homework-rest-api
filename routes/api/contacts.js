const express = require("express");

const contactsController = require("../../controllers/contacts-controllers");

const {
  validateAddContact,
  validateUpdateContact,
} = require("../../utils/validateBody.js");

const {
  contactsAddSchema,
  contactsEditSchema,
} = require("../../schemas/contacts");

const router = express.Router();

router.get("/", contactsController.getAllContacts);

router.get("/:contactId", contactsController.getContactsById);

router.post(
  "/",
  validateAddContact(contactsAddSchema),
  contactsController.addContact
);

router.delete("/:contactId", contactsController.deleteContact);

router.put(
  "/:contactId",
  validateUpdateContact(contactsEditSchema),
  contactsController.updateContactById
);

module.exports = router;
