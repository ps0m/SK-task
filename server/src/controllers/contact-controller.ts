import { Request, Response } from 'express';
import Contact from '../models/contact';
import { checkBody, createError, handleError } from '../services/error/error.service';
import { sendAddedContact, sendDeletedContact, sendUpdatedContact } from '../sockets/sockets';
import { IContact } from '../types/types';
import { ERROR_TEXT, KEYS_ADD_BODY, KEYS_UPDATE_BODY } from './constants';

const getContacts = async (req: Request, res: Response) => {
  try {
    const contacts:IContact[] = await Contact.find();
    res.status(200).json(contacts);

  } catch (err:unknown) {
    handleError(res, err)
  }
};

const getContact = async (req: Request, res: Response) => {
  try {
    const contact: IContact | null = await Contact.findById(req.params.id);

    if (contact === null) {
      return res.status(404).send(createError(404, ERROR_TEXT.NO_CONTACT));
    }

    res.status(200).json(contact);

  } catch (err: unknown) {
    handleError(res, err)
  }
};

const deleteContact = async (req: Request, res: Response) => {
  try {
    const deletedContact: IContact | null = await Contact.findByIdAndDelete(req.params.id);

    if (deletedContact === null) {
      return res.status(404).send(createError(404, ERROR_TEXT.CANT_DELETE));
    }
    
    res.status(200).json(deletedContact);
    sendDeletedContact({ _id: req.params.id })

  } catch (err: unknown) {
    handleError(res, err)
  }
};

const addContact = async (req: Request, res: Response) => {
  try {
    const bodyError = checkBody(req.body, KEYS_ADD_BODY)

    if (bodyError) {
      return res.status(400).send(createError(400, ERROR_TEXT.BAD_REQUEST + bodyError));
    }

    const contact = new Contact(req.body);
    const addedContact  = await contact.save();
    
    res.status(200).json(addedContact);
    sendAddedContact({ ...req.body, _id: addedContact._id });

  } catch (err: unknown) {
    handleError(res, err)
  }

};

const updateContact = async (req: Request, res: Response) => {
  try {
    const bodyError = checkBody(req.body, KEYS_UPDATE_BODY)

    if (bodyError) {
      return res.status(400).send(createError(400, ERROR_TEXT.BAD_REQUEST + bodyError));
    }

    const updatedContact: IContact | null = await Contact.findByIdAndUpdate(req.params.id, req.body)

    if (updatedContact === null) {
      return res.status(404).send(createError(404, ERROR_TEXT.CANT_UPDATE));
    }

    res.status(200).json(updatedContact);
    sendUpdatedContact({ ...req.body })

  } catch (err: unknown) {
    handleError(res, err)
  }

};

export {
  getContacts,
  getContact,
  deleteContact,
  addContact,
  updateContact

};
