import Portfolio from '../models/Portfolio.js';
import User from '../models/User.js';

export const createPortfolio = async (req, res) => {
    try {
        const user = await User.findById(req.userId);
        if(!user) return res.json({ message: 'Користувач не знайдений' });

        const newPortfolio = new Portfolio({
            ...req.body,
            author: req.userId,
            profession: user.profession,
            posts: user.posts,
        });

        await newPortfolio.save();

        await User.findByIdAndUpdate(req.userId, {
            $push: { portfolio: newPortfolio },
        });

        return res.json({ newPortfolio });
    } catch (error) {
        res.json({ message: `Щось пішло не так - ${error}` });
    }
}