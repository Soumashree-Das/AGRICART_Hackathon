import mongoose, { isValidObjectId } from "mongoose";
import { DeliveryPartner } from "../models/deliverypartner.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// Controller to add a new delivery partner
const addDeliveryPartner = asyncHandler(async (req, res) => {
    const { partnerId, name, phoneNumber, email, address, serviceArea, bankingInfo } = req.body;

    const newDeliveryPartner = new DeliveryPartner({
        partnerId,
        name,
        phoneNumber,
        email,
        address,
        serviceArea,
        bankingInfo,
    });

    // Check if the delivery partner already exists
    const existedPartner = await DeliveryPartner.findOne({
        $or: [{ partnerId }, { phoneNumber }, { email }]
    });
    if (existedPartner) {
        throw new ApiError(409, "Partner ID, Phone Number, or Email already exists");
    }

    await newDeliveryPartner.save();

    res.status(201).json(new ApiResponse("Delivery Partner added successfully", newDeliveryPartner));
});

// Controller to get details of a specific delivery partner by ID
const getDeliveryPartnerDetails = asyncHandler(async (req, res) => {
    const { partnerId } = req.params;

    const partner = await DeliveryPartner.findById(partnerId);

    if (!partner) {
        throw new ApiError("Delivery Partner not found", 404);
    }

    res.status(200).json(new ApiResponse("Delivery Partner details retrieved successfully", partner));
});

// Controller to get all delivery partners
const getAllDeliveryPartners = asyncHandler(async (req, res) => {
    const allPartners = await DeliveryPartner.find();

    if (!allPartners || allPartners.length === 0) {
        throw new ApiError("No delivery partners found", 404);
    }

    res.status(200).json(new ApiResponse("All delivery partners retrieved successfully", allPartners));
});

// Controller to update a delivery partner by ID
const updateDeliveryPartner = asyncHandler(async (req, res) => {
    const { partnerId } = req.params;
    const updateData = req.body;

    if (!isValidObjectId(partnerId)) {
        throw new ApiError("Invalid Partner ID", 400);
    }

    const updatedPartner = await DeliveryPartner.findByIdAndUpdate(partnerId, updateData, { new: true, runValidators: true });

    if (!updatedPartner) {
        throw new ApiError("Delivery Partner not found", 404);
    }

    res.status(200).json(new ApiResponse("Delivery Partner updated successfully", updatedPartner));
});

// Controller to delete a delivery partner by ID
const deleteDeliveryPartner = asyncHandler(async (req, res) => {
    const { partnerId } = req.params;

    if (!isValidObjectId(partnerId)) {
        throw new ApiError("Invalid Partner ID", 400);
    }

    const deletedPartner = await DeliveryPartner.findByIdAndDelete(partnerId);

    if (!deletedPartner) {
        throw new ApiError("Delivery Partner not found", 404);
    }

    res.status(200).json(new ApiResponse("Delivery Partner deleted successfully", deletedPartner));
});

export {
    addDeliveryPartner,
    getDeliveryPartnerDetails,
    getAllDeliveryPartners,
    updateDeliveryPartner,
    deleteDeliveryPartner
};