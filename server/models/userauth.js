const mongoose = require ('mongoose');

const usersCollectionSchema = mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true
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
module.exports = mongoose.model("User", usersCollectionSchema);