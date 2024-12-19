import { Router } from 'express';
import { createOrder, getOrderByUserId, updateOrderStatus, deleteOrder , getAllOrders , getOrderByFarmerId} from '../controllers/order.controller.js';

const router = Router();

// Route to create a new order
router.post('/order', createOrder); // Create a new order 
//http://localhost:3026/api/v1/orders/order

// Route to get an order by its ID
router.get('/order/user/:userId', getOrderByUserId); // Get a specific order
//http://localhost:3026/api/v1/orders/order/:userId

// Route to update the order status
router.put('/order/status', updateOrderStatus); // Update order status
//http://localhost:3026/api/v1/orders/order/status

// Route to delete an order
router.delete('/order/:orderId', deleteOrder); // Delete an order
//http://localhost:3026/api/v1/orders/order/:orderId

// Route to delete an order
router.get('/', getAllOrders); // Delete an order
//http://localhost:3026/api/v1/orders/

// Route to delete an order
router.get('/order/farmer/:farmerId', getOrderByFarmerId); // Delete an order
//http://localhost:3026/api/v1/orders/order/:farmerId

export default router;




 







// /*import { Router } from 'express';
// //import { createOrder, getOrderById, updateOrderStatus,deleteOrder } from '../controllers/order.controller.js';
// import { createOrder } from '../controllers/order.controller.js';
// //import { protect } from '../middlewares/orderprotect.middleware.js'; // Uncomment to protect routes

// // Creating the router object
// const router = Router();

// // Route to create a new order
// router.post('/orderNew', createOrder); //http://localhost:3026/api/v1/orders/orderNew

// router.post('/verify-payment', (req, res) => { //http://localhost:3026/api/v1/orders/verify-payment
//     const { order_id, razorpay_payment_id, razorpay_signature } = req.body;

//     // Generate HMAC SHA256 signature using 'order_id|razorpay_payment_id' and secret
//     const secret = 'adqQixpGFsGc3vHMsrqRw6o1';  // Replace with your Razorpay Secret Key
//     const generated_signature = crypto.createHmac('sha256', secret)
//         .update(order_id + '|' + razorpay_payment_id)
//         .digest('hex');

//     // Compare generated signature with razorpay_signature
//     if (generated_signature === razorpay_signature) {
//         res.status(200).json({
//             success: true,
//             message: 'Payment is successful and verified!',
//         });
//     } else {
//         res.status(400).json({
//             success: false,
//             message: 'Signature verification failed!',
//         });
//     }
// });

// // Route to get all orders for a specific user
// // router.get('/myorders/:orderId', getOrderById);  //http://localhost:3026/api/v1/orders/myorders/66c6968ad2554f0394f3a289

// // // Route to update order status
// // router.put('/status', updateOrderStatus); //http://localhost:3026/api/v1/orders/status

// // // Route to delete an order
// // router.delete('/myorders/:orderId', deleteOrder);  //http://localhost:3026/api/v1/orders/myorders/66c6968ad2554f0394f3a289


// // Uncomment the following lines to protect routes with authentication middleware
//  //router.post('/', protect, createOrder);
// // router.get('/myorders', protect, getOrdersByUser);
// // router.put('/status', protect, updateOrderStatus);

// export default router;
// */

// import { Router } from "express";
// import crypto from "crypto";
// import { createOrder,
//     getOrderById,
//     updateOrderStatus,
//     deleteOrder,
//     verifyPayment,} from "../controllers/order.controller.js";

// const router = Router();

// // Route to create a new order
// router.post("/orderNew", createOrder);

// // Route to get a specific order by its ID
// router.get("/myorders/:orderId", getOrderById);

// // Route to update order status
// router.put("/status", updateOrderStatus);

// // Route to delete an order
// router.delete("/myorders/:orderId", deleteOrder);


// //router.get("/getsignature",verifyPaymentSignature)
// // Route to verify payment
// router.post("/verify-payment", (req, res) => {try{
//     const { order_id, razorpay_payment_id, razorpay_signature } = req.body;

//     const razorpaySecret = process.env.RAZORPAY_SECRET_KEY;

//     // Generate signature
//     const generatedSignature = crypto.createHmac('sha256', razorpaySecret)
//                                     .update(`${order_id}|${razorpay_payment_id}`)
//                                     .digest('hex');

//     // Verify signature
//     if (generatedSignature === razorpay_signature) {
//         return res.json({ success: true, message: 'Payment verified successfully!' });
//     } else {
//         return res.status(400).json({ success: false, message: 'Signature verification failed!' });
//     }
// }catch(error){
//     console.log(error);
//     res.status(400).json({message,error});
// }
// });

// export default router;



