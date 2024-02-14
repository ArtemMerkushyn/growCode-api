import mongoose from "mongoose";

const QuerySchema = new mongoose.Schema(
    {
        question: {
            type: String,
            required: true,
        },
        text: {
            type: String,
        },
        topic: {
            type: String,
            default: 'інше',
        },
        username: { type: String },
        author: { 
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        profession: { type: String },
        views: {
            type: Number,
            default: 0,
        },
        replies: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Reply',
        }],
    },
    { timestamps: true },
);

export default mongoose.model('Query', QuerySchema);