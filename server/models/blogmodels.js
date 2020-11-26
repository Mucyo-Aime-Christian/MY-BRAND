import mongoose from "mongoose";

const blogSchema = mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    blogImage: { type: String, required: true },
    Time: {type: Date, default: Date.now},
    comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
});
export default mongoose.model("Blogs", blogSchema);