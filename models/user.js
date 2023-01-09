const { schema, model } = require('mongoose');

const Joi = require('joi');

const { handleMongooseError } = require("../helpers");

const schema = Joi.object({
    password: Joi.string().required(),
    email: Joi.string().required(),
    subscription: Joi.string().required(),
    token: Joi.boolean(),
})
const { changeFavoriteSchema } = Joi.object({
    favorite: Joi.object().required(),
})


const usersSchema = new Schema({
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
  },
  subscription: {
    type: String,
    enum: ["starter", "pro", "business"],
    default: "starter"
  },
  token: {
    type: String,
    default: null,
  },
})

usersSchema.post("save", handleMongooseError);
const User = model('user', usersSchema)
const schemas = { schema, changeFavoriteSchema };

module.exports = { User, schemas, };
