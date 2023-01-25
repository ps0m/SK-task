import { Request, Response } from 'express';
import Contact from '../models/contact';

const handleError = (res: Response, error:Error) => {
  res.status(500).json({ error });
}

const getContacts = (req: Request, res: Response) => {
  Contact
    .find()
    // .sort({ title: 1 })
    .then((contacts) => {
      res
        .status(200)
        .json(contacts);
    })
    .catch((err) => handleError(res, err));
};

const getContact = (req: Request, res: Response) => {
  Contact
    .findById(req.params.id)
    .then((contact) => {
      res
        .status(200)
        .json(contact);
    })
    .catch((err) => handleError(res, err));
};

const deleteContact = (req: Request, res: Response) => {
  Contact
    .findByIdAndDelete(req.params.id)
    .then((answer) => {
      res
        .status(200)
        .json(answer);
    })
    .catch((err) => handleError(res, err));
};

const addContact = (req: Request, res: Response) => {
  const contact = new Contact(req.body);
  contact
    .save()
    .then((result) => {
      res
        .status(201)
        .json(result);
    })
    .catch((err) => handleError(res, err));
};

const updateContact = (req: Request, res: Response) => {
  Contact
    .findByIdAndUpdate(req.params.id, req.body)
    .then((result) => {
      res
        .status(200)
        .json(result);
    })
    .catch((err) => handleError(res, err));
};

export {
  getContacts,
  getContact,
  deleteContact,
  addContact,
  updateContact

};
