import { CSA_plans } from "../models/subscriptionCSA.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";

export const subscriptionNew = asyncHandler(async (req, res) => {
    try{
    const { farmerId , product_culivated ,total_estimated_price ,initial_price , estimated_time_of_produce , subscribers } = req.body;

    // if(
    //     [farmerId , product_culivated ,total_estimated_price ,initial_price , estimated_time_of_produce , subscribers].some( (field) => {
    //     field?.trim() === ""
    //     }) 
    // ){
    //     throw new ApiError(400,"name,username,password,email are required!")
    //     // return res.status(400).json({
    //     //     statuscode : 400,
    //     //     message:"all fields are required!"
    //     // })
    // }

    const newSubscription = new CSA_plans({
        farmerId , 
        product_culivated,
        total_estimated_price ,
        initial_price , 
        estimated_time_of_produce 
    });

    try {
        await newSubscription.save();
        return res.status(201).json({
            newSubscription,
            message:"subscription plan added successfully"
        });
    } catch (error) {
        console.log(error);
        if (error.code === 11000) {
            return res.status(409).json(new ApiResponse(
                409,
                null,
                "Duplicate key error/Username , email or phonenumber already exists!"
            ));
        }
        return res.status(500).json({
            message : "internal server errors"
        });
    }
}catch(err){
    console.log(err);
    return res.status(501).json({
        message : "internal server error"
    })
}
});

export const getAllPlansByFarmerId = async (req, res) => {
    try {
      const farmerId = req.params.farmerId;
  
      const subscriptionPlans = await CSA_plans.find({ farmerId })
        .populate('farmerId', 'username,name,password,gender , address,pincode,state,email,farmingCertifications,farmingDetails,phoneNumber');
  
      if ( !subscriptionPlans ) {
        return res.status(404).json({ message: 'no subscription found for this farmer' });
      }

      if ( subscriptionPlans.length === 0 ) {
        return res.status(404).json({ message: 'subscription db is empty!' });
      }
  
      return res.status(200).json(subscriptionPlans);
    } catch (error) {
      console.error('Error retrieving cart:', error.message);
      res.status(500).json({ message: 'Error retrieving cart', error: error.message });
    }
  };

// Controller to get all delivery partners
export const getAllSubscription = asyncHandler(async (req, res) => {
    const allSubscriptions = await CSA_plans.find();
  
    if (!allSubscriptions || allSubscriptions.length === 0) {
        throw new ApiError("No orders found", 404);
    }
  
    return res.status(200).json({allSubscriptions});
});

export const subscribeToCSA = asyncHandler(async (req, res) => {
    const { userId } = req.body; // Extract userId from the request body
    const { planId } = req.params; // Extract CSA plan ID from the route params

    try {
        // Find the CSA plan by ID
        const plan = await CSA_plans.findById(planId);

        if (!plan) {
            //throw new ApiError(404, 'CSA plan not found');
            return res.status(404).json({
                message : "CSA plan not found"
            })
        }

        // Check if the user is already subscribed
        const isAlreadySubscribed = plan.subscribers.some(subscriber => 
            subscriber.userId.toString() === userId
        );

        if (isAlreadySubscribed) {
            return res.status(409).json({
                message: 'User is already subscribed to this CSA plan'
            });
        }

        // Add the userId to the subscribers array
        plan.subscribers.push({ userId });

        // Save the updated plan
        await plan.save();

        return res.status(200).json({
            message: 'Successfully subscribed to the CSA plan',
            plan
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Error subscribing to CSA plan',
            error: error.message
        });
    }
});


