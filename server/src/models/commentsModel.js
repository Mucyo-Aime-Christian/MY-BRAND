import mongoose from "mongoose";

const commentSchema = mongoose.Schema({
  Name: {type: String, required:true},
  Email: {type: String, required:true},
  comment: { type: String, required: true},
  Time: { type: Date, default: Date.now},
});
export default mongoose.model("Comment", commentSchema);
