import express from 'express';
import userCtrl from '../controllers/userCtrl.js';
import {protect} from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/login')
.post(userCtrl.authUser);

router.get('/profile',protect, userCtrl.getUserProfile);

router.post('/', userCtrl.registerUser);


export default router;