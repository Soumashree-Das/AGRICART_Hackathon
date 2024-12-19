import { Cart } from "../models/cart.model.js";
import { Product } from "../models/stock.model.js"; // Ensure this is imported correctly
import { Order } from "../models/order.model.js";

/*
 * Add a product to the cart.
 */
const addToCart = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    // Find the product by ID
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const qty = parseInt(quantity, 10);
    if (isNaN(qty) || qty <= 0) {
      return res.status(400).json({ message: 'Invalid quantity' });
    }

    // Find the cart for the user
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, products: [] });
    }

    const existingProductIndex = cart.products.findIndex(item => item.productId.equals(productId));

    if (existingProductIndex > -1) {
      cart.products[existingProductIndex].quantity += qty;
    } else {
      cart.products.push({ productId, quantity: qty });
    }

    await cart.save();

    return res.status(200).json({ message: 'Product added to cart successfully', cart });
  } catch (error) {
    console.error('Error adding to cart:', error.message);
    return res.status(500).json({ message: 'Error adding to cart', error: error.message });
  }
};

/**
 * Delete a specific quantity of an item from the cart.
 */
/**
 * Delete a specific quantity of an item from the cart.
 */
const deleteFromCart = async (req, res) => {
  try {
      const { userId, productId, quantity } = req.body;

      const cart = await Cart.findOne({ userId });

      if (!cart) {
          return res.status(404).json({ message: 'Cart not found' });
      }

      const qty = parseInt(quantity, 10);
      if (isNaN(qty) || qty <= 0) {
          return res.status(400).json({ message: 'Invalid quantity' });
      }

      const existingProductIndex = cart.products.findIndex(item => item.productId.equals(productId));

      if (existingProductIndex === -1) {
          return res.status(404).json({ message: 'Product not found in cart' });
      }

      const existingProduct = cart.products[existingProductIndex];

      if (existingProduct.quantity <= qty) {
          // Remove the product completely if quantity is less than or equal to the specified quantity
          cart.products.splice(existingProductIndex, 1);
      } else {
          // Reduce the quantity of the product
          existingProduct.quantity -= qty;
      }

      await cart.save();

      return res.status(200).json({ message: 'Product removed from cart successfully', cart });
  } catch (error) {
      console.error('Error deleting from cart:', error.message);
      return res.status(500).json({ message: 'Error deleting from cart', error: error.message });
  }
};


/**
 * Checkout the cart and create an order.
 */
const checkoutCart = async (req, res) => {
  const session = await Cart.startSession();
  session.startTransaction();

  try {
    const { userId, address } = req.body;

    const cart = await Cart.findOne({ userId }).session(session);

    if (!cart || cart.products.length === 0) {
      throw new Error('Cart is empty');
    }

    const order = new Order({
      userId,
      products: cart.products,
      totalAmount: cart.totalPrice,
      address,
    });

    await order.save({ session });
    await Cart.deleteOne({ userId }).session(session);

    await session.commitTransaction();
    session.endSession();

    return res.status(201).json({ message: 'Order created successfully', order });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error('Error during checkout:', error.message);
    return res.status(500).json({ message: 'Error during checkout', error: error.message });
  }
};

// Get the cart by user ID.

const getCartByUserId = async (req, res) => {
  try {
    const userId = req.params.userId;

    const cart = await Cart.findOne({ userId })
      .populate('userId', 'username name gender address pincode email phoneNumber')
      .populate({
        path: 'products.productId',
        select: 'photo description Mrp ', // Include photo in the selection
      });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found for this user' });
    }

    return res.status(200).json(cart);
  } catch (error) {
    console.error('Error retrieving cart:', error.message);
    return res.status(500).json({ message: 'Error retrieving cart', error: error.message });
  }
};

export {
  addToCart,
  deleteFromCart,  // Export the new delete function
  checkoutCart,
  getCartByUserId,
};
