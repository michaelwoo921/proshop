import express from 'express';
import orderCtrl from '../controllers/orderCtrl.js';
import {protect} from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
.post(protect, orderCtrl.addOrderItems);


export default router;