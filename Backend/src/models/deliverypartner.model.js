import mongoose from 'mongoose';

const { Schema } = mongoose;

const deliveryPartnerSchema = new Schema({
    partnerId: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    address: {
        street: {
            type: String,
            required: true,
        },
        city: {
            type: String,
            required: true,
        },
        state: {
            type: String,
            required: true,
        },
        zip: {
            type: String,
            required: true,
        },
    },
    serviceArea: [{
        type: String,
        required: true,
    }],
    bankingInfo: {
        bankName: {
            type: String,
            required: true,
        },
        accountNumber: {
            type: String,
            required: true,
        },
        ifscCode: {
            type: String,
            required: true,
        },
    }
}, {
    timestamps: true
});

export const DeliveryPartner = mongoose.model("DeliveryPartner", deliveryPartnerSchema);