import { Router } from 'express';
import { addToCart, checkoutCart, getCartByUserId, deleteFromCart } from '../controllers/cart.controller.js';

const router = Router();

// Route to add a product to the cart
router.post('/add', addToCart);

// Route to delete a specific quantity of an item from the cart
router.delete('/delete', deleteFromCart);  // New route for deleting items

// Route to checkout and create an order
router.post('/checkout', checkoutCart);

// Route to get cart by user ID
router.get('/:userId', getCartByUserId);

export default router;
