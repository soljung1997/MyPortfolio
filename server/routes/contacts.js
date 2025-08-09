import express from 'express';
import {
  getContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact,
  deleteAllContacts,
} from '../controllers/contactController.js';
import { requireSignin, isAdmin } from '../middleware/auth.js';

const router = express.Router();

// ✅ Public route to submit contact
router.post('/', createContact);

// 🔐 Admin-only routes
router.get('/', requireSignin, isAdmin, getContacts);
router.get('/:id', requireSignin, isAdmin, getContactById);
router.put('/:id', requireSignin, isAdmin, updateContact);
router.delete('/:id', requireSignin, isAdmin, deleteContact);
router.delete('/', requireSignin, isAdmin, deleteAllContacts);

export default router;
