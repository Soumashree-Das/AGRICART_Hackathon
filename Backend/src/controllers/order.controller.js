import mongoose from "mongoose";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Order } from '../models/order.model.js';
import { Product } from '../models/stock.model.js';
import { ApiResponse } from "../utils/ApiResponse.js";
import { Farmer } from "../models/farmer.model.js";
// Create a new order
const createOrder = async (req, res) => {
  const session = await Order.startSession();
  session.startTransaction();
  try {
    const { userId, products, address, pincode } = req.body;
    let totalAmount = 0;
    const productUpdates = [];

    // // Validate address
    // if (!address || typeof address !== 'object') {
    //   throw new Error('Address must be a valid object');
    // }

    // Calculate the total amount and check stock availability
    for (const item of products) {
      const product = await Product.findById(item.productId).session(session);

      if (!product) throw new Error(`Product with ID ${item.productId} not found`);

      if (typeof product.Mrp !== 'number' || isNaN(product.Mrp) || product.Mrp <= 0) {
        throw new Error(`Product ${product.product_id || item.productId} has an invalid price`);
      }

      if (product.units < item.quantity) throw new Error(`Not enough stock for ${product.description || item.productId}`);

      totalAmount += product.Mrp * item.quantity;

      productUpdates.push({
        updateOne: {
          filter: { _id: product._id },
          update: { $inc: { units: -item.quantity } },
        },
      });
    }

    // Create order in the database
    const order = new Order({
      userId,
      products,
      totalAmount,
      address,
      pincode
      // address: {
      //   street: address.street,
      //   city: address.city,
      //   state: address.state,
      //   zip: address.zip,
      //   country: address.country,
      // },
      // paymentDetails: {
      //   paymentMethod,
      //   status: 'Paid', // Assuming payment is successful
      //   transactionId: "dummyTransactionId", // Replace with actual transaction ID if available
      // },
    });

    await order.save({ session });
    await Product.bulkWrite(productUpdates, { session });

    await session.commitTransaction();
    session.endSession();

    return ApiResponse.success(res, 201, 'Order created successfully', { order });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    return ApiResponse.error(res, 500, 'Error creating order', error.message);
  }
};
// Get an order by ID
// const getOrderById = async (req, res) => {
//   try {
//     const order = await Order.findById(req.params.orderId)
//     //.populate('products.productId');
//     if (!order) return ApiResponse.error(res, 404, 'Order not found');

//     return ApiResponse.success(res, 200, 'Order retrieved successfully', { order });
//   } catch (error) {
//     return ApiResponse.error(res, 500, 'Error retrieving order', error.message);
//   }
// };

// Update order status
const updateOrderStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;
    const order = await Order.findByIdAndUpdate(orderId, { status }, { new: true });
    if (!order) return ApiResponse.error(res, 404, 'Order not found');

    return ApiResponse.success(res, 200, 'Order status updated', { order });
  } catch (error) {
    return ApiResponse.error(res, 500, 'Error updating order status', error.message);
  }
};

// Delete an order
const deleteOrder = async (req, res) => {
  const session = await Order.startSession();
  session.startTransaction();

  try {
    const order = await Order.findById(req.params.orderId).session(session);
    if (!order) return ApiResponse.error(res, 404, 'Order not found');

    const productUpdates = order.products.map((item) => ({
      updateOne: {
        filter: { _id: item.productId },
        update: { $inc: { units: item.quantity } },
      },
    }));

    await Order.findByIdAndDelete(req.params.orderId).session(session);
    await Product.bulkWrite(productUpdates, { session });

    await session.commitTransaction();
    session.endSession();

    return ApiResponse.success(res, 200, 'Order deleted and stock restored successfully');
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    return ApiResponse.error(res, 500, 'Error deleting order', error.message);
  }
};

// Controller to get all delivery partners
const getAllOrders = asyncHandler(async (req, res) => {
  const allOrders = await Order.find();

  if (!allOrders || allOrders.length === 0) {
      throw new ApiError("No orders found", 404);
  }

  return res.status(200).json({allOrders});
});

//get order by user id
const getOrderByUserId = async (req, res) => {
  try {
    const userId = req.params.userId;

    const orders = await Order.find({ userId })
      .populate('userId', 'username name gender address pincode email phoneNumber')
      .populate({
        path: 'products.productId',
        select: 'photo description Mrp ', // Include photo in the selection
      });

    if (orders.length === 0 ) {
      return res.status(404).json({ message: 'Order not found for this user' });
    }

    return res.status(200).json(orders);
  } catch (error) {
    console.error('Error retrieving cart:', error.message);
    res.status(500).json({ message: 'Error retrieving cart', error: error.message });
  }
};

