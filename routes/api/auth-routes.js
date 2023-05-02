const express = require("express");

const authControllers = require("../../controllers/auth-controllers");

const { authenticate, upload } = require("../../middlewares");

const { schemas } = require("../../models/user");

const { validateRegister } = require("../../utils/validateBody");

const router = express.Router();

router.post(
  "/register",
  validateRegister(schemas.userRegisterSchema),
  authControllers.register
);

router.post(
  "/login",
  validateRegister(schemas.userLoginSchema),
  authControllers.login
);

router.get("/current", authenticate, authControllers.getCurrent);

router.post("/logout", authenticate, authControllers.logout);

router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  authControllers.updateAvatar
);

module.exports = router;
