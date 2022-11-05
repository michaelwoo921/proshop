import express from 'express';
import userCtrl from '../controllers/userCtrl.js';
import {protect, admin} from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/login')
.post(userCtrl.authUser);

router.route('/profile')
.get(protect, userCtrl.getUserProfile)
.put(userCtrl.updateUserProfile)

router.route('/').post( userCtrl.registerUser).get(protect, admin, userCtrl.getUsers);

router.route('/:id')
.delete(protect, admin, userCtrl.deleteUser)
.get(protect, admin, userCtrl.getUserById)
.put(protect, admin, userCtrl.updateUser);


export default router;