const mongoose = require("mongoose");

const SaleSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    zip: {
        type: String,
        required: true,
      },
    soldProduct: {
        type: String,
        required: false,
      },
    price: {
        type: Number,
        required: false,
      },
      percentage: {
        type: Number,
        required: false,
      },
    location: {
        type: String,
        required: true,
      },
    facebook : {
        type: Boolean,
        required: false
    },
    isPaid : {
      type: Boolean,
      required: false
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Sales", SaleSchema);