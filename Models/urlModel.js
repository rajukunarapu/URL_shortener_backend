const mongoose = require("mongoose");
const validator = require("validator");

const urlSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  code: {
    type: String
 },
  originalURL: {
    type: String,
    validate: {
      validator: (value) => validator.isURL(value),
      message: "Invalid URL format",
    },
  },
  shortURL: {
    type: String,
    validate: {
      validator: (value) => validator.isURL(value),
      message: "Invalid URL format",
    },
  },
  clicks: {
    type: Number, 
    default: 0 
},
  createdAt: { type: Date, default: Date.now }
});

const URL = mongoose.model("Url", urlSchema);

module.exports = URL;
