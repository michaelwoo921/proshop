import express from 'express';
import orderCtrl from '../controllers/orderCtrl.js';
import {protect, admin} from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
.post(protect, orderCtrl.addOrderItems)
.get(protect, admin, orderCtrl.getOrders);

router.route('/myorders').get(protect, orderCtrl.getMyOrders);

router.route('/:id')
.get(protect, orderCtrl.getOrderById);
router.route('/:id/pay').put(protect, orderCtrl.updateOrderToPaid);
router.route('/:id/deliver').put(protect,admin, orderCtrl.updateOrderToDelivered);


export default router;