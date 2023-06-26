const mongoose = require("mongoose");

const RivalSchema = new mongoose.Schema(
  {
    user: {
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
    location: {
        type: String,
        required: true,
      }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Rival", RivalSchema);
