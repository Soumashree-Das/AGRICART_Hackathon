import mongoose from 'mongoose';

const { Schema } = mongoose;

const cartSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    required: true,
  },
  products: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId ,
        ref: 'Product', // Reference to the Stock model
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        min: 1, // Ensuring at least 1 product is ordered
      },
    },
  ],
  totalPrice: {
    type: Number,
    required: true,
    default: 0, // Initializing to 0
  },
}, { timestamps: true });

// Pre-save middleware to calculate the total price before saving the cart
cartSchema.pre('save', async function (next) {
  const cart = this;

  // Calculate the total price
  cart.totalPrice = 0; // Reset totalPrice to 0
  for (let item of cart.products) {
    const product = await mongoose.model('Product').findById(item.productId);
    if (product) {
      cart.totalPrice += product.Mrp * item.quantity;
    }
  }

  next();
});

export const Cart = mongoose.model('Cart', cartSchema);
