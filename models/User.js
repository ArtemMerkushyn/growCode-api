import mongoose from "mongoose";

const UserShema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        profession: {
            type: String,
            default: '',
        },
        level: {
            type: String,
            default: '',
        },
        description: {
            type: String,
            default: '',
        },       
        posts: [
            {
                type: mongoose.Types.ObjectId,
                ref: 'Post',
            },
        ],
        queries: [
            {
                type: mongoose.Types.ObjectId,
                ref: 'Query',
            },
        ],
        portfolio: {
            type: mongoose.Types.ObjectId,
            ref: 'Portfolio',
        }
    },
    { timestamps: true },
);

export default mongoose.model('User', UserShema);