// //get order by user id
// const getOrderByFarmerId = async (req, res) => {
//   try {
//     const farmerId = req.params.farmerId;

//     // First, find all products associated with the farmer
//     const products = await Product.find({ farmerId });

//     if (products.length === 0) {
//       return res.status(404).json({ message: 'No products found for this farmer' });
//     }

//     // Extract product IDs
//     const productIds = products.map(product => product._id);

//     // Now find all orders that contain these products
//     const orders = await Order.find({ 'products.productId': { $in: productIds } })
//       .populate('farmerId', 'username name password gender address pincode state email farmingCertifications farmingDetails phoneNumber')
//       .populate({
//         path: 'products.productId',
//         select: 'photo description Mrp', // Include product photo, description, and Mrp
//       });

//     if (orders.length === 0) {
//       return res.status(404).json({ message: 'No orders found for this farmer' });
//     }

//     return res.status(200).json(orders);
//   } catch (error) {
//     console.error('Error retrieving orders:', error.message);
//     res.status(500).json({ message: 'Error retrieving orders', error: error.message });
//   }
// };

const getOrderByFarmerId = async (req, res) => {
  try {
    const { username } = req.params;

    // First, find the farmer using the unique username
    const farmer = await Farmer.findOne({ username });

    if (!farmer) {
      return res.status(404).json({ message: 'Farmer not found' });
    }

    const farmerId = farmer._id;

    // Then, find all products associated with this farmerId
    const products = await Product.find({ farmerId });

    if (products.length === 0) {
      return res.status(404).json({ message: 'No products found for this farmer' });
    }

    // Extract product IDs
    const productIds = products.map(product => product._id);

    // Now, find all orders that contain these products
    const orders = await Order.find({ 'products.productId': { $in: productIds } })
      .populate('farmerId', 'username name password gender address pincode state email farmingCertifications farmingDetails phoneNumber')
      .populate({
        path: 'products.productId',
        select: 'photo description Mrp', // Include product photo, description, and Mrp
      });

    if (orders.length === 0) {
      return res.status(404).json({ message: 'No orders found for this farmer' });
    }

    return res.status(200).json(orders);
  } catch (error) {
    console.error('Error retrieving orders:', error.message);
    res.status(500).json({ message: 'Error retrieving orders', error: error.message });
  }
};

export { createOrder , getOrderByUserId , updateOrderStatus , deleteOrder , getAllOrders , getOrderByFarmerId };





















// //import { Order } from "../models/order.model.js";
// // import { Product } from "../models/stock.model.js";
// // import mongoose from "mongoose";
// // /**
// //  * Create a new order.
// //  * This controller handles the creation of a new order. It checks product availability, 
// //  * calculates the total amount, decrements the stock, and saves the order.
// //  * 
// //  * @param {Object} req - The request object containing userId, products, and address.
// //  * @param {Object} res - The response object for sending the result back to the client.
// //  */
// // const createOrder = async (req, res) => {
// //   const session = await Order.startSession(); // Start a session for atomic transaction
// //   session.startTransaction();

// //   try {
// //     const { userId, products, address  } = req.body;

// //     console.log('Received products:', products);
// //     console.log('Received address:', address);

// //     let totalAmount = 0;
// //     const productUpdates = [];

// //     // Loop through each product in the order to calculate total amount and check stock
// //     for (const item of products) {
// //       const product = await Product.findById(item.productId).session(session);

// //       if (!product) {
// //         console.error(Product with ID ${item.productId} not found);
// //         throw new Error(Product with ID ${item.productId} not found);
// //       }

// //       console.log(Product found: ${product.description}, Price: ${product.Mrp}, Stock: ${product.units});

// //       if (product.units < item.quantity) {
// //         throw new Error(Not enough stock for ${product.description});
// //       }

// //       totalAmount += product.Mrp * item.quantity;

// //       // Prepare stock update to decrement the stock
// //       productUpdates.push({
// //         updateOne: {
// //           filter: { _id: product._id },
// //           update: { $inc: { units: -item.quantity } }, // Decrement the stock
// //         },
// //       });
// //     }

