import express from 'express';

import {
  addContact, deleteContact, getContact, getContacts, updateContact
} from '../controllers/contact-controller';

const router = express.Router();

router.get('/contacts', getContacts);
router.get('/contacts/:id', getContact);
router.delete('/contacts/:id', deleteContact);
router.post('/contacts', addContact);
router.patch('/contacts/:id', updateContact);

export default router;