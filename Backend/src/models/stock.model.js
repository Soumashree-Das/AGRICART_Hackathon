import mongoose from "mongoose";

const { Schema } = mongoose;

const stockSchema = new Schema({
    photo: {
      type: String,
      //required: true,
    },
    Mrp: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      default: " ",
    },
    units: {
      type: Number,
      required: true,
    },
    date_of_produce: {
      type: String,
      required: true,
    },
    growing_practices: {
      type: String,
      required: true,
    },
    place_of_origin: {
      type: String,
      required: true,
    },
    product_id: {
      type: String,
      required: true,
    },
    username : {
      type : String,
      required : true
    },
    category: {
      type: String,
      enum: ['Grains', 'Pulses', 'Spices', 'Fruits', 'Vegetables'],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Product = mongoose.model("Product", stockSchema);
