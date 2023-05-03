const { HttpError } = require("../helpers");

const validateAddContact = (schema) => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body);

    if (error) {
      next(HttpError(400, error.message));
    }
    next();
  };
  return func;
};

const validateUpdateContact = (schema) => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (JSON.stringify(req.body) === "{}") {
      throw HttpError(400, "Missing fields");
    }
    next();
  };
  return func;
};

const validateUpdateFavoriteContact = (schema) => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (JSON.stringify(req.body) === "{}") {
      throw HttpError(400, "missing field favorite");
    }
    next();
  };
  return func;
};

const validateRegister = (schema) => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      const value = error.details[0];
      const message =
        value.path[0] === "email"
          ? "Email must be a valid email"
          : value.message;
      next(HttpError(400, message));
    }
    next();
  };

  return func;
};

module.exports = {
  validateAddContact,
  validateUpdateContact,
  validateUpdateFavoriteContact,
  validateRegister,
};
