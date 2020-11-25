const { string } = require("joi");
const mongoose = require("mongoose");

const commentSchema = mongoose.Schema({
  Name: {type: String, required:true},
  Email: {type: String, required:true},
  comment: { type: String, required: true},
  Time: { type: Date, default: Date.now},
});

module.exports = mongoose.model("Comment", commentSchema);