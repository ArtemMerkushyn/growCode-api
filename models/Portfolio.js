import mongoose from 'mongoose';

const PortfolioSchema = new mongoose.Schema(
    {
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        fullName: {
            type: String,
            required: true
        },
        profession: { type: String },
        city: {
            type: String,
        },
        phone: {
            type: String
        },
        telegram: {
            type: String
        },
        instagram: {
            type: String
        },
        photo: {
            type: String,
            required: true
        },
        bgImg: {
            type: String,
            required: true
        },
        aboutMe: {
            type: String,
            required: true
        },
        portfolio: [
            {
                photoPortfolio: {
                    type: String,
                    required: true
                },
                linkPortfolio: {
                    type: String,
                    required: true
                },
                linkCode: {
                    type: String,
                    required: true
                },
            },
        ],
        skills: [
            {
                skill: {
                    type: String,
                },
            },
        ],
        posts: [
            {
                type: mongoose.Types.ObjectId,
                ref: 'Post',
            },
        ],
        cvLink: {
            type: String,
        },
    },
);

export default mongoose.model('Portfolio', PortfolioSchema);