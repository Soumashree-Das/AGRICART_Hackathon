// Import the Router class from the 'express' module to create a new router object.
import { Router } from 'express';

// Import controller functions for handling stock-related requests.
import {
    addStock,        // Controller function to add a new stock item.
    getStockDetails, // Controller function to get stock details by product ID or category.
    getAllStock,     // Controller function to get all stock items, optionally filtered by category.
    updateStock,     // Controller function to update a stock item by product ID.
    deleteStock      // Controller function to delete a stock item by product ID.
} from "../controllers/stock.controller.js";

// Import the upload middleware from Multer to handle file uploads (e.g., photos).
import { upload } from "../middlewares/multer.middleware.js";

// Create a new router object using the Router class.
const router = Router();

// Define a route for getting all stock items or adding a new stock item.
// - GET /: Retrieves all stock items, with optional filtering by category.
// - POST /: Adds a new stock item, with an optional photo upload.
router.route("/")
    .get(getAllStock)                         // Handle GET requests to retrieve all stock items.
    .post(upload.single("photo"), addStock);  // Handle POST requests to add a new stock item with an optional photo upload.

// Define a route for getting, updating, or deleting a stock item by `productId` or `category`.
// - GET /:searchParam: Retrieves stock details by `productId` or `category`.
// - PATCH /:searchParam: Updates a stock item by `productId`.
// - DELETE /:searchParam: Deletes a stock item by `productId`.
router.route("/:searchParam")
    .get(getStockDetails)  // Handle GET requests to retrieve stock details by `productId` or `category`.
    .patch(updateStock)     // Handle PATCH requests to update a stock item by `productId`.
    .delete(deleteStock);   // Handle DELETE requests to delete a stock item by `productId`.

// Export the router object so it can be used in other parts of the application.
export default router;
