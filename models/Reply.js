import mongoose from "mongoose";

const ReplySchema = new mongoose.Schema(
    {
        reply: {
            type: String,
            required: true,
        },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        username: { type: String },
        profession: { type: String },
        query: { type: String },
    },
    { timestamps: true },
);

export default mongoose.model('Reply', ReplySchema);