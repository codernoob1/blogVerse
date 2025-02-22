import express from 'express';
import { getUser, logout, signIn,  signUp } from '../controllers/authController.js';
import { verifyToken } from '../middleware/auth.js';
const router = express.Router();

router.post('/register', signUp);
router.post('/login', signIn); 
router.post('/logout',logout);
router.get('/user',  verifyToken ,getUser)

export default router;