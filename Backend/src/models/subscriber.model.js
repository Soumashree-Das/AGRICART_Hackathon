import mongoose from "mongoose";

const { Schema } = mongoose;

const subscriberSchema = new Schema({ 
    userId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
        required: true,
    }, 
    subscriptionId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'CSA_plan',
        required : true
    }
})

export const Subscription = mongoose.model("Subscription" , subscriberSchema);
//controller and routes yet to be made