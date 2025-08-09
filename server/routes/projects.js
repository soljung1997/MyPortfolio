import express from 'express';
import {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
  deleteAllProjects,
} from '../controllers/projectController.js';
import { requireSignin, isAdmin } from '../middleware/auth.js';

const router = express.Router();

// Public
router.get('/', getProjects);
router.get('/:id', getProjectById);

// Admin only
router.post('/', requireSignin, isAdmin, createProject);
router.put('/:id', requireSignin, isAdmin, updateProject);
router.delete('/:id', requireSignin, isAdmin, deleteProject);
router.delete('/', requireSignin, isAdmin, deleteAllProjects);

export default router;
