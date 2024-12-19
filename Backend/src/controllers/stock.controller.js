// Import the Mongoose library for MongoDB interaction.
import mongoose from "mongoose";

// Import the Product model, which defines the structure of stock items in the database.
import { Product } from "../models/stock.model.js";
import { Farmer } from "../models/farmer.model.js";
// Import the asyncHandler utility, which simplifies error handling for asynchronous route handlers.
import { asyncHandler } from "../utils/asyncHandler.js";

// Import the ApiError utility for creating custom API error responses.
import { ApiError } from "../utils/ApiError.js";

// Import the ApiResponse utility for creating standardized API response objects.
import { ApiResponse } from "../utils/ApiResponse.js";

// Controller function to add a new stock item.
export const addStock = asyncHandler(async (req, res) => {
    // Destructure the stock item details from the request body.
    const { Mrp, description, units, date_of_produce, growing_practices, place_of_origin, product_id, username, category } = req.body;

    // Find the farmer using the unique username
    const farmer = await Farmer.findOne({ username });
    if (!farmer) {
      return res.status(404).json({ message: "Farmer not found" });
    }

    // Create a new Product instance with the provided details.
    const newStock = new Product({
        // If a file is uploaded, store its path in the `photo` field; otherwise, set it to null.
        photo: req.file ? req.file.path : null,
        Mrp,
        description,
        units,
        date_of_produce,
        growing_practices,
        place_of_origin,
        product_id,
        username,
        farmerId : farmer._id,
        category
    });

    // Save the new stock item to the database.
    await newStock.save();

    // Respond with a 201 status code and a success message, along with the saved stock item.
    return res.status(201).json({
        message : "Stock item added successfully", 
        newStock
    });
});

// Controller function to get stock details by either productId or category.
export const getStockDetails = asyncHandler(async (req, res) => {
    const { searchParam } = req.params;

    let stockItem;

    if (mongoose.isValidObjectId(searchParam)) {
        // Find by ID if searchParam is a valid ObjectId
        stockItem = await Product.findById(searchParam);
        if (!stockItem) {
            throw new ApiError("Product not found", 404);
        }
    } else {
        // Otherwise, search by category
        stockItem = await Product.find({ category: searchParam });
        if (!stockItem ) {
            throw new ApiError("No products found in this category", 404);
        }
    }

    return res.status(200).json(stockItem); // Directly return the stockItem object(s)
});

// // Controller function to get stock details by either `productId` or `category`.
// export const getStockDetails = asyncHandler(async (req, res) => {
//     // Extract the `searchParam` from the request parameters.
//     const { searchParam } = req.params;

//     let stockItem;

//     // Check if `searchParam` is a valid MongoDB ObjectId.
//     if (mongoose.isValidObjectId(searchParam)) {
//         // If valid, search for the stock item by `productId` (i.e., using `searchParam` as an ID).
//         stockItem = await Product.findById(searchParam);

//         // If no product is found, throw a 404 error with a "Product not found" message.
//         if (!stockItem) {
//             throw new ApiError("Product not found", 404);
//         }
//     } else {
//         // If `searchParam` is not a valid ObjectId, assume it's a category name and search for products in that category.
//         stockItem = await Product.find({ category: searchParam });

//         // If no products are found in the given category, throw a 404 error with a "No products found in this category" message.
//         if (!stockItem || stockItem.length === 0) {
//             //throw new ApiError("No products found in this category", 404);
//             return res.status(404,{
//                 statusCode : 404,
//                 message : "No products found in this category"
//             })
//         }
//     }

//     // Respond with a 200 status code and the retrieved product(s).
//     return res.status(200).json(new ApiResponse("Product(s) retrieved successfully", stockItem));
// });


// Other controllers remain the same...

// Get all stock items, optionally filtering by category
// Controller function to get all stock items, optionally filtering by category.
export const getAllStock = asyncHandler(async (req, res) => {
    const { category } = req.query;

    const query = category ? { category } : {};

    const allStock = await Product.find(query);

    if (!allStock || allStock.length === 0) {
        //throw new ApiError("No products found", 404);
        console.log("No Product found!")
        return res.status(404).json(new ApiResponse.error(res, 404, "No products found", null));
    }

    return res.status(200).json(allStock); // Directly return the allStock array
});
// export const getAllStock = asyncHandler(async (req, res) => {
//     const { category } = req.query;

//     const query = category ? { category } : {};

//     const allStock = await Product.find(query);

//     if (!allStock || allStock.length === 0) {
//         // throw new ApiError("No products found", 404);
//         return res.status(404,{
//             statusCode : 404,
//             message : "No products found"
//         })
//     }

//     return res.status(200).json(new ApiResponse("All products retrieved successfully", allStock));
// });

