const mongoose = require("mongoose");

const AnswerSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    answer: {
        type: String,
        required: true,
      }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Answer", AnswerSchema);