const mongoose = require("mongoose");

const csvSchema = new mongoose.Schema({
  Part: {
    type: String,
    required: true,
    trim: true,
  },

  Alt_Part: {
    type: String,
    required: true,
    trim: true,
  },

  Name: {
    type: String,
    required: true,
  },

  Brand: {
    type: String,
    required: true,
  },

  Model: {
    type: String,
    required: true,
  },

  Engine: {
    type: String,
    required: true,
  },

  Car: {
    type: String,
    required: true,
  },

  Loc_A: {
    type: String,
    required: true,
  },

  Loc_A_Stock: {
    type: Number,
    required: true,
  },

  Loc_B: {
    type: String,
    required: true,
  },

  Loc_B_Stock: {
    type: Number,
    required: true,
  },

  Unit: {
    type: String,
    required: true,
  },

  Rate: {
    type: Number,
    required: true,
  },

  Value: {
    type: Number,
    required: true,
  },

  Remarks: {
    type: String,
  },

});

module.exports = mongoose.model("csvData", csvSchema);