// //     console.log('Total amount calculated:', totalAmount);

// //     if (isNaN(totalAmount)) {
// //       throw new Error('Total amount is not a number. Possible issue with product prices.');
// //     }

// //     // Create the order object with the calculated total amount and user-provided data
// //     const order = new Order({
// //       userId,
// //       products,
// //       totalAmount,
// //       address,
// //     });

// //     console.log('Order object before saving:', order);

// //     // Save the order and update the stock in a transactional manner
// //     await order.save({ session });
// //     await Product.bulkWrite(productUpdates, { session });

// //     await session.commitTransaction(); // Commit the transaction
// //     session.endSession();

// //     console.log('Order created successfully:', order);

// //     res.status(201).json({ message: 'Order created successfully', order });
// //   } catch (error) {
// //     await session.abortTransaction(); // Rollback the transaction if something goes wrong
// //     session.endSession();
// //     console.error('Error:', error.message);
// //     res.status(500).json({ message: 'Error creating order', error: error.message });
// //   }
// // };

// // /**
// //  * Get a specific order by its ID.
// //  * This controller retrieves an order by its ID from the database.
// //  * 
// //  * @param {Object} req - The request object containing the orderId as a URL parameter.
// //  * @param {Object} res - The response object for sending the result back to the client.
// //  */
// // const getOrderById = async (req, res) => {
// //   try {
// //     // Extract orderId from the URL parameters
// //     const orderId = req.params.orderId;
// //     console.log('Fetching order with orderId:', orderId); // Log the orderId

// //     // Find the order by its ID and populate the product details
// //     const order = await Order.findById(orderId); //.populate('Order.productId'); // Adjust the populate path if needed

// //     if (!order) {
// //       return res.status(404).json({ message: 'Order not found' });
// //     }

// //     res.status(200).json(order);
// //   } catch (error) {
// //     console.error('Error retrieving order:', error.message); // Log any errors
// //     res.status(500).json({ message: 'Error retrieving order', error: error.message });
// //   }
// // };

// // /**
// //  * Update the status of an order.
// //  * This controller updates the status of an existing order in the database.
// //  * 
// //  * @param {Object} req - The request object containing the orderId and new status.
// //  * @param {Object} res - The response object for sending the result back to the client.
// //  */
// // const updateOrderStatus = async (req, res) => {
// //   try {
// //     const { orderId, status } = req.body;

// //     // Find the order and update its status
// //     const order = await Order.findByIdAndUpdate(orderId, { status }, { new: true });

// //     if (!order) {
// //       return res.status(404).json({ message: 'Order not found' });
// //     }

// //     res.status(200).json({ message: 'Order status updated successfully', order });
// //   } catch (error) {
// //     res.status(500).json({ message: 'Error updating order status', error: error.message });
// //   }
// // };

// // /**
// //  * Delete an order and restore stock levels.
// //  * This controller deletes an order and rolls back the stock levels to their previous state.
// //  * 
// //  * @param {Object} req - The request object containing the orderId as a URL parameter.
// //  * @param {Object} res - The response object for sending the result back to the client.
// //  */
// // const deleteOrder = async (req, res) => {
// //   const session = await Order.startSession(); // Start a session for atomic transaction
// //   session.startTransaction();

// //   try {
// //     // Extract orderId from the URL parameters
// //     const orderId = req.params.orderId;
// //     console.log('Deleting order with orderId:', orderId); // Log the orderId

// //     // Find the order by its ID
// //     const order = await Order.findById(orderId).session(session);

// //     if (!order) {
// //       await session.abortTransaction();
// //       session.endSession();
// //       return res.status(404).json({ message: 'Order not found' });
// //     }

// //     // Prepare stock updates to restore previous state
// //     const productUpdates = order.products.map(item => ({
// //       updateOne: {
// //         filter: { _id: item.productId },
// //         update: { $inc: { units: item.quantity } }, // Restore the stock
// //       },
// //     }));

// //     // Delete the order
// //     await Order.findByIdAndDelete(orderId).session(session);

// //     // Restore the stock levels
// //     await Product.bulkWrite(productUpdates, { session });

// //     await session.commitTransaction(); // Commit the transaction
// //     session.endSession();

// //     res.status(200).json({ message: 'Order deleted and stock restored successfully' });
// //   } catch (error) {
// //     await session.abortTransaction(); // Rollback the transaction if something goes wrong
// //     session.endSession();
// //     console.error('Error deleting order:', error.message); // Log any errors
// //     res.status(500).json({ message: 'Error deleting order', error: error.message });
// //   }
// // };

