const { schema, model } = require('mongoose');

const Joi = require('joi');

const { handleMongooseError } = require("../helpers");

const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.string().required(),
    favorite: Joi.boolean(),
})
const { changeFavoriteSchema } = Joi.object({
    favorite: Joi.object().required(),
})


const contactsSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    favorite: {
        type: Boolean,
        default: false
    }

})

contactsSchema.post("save", handleMongooseError);
const Contact = model('contact', contactsSchema)
const schemas = { schema, changeFavoriteSchema };

module.exports = { Contact, schemas, };
