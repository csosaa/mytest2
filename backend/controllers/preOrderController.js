import asyncHandler from '../middleware/asyncHandler.js';
import PreOrder from '../models/preOrderModel.js';
import Product from '../models/productModel.js';

const createPreOrder = asyncHandler(async (req, res) => {
  const { productId, quantity, expectedAvailabilityDate, depositAmount, customerPhone, notes } = req.body;
  const product = await Product.findById(productId);
  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }
  const preOrder = new PreOrder({
    user: req.user._id,
    product: productId,
    productName: product.name,
    productImage: product.image,
    productPrice: product.price,
    quantity: quantity || 1,
    expectedAvailabilityDate,
    depositAmount: depositAmount || 0,
    customerEmail: req.user.email,
    customerPhone,
    notes,
  });
  const createdPreOrder = await preOrder.save();
  res.status(201).json(createdPreOrder);
});

const getAllPreOrders = asyncHandler(async (req, res) => {
  const preOrders = await PreOrder.find({}).populate('user', 'id name email').populate('product', 'name').sort({ createdAt: -1 });
  res.json(preOrders);
});

const getMyPreOrders = asyncHandler(async (req, res) => {
  const preOrders = await PreOrder.find({ user: req.user._id }).populate('product', 'name').sort({ createdAt: -1 });
  res.json(preOrders);
});

const getPreOrderById = asyncHandler(async (req, res) => {
  const preOrder = await PreOrder.findById(req.params.id).populate('user', 'name email').populate('product', 'name price image');
  if (preOrder) {
    if (preOrder.user._id.toString() === req.user._id.toString() || req.user.isAdmin) {
      res.json(preOrder);
    } else {
      res.status(403);
      throw new Error('Not authorized to view this pre-order');
    }
  } else {
    res.status(404);
    throw new Error('Pre-order not found');
  }
});

const updatePreOrder = asyncHandler(async (req, res) => {
  const preOrder = await PreOrder.findById(req.params.id);
  if (preOrder) {
    if (preOrder.user.toString() !== req.user._id.toString() && !req.user.isAdmin) {
      res.status(403);
      throw new Error('Not authorized to update this pre-order');
    }
    preOrder.quantity = req.body.quantity || preOrder.quantity;
    preOrder.expectedAvailabilityDate = req.body.expectedAvailabilityDate || preOrder.expectedAvailabilityDate;
    preOrder.customerPhone = req.body.customerPhone || preOrder.customerPhone;
    preOrder.notes = req.body.notes || preOrder.notes;
    const updatedPreOrder = await preOrder.save();
    res.json(updatedPreOrder);
  } else {
    res.status(404);
    throw new Error('Pre-order not found');
  }
});

const updatePreOrderStatus = asyncHandler(async (req, res) => {
  const { status, notificationSent } = req.body;
  const preOrder = await PreOrder.findById(req.params.id);
  if (preOrder) {
    preOrder.status = status || preOrder.status;
    if (notificationSent !== undefined) {
      preOrder.notificationSent = notificationSent;
    }
    const updatedPreOrder = await preOrder.save();
    res.json(updatedPreOrder);
  } else {
    res.status(404);
    throw new Error('Pre-order not found');
  }
});

const updatePreOrderDepositToPaid = asyncHandler(async (req, res) => {
  const preOrder = await PreOrder.findById(req.params.id);
  if (preOrder) {
    if (preOrder.user.toString() !== req.user._id.toString() && !req.user.isAdmin) {
      res.status(403);
      throw new Error('Not authorized to update this pre-order');
    }
    preOrder.depositPaid = true;
    preOrder.depositPaidAt = Date.now();
    preOrder.status = 'confirmed';
    const updatedPreOrder = await preOrder.save();
    res.json(updatedPreOrder);
  } else {
    res.status(404);
    throw new Error('Pre-order not found');
  }
});

const deletePreOrder = asyncHandler(async (req, res) => {
  const preOrder = await PreOrder.findById(req.params.id);
  if (preOrder) {
    if (preOrder.user.toString() !== req.user._id.toString() && !req.user.isAdmin) {
      res.status(403);
      throw new Error('Not authorized to delete this pre-order');
    }
    await PreOrder.deleteOne({ _id: preOrder._id });
    res.json({ message: 'Pre-order removed' });
  } else {
    res.status(404);
    throw new Error('Pre-order not found');
  }
});

export {
  createPreOrder,
  getAllPreOrders,
  getMyPreOrders,
  getPreOrderById,
  updatePreOrder,
  updatePreOrderStatus,
  updatePreOrderDepositToPaid,
  deletePreOrder,
};