// // export {
// //   createOrder,
// //   getOrderById,
// //   updateOrderStatus,
// //   deleteOrder
// // };
// /*
// import Razorpay from 'razorpay';

// // Initialize Razorpay instance with your credentials
// const razorpay = new Razorpay({
//     key_id: process.env.RAZORPAY_ID_KEY,  // Replace with your Razorpay Key ID
//     key_secret: process.env.RAZORPAY_SECRET_KEY  // Replace with your Razorpay Key Secret
// });

// // // Initialize Express app
// // const app = express();
// // app.use(bodyParser.json());  // To parse JSON body

// // API route to create an order
// // app.post('/createOrder',
// const createOrder = async (req, res) => {
//   try {
//       const { amount, currency, receipt, notes } = req.body;

//       // Validate request parameters
//       if (!amount || typeof amount !== 'number' || amount <= 0) {
//           return res.status(400).json({ success: false, message: "Amount is mandatory and must be a positive integer." });
//       }

//       if (!currency || typeof currency !== 'string' || currency.length !== 3) {
//           return res.status(400).json({ success: false, message: "Currency is mandatory and must be a 3-character string." });
//       }

//       if (!receipt || typeof receipt !== 'string' || receipt.length > 40) {
//           return res.status(400).json({ success: false, message: "Receipt is mandatory and must be a string with a maximum length of 40 characters." });
//       }

//       if (notes && (typeof notes !== 'object' || Object.keys(notes).length > 15 || 
//                     Object.values(notes).some(note => typeof note !== 'string' || note.length > 256))) {
//           return res.status(400).json({ success: false, message: "Notes must be a JSON object with a maximum of 15 key-value pairs, each with a maximum of 256 characters." });
//       }

//       // Create order options
//       const options = {
//           amount: amount * 100, // Convert amount to smallest sub-unit (paise for INR)
//           currency: currency.toUpperCase(),
//           receipt: receipt,
//           notes: notes || {}
//       };

//       // Create an order using Razorpay instance
//       const razorpayOrder = await razorpay.orders.create(options);

//       // Prepare the order data to save in the database
//       const orderData = {
//           id: razorpayOrder.id,
//           entity: razorpayOrder.entity,
//           amount: razorpayOrder.amount,
//           amount_paid: razorpayOrder.amount_paid,
//           amount_due: razorpayOrder.amount_due,
//           currency: razorpayOrder.currency,
//           receipt: razorpayOrder.receipt,
//           offer_id: razorpayOrder.offer_id,
//           status: razorpayOrder.status,
//           attempts: razorpayOrder.attempts,
//           notes: razorpayOrder.notes,
//           created_at: razorpayOrder.created_at
//       };

//       // Save the order in the database
//       const order = new Order(orderData);
//       await order.save();

//       // Return the order details as a JSON response
//       res.status(200).json({
//           success: true,
//           order: orderData
//       });
//   } catch (error) {
//       // Handle errors and return error message
//       res.status(500).json({
//           success: false,
//           error: error.message
//       });
//       console.log(error)
//   }
// };

// export {createOrder}
// // Start the server on port 3000
// // const PORT = 3000;
// // app.listen(PORT, () => {
// //     console.log(Server is running on port ${PORT});
// // });
// */
// import mongoose from "mongoose";
// import Razorpay from "razorpay";
// import crypto from 'crypto';
// import { Order } from "../models/order.model.js";
// import { Product } from "../models/stock.model.js";

// // Initialize Razorpay instance
// const razorpayInstance = new Razorpay({
//     key_id: process.env.RAZORPAY_ID_KEY,
//     key_secret: process.env.RAZORPAY_SECRET_KEY
// });

// // Create a new order
// const createOrder = async (req, res) => {
//     const session = await Order.startSession();
//     session.startTransaction();

//     try {
//         const { userId, products, address } = req.body;
//         let totalAmount = 0;
//         const productUpdates = [];

//         for (const item of products) {
//             const product = await Product.findById(item.productId).session(session);

//             if (!product) throw new Error(`Product with ID ${item.productId} not found`);
//             if (product.units < item.quantity) throw new Error(`Not enough stock for ${product.description}`);

