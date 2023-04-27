const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { customAlphabet } = require("nanoid");
const { handleMongooseError } = require("../helpers");

const randomId = customAlphabet("1234567890", 4);
const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const userSchema = new Schema(
  {
    name: {
      type: String,
      default: `user_${randomId()}`,
    },
    email: {
      type: String,
      require: true,
      match: emailRegexp,
      unique: true,
    },
    password: {
      type: String,
      require: true,
      minlength: 7,
    },
    token: {
      type: String,
      default: null,
    },
  },
  { versionKey: false }
);

userSchema.post("save", handleMongooseError);

const userRegisterSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(7).required(),
});

const userLoginSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(7).required(),
});

const schemas = {
  userLoginSchema,
  userRegisterSchema,
};

const User = model("user", userSchema);

module.exports = {
  User,
  schemas,
};
