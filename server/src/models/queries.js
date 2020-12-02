import mongoose from "mongoose";

const queriesSchema = mongoose.Schema({
  First_Name: { type: String, required: true },
  Last_Name: { type: String, required: true },
  message: { type: String, required: true },
  Time: {type: Date, default: Date.now},
});
export default mongoose.model("Query", queriesSchema);