//             totalAmount += product.Mrp * item.quantity;
//             productUpdates.push({
//                 updateOne: {
//                     filter: { _id: product._id },
//                     update: { $inc: { units: -item.quantity } },
//                 },
//             });
//         }

//         const options = {
//             amount: totalAmount * 100, // Convert to smallest currency unit (paise for INR)
//             currency: "INR",
//             receipt: `receipt_${new Date().getTime()}`,
//         };

//         const razorpayOrder = await razorpayInstance.orders.create(options);

//         const order = new Order({
//             userId,
//             products,
//             totalAmount,
//             address,
//             razorpayOrder: {
//                 id: razorpayOrder.id,
//                 amount: razorpayOrder.amount,
//                 amount_due: razorpayOrder.amount_due,
//                 amount_paid: razorpayOrder.amount_paid,
//                 currency: razorpayOrder.currency,
//                 status: razorpayOrder.status,
//                 receipt: razorpayOrder.receipt,
//                 created_at: razorpayOrder.created_at,
//             },
//         });

//         await order.save({ session });
//         await Product.bulkWrite(productUpdates, { session });

//         await session.commitTransaction();
//         session.endSession();

//         res.status(201).json({
//             message: "Order created successfully",
//             order,
//             razorpayOrder,
//         });
//     } catch (error) {
//         await session.abortTransaction();
//         session.endSession();
//         res.status(500).json({ message: "Error creating order", error: error.message });
//     }
// };

// // Get order by ID
// const getOrderById = async (req, res) => {
//     try {
//         const orderId = req.params.id;
//         const order = await Order.findById(orderId);
//         if (!order) {
//             return res.status(404).json({ message: 'Order not found' });
//         }
//         res.status(200).json(order);
//     } catch (error) {
//         res.status(500).json({ message: 'Server Error', error: error.message });
//     }
// };
// // Update order status
// const updateOrderStatus = async (req, res) => {
//     try {
//         const { orderId, status } = req.body;
//         const order = await Order.findByIdAndUpdate(orderId, { status }, { new: true });
//         if (!order) return res.status(404).json({ message: "Order not found" });
//         res.status(200).json({ message: "Order status updated successfully", order });
//     } catch (error) {
//         res.status(500).json({ message: "Error updating order status", error: error.message });
//     }
// };

// // Delete an order
// const deleteOrder = async (req, res) => {
//     const session = await Order.startSession();
//     session.startTransaction();

//     try {
//         const orderId = req.params.orderId;
//         const order = await Order.findById(orderId).session(session);
//         if (!order) throw new Error("Order not found");

//         const productUpdates = order.products.map(item => ({
//             updateOne: {
//                 filter: { _id: item.productId },
//                 update: { $inc: { units: item.quantity } },
//             },
//         }));

//         await Order.findByIdAndDelete(orderId).session(session);
//         await Product.bulkWrite(productUpdates, { session });

//         await session.commitTransaction();
//         session.endSession();

//         res.status(200).json({ message: "Order deleted and stock restored successfully" });
//     } catch (error) {
//         await session.abortTransaction();
//         session.endSession();
//         res.status(500).json({ message: "Error deleting order", error: error.message });
//     }
// };

// // Verify Razorpay payment signature
// const verifyPaymentSignature = (paymentId, orderId, razorpay_signature) => {
//     const secret = process.env.RAZORPAY_SECRET_KEY;
//     const generatedSignature = crypto.createHmac('sha256', secret)
//         .update(`${orderId}|${paymentId}`)
//         .digest('hex');

//     console.log(`Generated Signature: ${generatedSignature}`);
//     console.log(`Received Signature: ${razorpay_signature}`);

//     return generatedSignature === razorpay_signature;
// };

// // Endpoint to handle payment verification
// const verifyPayment = async (req, res) => {
//     const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

//     try {
//         const isSignatureValid = verifyPaymentSignature(razorpay_payment_id, razorpay_order_id, razorpay_signature);

//         if (isSignatureValid) {
//             // Proceed with payment confirmation logic here
//             res.status(200).json({ success: true, message: 'Payment verified successfully!' });
//         } else {
//             res.status(400).json({ success: false, message: 'Signature verification failed!' });
//         }
//     } catch (error) {
//         res.status(500).json({ success: false, message: 'Error verifying payment', error: error.message });
//     }
// };

// export { createOrder, getOrderById, updateOrderStatus, deleteOrder, verifyPayment, verifyPaymentSignature};
