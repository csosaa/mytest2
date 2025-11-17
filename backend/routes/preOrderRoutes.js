import express from 'express';
const router = express.Router();
import {
  createPreOrder,
  getAllPreOrders,
  getMyPreOrders,
  getPreOrderById,
  updatePreOrder,
  updatePreOrderStatus,
  updatePreOrderDepositToPaid,
  deletePreOrder,
} from '../controllers/preOrderController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

router.route('/').post(protect, createPreOrder).get(protect, admin, getAllPreOrders);
router.route('/mine').get(protect, getMyPreOrders);
router.route('/:id').get(protect, getPreOrderById).put(protect, updatePreOrder).delete(protect, deletePreOrder);
router.route('/:id/status').put(protect, admin, updatePreOrderStatus);
router.route('/:id/deposit').put(protect, updatePreOrderDepositToPaid);

export default router;
