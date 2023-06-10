const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    photoUrl: {
        type: String,
        required: true,
      },
    title: {
        type: String,
        required: true,
      },
    dimensions: {
        type: String,
        required: true,
      },
    price: {
        type: Number,
        required: true,
      },
    type: {
        type: String,
        required: true,
      },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);