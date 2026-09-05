import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true
    },

    jti: {
        type: String,
        unique: true,
        required: true,
        index: true
    },

    token: {
        type: String,
        required: true
    },

    expiresAt: {
        type: Date,
        required: true,
        index: {expires: 0}
    },

    device: String,
    ip: String,
    userAgent: String
});

export default mongoose.model("Session", sessionSchema);