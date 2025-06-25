

import express from 'express';
import {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost
} from '../controllers/postController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.post('/', auth, createPost);
router.get('/', getAllPosts);
router.get('/:id', getPostById);
router.put('/:id', auth, updatePost);
router.delete('/:id', auth, deletePost);

export default router;
