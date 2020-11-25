const mongoose = require("mongoose");

const queriesSchema = mongoose.Schema({
  First_Name: { type: String, required: true },
  Last_Name: { type: String, required: true },
  message: { type: String, required: true },
  Time: {type: Date, default: Date.now},
});

module.exports = mongoose.model("Query", queriesSchema);