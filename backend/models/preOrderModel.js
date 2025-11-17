import mongoose from 'mongoose';

const preOrderSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Product',
    },
    productName: {
      type: String,
      required: true,
    },
    productImage: {
      type: String,
      required: true,
    },
    productPrice: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      default: 1,
    },
    expectedAvailabilityDate: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: ['pending', 'confirmed', 'available', 'fulfilled', 'cancelled'],
      default: 'pending',
    },
    depositAmount: {
      type: Number,
      required: true,
      default: 0.0,
    },
    depositPaid: {
      type: Boolean,
      required: true,
      default: false,
    },
    depositPaidAt: {
      type: Date,
    },
    customerEmail: {
      type: String,
      required: true,
    },
    customerPhone: {
      type: String,
    },
    notes: {
      type: String,
    },
    notificationSent: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const PreOrder = mongoose.model('PreOrder', preOrderSchema);

export default PreOrder;
