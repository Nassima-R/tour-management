import express from 'express';
import { deleteUser, getAllUser, getSingleUser, updateUser, createUser } from '../controllers/userController.js';
const router = express.Router();
import { verifyAdmin, verifyUser } from '../utils/verifyToken.js';

// Create a new user
router.post('/', createUser);

// Update user
router.put('/:id', verifyUser, updateUser);

// Delete user
router.delete('/:id', verifyUser, deleteUser);

// Get single user
router.get('/:id', verifyUser, getSingleUser);

// Get all users
router.get('/', verifyAdmin, getAllUser);

export default router;
