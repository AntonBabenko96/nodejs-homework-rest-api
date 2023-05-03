const express = require("express");

const contactsController = require("../../controllers/contacts-controllers");

const { isValidId, authenticate, upload } = require("../../middlewares");

const {
  validateAddContact,
  validateUpdateContact,
  validateUpdateFavoriteContact,
} = require("../../utils/validateBody.js");

const { schemas } = require("../../models/contact");

const router = express.Router();

router.get("/", authenticate, contactsController.getAllContacts);

router.get(
  "/:contactId",
  authenticate,
  isValidId,
  contactsController.getContactsById
);

router.post(
  "/",
  authenticate,
  validateAddContact(schemas.contactsAddSchema),
  contactsController.addContact
);

router.put(
  "/:contactId",
  authenticate,
  isValidId,
  validateUpdateContact(schemas.contactsEditSchema),
  contactsController.updateContactById
);

router.patch(
  "/:contactId/favorite",
  authenticate,
  isValidId,
  validateUpdateFavoriteContact(schemas.contactsEditFavoriteSchema),
  contactsController.updateFavorite
);

router.delete(
  "/:contactId",
  authenticate,
  isValidId,
  contactsController.deleteContact
);

module.exports = router;
