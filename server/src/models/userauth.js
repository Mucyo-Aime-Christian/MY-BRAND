import mongoose from "mongoose";

const usersCollectionSchema = mongoose.Schema({
    email: {
        type: String,
       unique: true,
       required: true,
       trim: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default : new Date()
    },
    profileImage: {
    type: String,
  },
})
export default mongoose.model("User", usersCollectionSchema);
