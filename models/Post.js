const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
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
    location: {
        type: String,
        required: true,
      },
    count: {
        type: Number,
        required: true,
      },
    customerReturns: {
        type: Number,
        required: true,
      },
    sale: {
        type: Boolean,
        required: false,
      },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);