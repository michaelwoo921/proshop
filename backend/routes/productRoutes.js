import express from 'express';
import { protect, admin } from '../middleware/authMiddleware.js';
import productCtrl from '../controllers/productCtrl.js';

const router = express.Router();

router.route('/')
.get(productCtrl.getProducts).post(protect, admin, productCtrl.createProduct);

router.route('/:id/reviews').post(protect, productCtrl.createProductReview);

router.get('/top', productCtrl.getTopProducts);

router.route('/:id')
.get(productCtrl.getProductById)
.delete(protect, admin, productCtrl.deleteProduct)
.put(protect, admin, productCtrl.updateProduct);


export default router;