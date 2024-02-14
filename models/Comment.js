import mongoose from 'mongoose';

const CommentSchema = new mongoose.Schema(
    {
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        username: { type: String },
        profession: { type: String },
        comment: {
            type: String,
            required: true
        },
        post: { type: String },
    },
    { timestamps: true },
);
export default mongoose.model('Comment', CommentSchema);