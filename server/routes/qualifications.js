import express from 'express';
import {
  getQualifications,
  getQualificationById,
  createQualification,
  updateQualification,
  deleteQualification,
  deleteAllQualifications,
} from '../controllers/qualificationController.js';
import { requireSignin, isAdmin } from '../middleware/auth.js';

const router = express.Router();

// Public
router.get('/', getQualifications);
router.get('/:id', getQualificationById);

// Admin only
router.post('/', requireSignin, isAdmin, createQualification);
router.put('/:id', requireSignin, isAdmin, updateQualification);
router.delete('/:id', requireSignin, isAdmin, deleteQualification);
router.delete('/', requireSignin, isAdmin, deleteAllQualifications);

export default router;
