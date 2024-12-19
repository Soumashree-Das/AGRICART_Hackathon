//***--use diff username , email , phonenumber for new registration--***

import mongoose , { isValidObjectId } from "mongoose";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// Controller to add a new user
    //check if user already exist - check user name and emai existence
    //cover image - if available upload to cloudinary
    //create user object - create entry in db
    //remove password and refresh token field
    //check for user creattion
    //return res

const addUser = asyncHandler(async (req, res) => {
    const { username, name, password, gender, address, pincode, email, phoneNumber } = req.body;

    //notworking
    //validate user - if any field is empty
    if(
        [username, name, password, gender, address, pincode, email, phoneNumber].some( (field) => {
        field?.trim() === ""
        }) 
    ){
        //throw new ApiError(400,"name,username,password,email are required!")
        return res.status(400).json(new ApiResponse(
            400,
            null,
            "all fields are required!"
        ))
    }

    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
        return res.status(409).json(new ApiResponse(
            409,
            null,
            "Username or email already exists!"
        ));
    }

    // const createdUser = await User.findById(newUser._id).select(
    //     "-password -refreshtoken"
    // )

    // if (!createdUser) {
    //     throw new ApiError(500, "server error")
    // }

    // Create and save the new user
    const newUser = new User({
        username,
        name,
        password,
        gender,
        address,
        pincode,
        email,
        phoneNumber,
    });
    try {
        await newUser.save();
        return res.status(201).json(new ApiResponse("User added successfully", newUser));
    } catch (error) {
        if (error.code === 11000) {
            return res.status(409).json(new ApiResponse(
                409,
                null,
                "Duplicate key error/Username , enail or phonenumber already exists!"
            ));
        }
        return res.status(500).json(new ApiResponse(
            500,
            null,
            "Internal server error"
        ));
    }
});

const loginUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;

    if (!username && !email) {
        return res.status(400).json(new ApiResponse(
            400,
            null,
            "Username or email is required!"
        ));
    }

    // Find user by username or email
    const user = await User.findOne({
        $and: [{ username }, { email }]
    });

    if (!user) {
        //throw new ApiError(404,"user not found")
        console.log("User not found! status code 404");
        return res.status(404).json({
            statuscode:404,
            message:"user not found"
        })
    }else{
        // Check if the password is correct
        const isPasswordValid = await user.isPasswordCorrect(password);
        if (!isPasswordValid) {
        return res.status(401).json(new ApiResponse(
            401,
            null,
            "Password is incorrect!"
        ));
        }
    }

    // Generate access and refresh tokens
    const generateAccessandRefreshToken = async (user) => {
        try {
            const accesstoken = user.generateAccessToken();
            const refreshtoken = user.generateRefreshToken();
            user.refreshtoken = refreshtoken;
            await user.save({ validateBeforeSave: false });
            

            // Use the tokens directly here
            // For example, set them in response headers or any other processing
            res.setHeader('Authorization', `Bearer ${accesstoken}`);
            res.setHeader('Refresh-Token', refreshtoken);
            return { accesstoken, refreshtoken };
        } catch (error) {
            console.log("server error:  ",501)
            throw new ApiError(501, "Something went wrong while generating tokens!");
        }
    };

    try {
        // Get the generated tokens
        //const tokens = await generateAccessandRefreshToken(user);
        const { accesstoken, refreshtoken } = await generateAccessandRefreshToken(user);

        // Exclude password and refreshToken from the user details
        const loggedInUser = await User.findById(user._id).select("-password -refreshtoken");

        // Return the tokens and user details in the response body
        return res.status(200)
        .json({loggedInUser , accesstoken , refreshtoken})
        // .json(new ApiResponse(
        //     200,
        //     { user: loggedInUser, accesstoken, refreshtoken },
        //     "User Logged In Successfully!"
        // ));
    } catch (error) {
        // Handle any errors during token generation
        // return res.status(500).json(new ApiResponse(
        //     500,
        //     null,
        //     "A internal server error occurred during login. Please try again."
        // ));
        console.log(error);
        throw new ApiError(500,"server issue")
    }
});

// const logOutUser = asyncHandler(async(req,res)=>{
//     await User.findByIdAndUpdate(
//         req.user._id,
//         {
//             $unset:{
//                 refreshtoken : 1//removes the field from doc
//             }
//         },
//         {
//             new : true
//         }
//     )

//     const options = {
//         httpOnly : true,
//         secure : true
//     }

//     return res
//     .status(200)
//     .clearCookie("accessToken", options)
//     .clearCookie("refreshToken", options)
//     .json(new ApiResponse(200, {}, "User logged Out"))
// })

// Controller to get details of a specific user by ID
const getUserDetails = asyncHandler(async (req, res) => {
    const { userId } = req.params;

    // if (!isValidObjectId(userId)) {
    //     throw new ApiError("Invalid User ID", 400);
    // }

    const user = await User.findById(userId);

    if (!user) {
        throw new ApiError("User not found", 404);
    }

    res.status(200).json(new ApiResponse("User details retrieved successfully", user));
});

// Controller to get all users
const getAllUsers = asyncHandler(async (req, res) => {
    const allUsers = await User.find();

    if (!allUsers || allUsers.length === 0) {
        throw new ApiError("No users found", 404);
    }

    res.status(200).json(new ApiResponse("All users retrieved successfully", allUsers));
});

// Controller to update a user by ID
const updateUser = asyncHandler(async (req, res) => {
    const { userId } = req.params;
    const updateData = req.body;

    if (!isValidObjectId(userId)) {
        throw new ApiError("Invalid User ID", 400);
    }

    const updatedUser = await User.findByIdAndUpdate(userId, updateData, { new: true, runValidators: true });

    if (!updatedUser) {
        //throw new ApiError("User not found", 404);
        return res.status(404).json({
            message : "User not found"
        })
    }

    return res.status(200).json({
        message : "user updates successfully",
        updatedUser
    });
});

// Controller to delete a user by ID
const deleteUser = asyncHandler(async (req, res) => {
    const { userId } = req.params;

    if (!isValidObjectId(userId)) {
        //throw new ApiError("Invalid User ID", 400);
        return res.status(404).json({
            message : "Invalid userId"
        })
    }

    const deletedUser = await User.findByIdAndDelete(userId);


    //check if deletion was successful or not
    // if (!deletedUser) {
    //     throw new ApiError("User not found", 404);
    // }

    res.status(200).json(new ApiResponse("User deleted successfully", deletedUser));
});

export {
    addUser,
    loginUser,
    //logOutUser,
    getUserDetails,
    getAllUsers,
    updateUser,
    deleteUser
};