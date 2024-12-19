import mongoose from "mongoose"

const { Schema } = mongoose;

const subscriptionSchema = new Schema({
        farmerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Farmer', // Reference to the User model
            required: true,
        },
        product_culivated:{
            productName : {
                type : String,
                required : true,
            },
            description : {
                type : String,
                required : true,
            },
            growingPractices : {
                type: String,
                required : true,
            },
            category : {
                type :String,
                required : true,
            },
            placeOfOrigin : {
                type : String,
                required :  true,
            },
            estimated_units : {
                type : Number,
                default : 0 ,
                required :true
            }
        },
        total_estimated_price : {
            type : Number,
            required : true,
        },
        initial_price : {
            type : Number ,
            required : true ,
        },
        estimated_time_of_produce : {
            type : String,
            required : true ,
        },
        subscribers : [
            {
                userId : {
                type : mongoose.Schema.Types.ObjectId,
                ref : "User",
                }
            }
        ]
    }
) 

export const CSA_plans = mongoose.model('CSA_plans', subscriptionSchema );
//this schema will be displayed to the farmer using a form and then un farmer listing page using farmer id the csa subscription plan will be displayed. now in controller i need a function where if(subription){integrate payment} wil be passed and on calling the route this function will be displayed
//controller and routes yet to be planned