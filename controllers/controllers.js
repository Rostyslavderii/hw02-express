const HttpError = require('../helpers');
const { Contact } = require('../models/contacts.js');
const { asyncWrapper } = require('../helpers');




const getAll = async (req, res, next) => {
    try {
        const contacts = await Contact.find();
       
        res.json(contacts);
    } catch (err) {
        return next(err);
    }
    
}

const getById = async (req, res) => {
    try {
        const { contactsId } = req.params;
        const contact = await Contact.findById(contactsId);
        
         res.json(contact);
    } catch (err) {
        return res.status(404).json(err);
    }
   
}

const addNewContact = async (req, res) => {
    const data = req.body;
    const newContact = await Contact.create(data);
    res.status(201).json(newContact);
}

const deleteContact = async (req, res) => {
    const { contactsId } = req.params;
    const contact = await Contact.findByIdAndDelete(contactsId);
    res.status(200).json(contact);
}

const updateContactById = async (req, res) => {
    const { contactsId } = req.params;
    const data = req.body;
    const contact = await Contact.findByIdAndUpdate(contactsId, data, { new: true });
    if (!contact) {
        throw HttpError(404);
    }
    res.status(200).json(contact);
}


const updateFavoriteStatus = async (req, res) => {
  const { contactId } = req.params;
  const data = req.body;
  const contact = await Contact.findByIdAndUpdate(contactId, data, {
    new: true,
  });
  res.json(contact);
};

module.exports = {
    getAll: asyncWrapper(getAll),
    getById: asyncWrapper(getById),
    addNewContact: asyncWrapper(addNewContact),
    deleteContact: asyncWrapper(deleteContact),
    updateContactById: asyncWrapper(updateContactById),
    updateFavoriteStatus: asyncWrapper(updateFavoriteStatus),
}