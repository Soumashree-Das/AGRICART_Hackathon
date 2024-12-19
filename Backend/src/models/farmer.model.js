import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const { Schema } = mongoose;

const farmerSchema = new Schema({
    username : {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    pincode: {
        type: Number,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    farmingCertifications: {
        type: String,
        default: null,
    },
    farmingDetails: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
        unique: true,
    },
    accesstoken:{
        type:String,
        default : null,
    },
    refreshtoken: {
        type: String,
        default: null,
    },
}, {
    timestamps: true
});

// Pre-save middleware to hash the password before saving
farmerSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// Method to check if the provided password is correct
farmerSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
};

// Method to generate access token
farmerSchema.methods.generateAccessToken = function () {
    try{
    return jwt.sign(
        {
            _id : this._id,
            username : this.username,
            name : this.name,
            address:this.address,
            pincode:this.pincode,
            gender:this.gender,
            state:this.state,
            email : this.email,
            phoneNumber:this.phoneNumber,
            //payloads for a particuilar jwt access toekn and is unique for all diffferent users
        },
        process.env.ACCESS_TOKEN_SECRET_FARMER,
        {
            expiresIn : process.env.ACCESS_TOKEN_EXPIRY_FARMER//expiry
        }
    )}catch(error){
        console.log("Error while generating access token:", error);
        throw new Error("Access token generation failed");
    }
};

// Method to generate refresh token
farmerSchema.methods.generateRefreshToken = function () {
    try{ return jwt.sign(
        { 
            id: this._id 
        }, 
        process.env.REFRESH_TOKEN_SECRET_FARMER, 
        { 
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY_FARMER
        }
    );}catch(error){
        console.log("Error while generating refresh token:", error);
        throw new Error("Refresh token generation failed");
    }
};

export const Farmer = mongoose.model("Farmer", farmerSchema);