// Update a stock item by productId
export const updateStock = asyncHandler(async (req, res) => {
    const { productId } = req.params;
    const updateData = req.body;

    const updatedStock = await Product.findByIdAndUpdate(productId, updateData, { new: true, runValidators: true });

    if (!updatedStock) {
        throw new ApiError("Product not found", 404);
    }

    return res.status(200).json(new ApiResponse("Product updated successfully", updatedStock));
});

// Delete a stock item by productId
export const deleteStock = asyncHandler(async (req, res) => {
    const { productId } = req.params;

    const deletedStock = await Product.findByIdAndDelete(productId);

    if (!deletedStock) {
        throw new ApiError("Product not found", 404);
    }

    return res.status(200).json(new ApiResponse("Product deleted successfully", deletedStock));
});
/*
import mongoose, { isValidObjectId } from "mongoose";
import { Product } from "../models/stock.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
/*
// Controller to add a new stock item
const addStock = asyncHandler(async (req, res) => {
    const { photo, Mrp, description, units, date_of_produce, growing_practices, place_of_origin, product_id, seller_name } = req.body;

    const newStock = new Product({
        photo,
        Mrp,
        description,
        units,
        date_of_produce,
        growing_practices,
        place_of_origin,
        product_id,
        seller_name,
    });

    //images as files
    const photoLocation = req.files?.photo[0]?.path
    // if(!photoLocation){
    //     throw new ApiError(400 , "photo is required to be uploaded!")
    // }
    const stockPhoto = await uploadOnCloudinary(photoLocation)
    if(
        [Mrp,description,units,date_of_produce,growing_practices,place_of_origin,product_id,seller_name,].some( (field) => {
        field?.trim === ""
        })
    ){
        throw new ApiError(400,"all fields are required!")
    }

    Product.create({
        Mrp,
        description,
        units,
        date_of_produce,
        growing_practices,
        place_of_origin,
        product_id,
        seller_name,
        //photo : stockPhoto.url || "",
        photo

    })

    await newStock.save();
    res.status(201).json(new ApiResponse("Stock item added successfully", newStock));
});


import { Product } from "../models/stock.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
*/


/*
const addStock = asyncHandler(async (req, res) => {
    const { Mrp, description, units, date_of_produce, growing_practices, place_of_origin, product_id, seller_name } = req.body;

    // if ([Mrp, description, units, date_of_produce, growing_practices, place_of_origin, product_id, seller_name].some(
    //     (field) => !field?.trim()
    // )) {
    //     throw new ApiError(400, "All fields are required!");
    // }

    const photoFile = req.file; // This will be the photo uploaded via multer
    let photoPath = "";

    if (photoFile) {
        photoPath = photoFile.path; // Save the file path to the database
    }

    const newStock = new Product({
        Mrp,
        description,
        units,
        date_of_produce,
        growing_practices,
        place_of_origin,
        product_id,
        seller_name,
        photo: photoPath,
    });

    await newStock.save();
    res.status(201).json(new ApiResponse("Stock item added successfully", newStock));
});



// Controller to get details of a specific stock item
const getStockDetails = asyncHandler(async (req, res) => {
    console.log(req.body);
    const photo = req.file;
      
    const { productId } = req.params;

    // if (!isValidObjectId(productId)) {
    //     throw new ApiError("Invalid Product ID", 400);
    // }

    const stock = await Product.findById(productId);

    if (!stock) {
        throw new ApiError("Stock item not found", 404);
    }

    res.status(200).json(new ApiResponse("Stock item retrieved successfully", stock));
});

// Controller to get all stock items
const getAllStock = asyncHandler(async (req, res) => {
    const allStock = await Product.find();

    if (!allStock || allStock.length === 0) {
        throw new ApiError("No stock items found", 404);
    }

    res.status(200).json(new ApiResponse("All stock items retrieved successfully", allStock));
});

// Controller to update a stock item
const updateStock = asyncHandler(async (req, res) => {
    const { productId } = req.params;
    const updateData = req.body;

    if (!isValidObjectId(productId)) {
        throw new ApiError("Invalid Product ID", 400);
    }

    const updatedStock = await Product.findByIdAndUpdate(productId, updateData, { new: true, runValidators: true });

    if (!updatedStock) {
        throw new ApiError("Stock item not found", 404);
    }

    res.status(200).json(new ApiResponse("Stock item updated successfully", updatedStock));
});

// Controller to delete a stock item
const deleteStock = asyncHandler(async (req, res) => {
    const { productId } = req.params;

    if (!isValidObjectId(productId)) {
        throw new ApiError("Invalid Product ID", 400);
    }

    const deletedStock = await Product.findByIdAndDelete(productId);

    if (!deletedStock) {
        throw new ApiError("Stock item not found", 404);
    }

    res.status(200).json(new ApiResponse("Stock item deleted successfully", deletedStock));
});

export {
    addStock,
    getStockDetails,
    getAllStock,
    updateStock,
    deleteStock,
};
*/

