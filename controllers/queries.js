import Query from '../models/Query.js';
import User from '../models/User.js';
import Reply from '../models/Reply.js';

// create query
export const createQuery = async (req, res) => {
    try {
        const { question, text, topic} = req.body;
        const user = await User.findById(req.userId);

        const newQuery = new Query({
            question,
            text,
            topic,
            username: user.username,
            profession: user.profession,
            author: req.userId,
        });
        await newQuery.save();
        await User.findByIdAndUpdate(req.userId, {
            $push: { queries: newQuery },
        });

        return res.json(newQuery);
    } catch (error) {
        res.json({ message: `Щось пішло не так ${error}` });
    }
}

// get all queries 
export const getAllQueries = async (req, res) => {
    try {
        const queries = await Query.find().sort('-createdAt');
        const popularQueries = await Query.find().sort('-views')
        if(!queries) return res.json({ message: 'Питання відсутні' });

        res.json({ queries, popularQueries });
    } catch (error) {
        res.json({ message: 'Щось пішло не так' });
    }
}

// get my queries
export const getMyQueries = async (req, res) => {
    try {
        const user = await User.findById(req.userId);
        const list = await Promise.all(
            user.queries.map((query) => {
                return Query.findById(query._id);
            }),
        );

        res.json(list);
    } catch (error) {
        res.json({ message: `Щось пішло не так: ${error}` });
    }
}

// get user queries
export const getUserQueries = async (req, res) => {
    const idUser = req.params.id;
    try {
        const user = await User.findById(idUser);
        const list = await Promise.all(
            user.queries.map((query) => {
                return Query.findById(query._id);
            })
        );
        res.json(list);
    } catch (error) {
        res.json({ message: `Щось пішло не так: ${error}` });
    }
}

// get query by id
export const getQueryById = async (req, res) => {
    try {
        const query = await Query.findByIdAndUpdate(req.params.id, {
            $inc: { views: 1 },
        },
        { new: true });

        res.json(query);
    } catch (error) {
        res.json({ message: `Щось пішло не так: ${error}` });
    }
}

// update query
export const updateQuery = async (req, res) => {
    try {
        const { question, text, topic, id } = req.body;
        const query = await Query.findById(id);

        query.question = question;
        query.text = text;
        query.topic = topic;

        await query.save();
        res.json({ query, message: 'Ви успішно оновили Ваше питання' });
    } catch (error) {
        res.json({ message: `Щось пішло не так: ${error}` });
    }
}

// delete query
export const deleteQuery = async (req, res) => {
    try {
        const query = await Query.findByIdAndDelete(req.params.id);
        if(!query) return res.json({ message: 'Даненного питання немає в базі' });

        const repliesIds = query.replies;
        await Reply.deleteMany({ _id: { $in: repliesIds } });

        await User.findByIdAndUpdate(req.userId, {
            $pull: { queries: req.params.id },
        });

        res.json({ message: 'Ви успішно видалили Ваше питання' });
    } catch (error) {
        res.json({ message: `Щось пішло не так: ${error}` });
    }
}

// get query replies
export const getQueryReplies = async (req, res) => {
    try {
        const query = await Query.findById(req.params.id);
        const listQueries = await Promise.all(
            query.replies.map((query) => {
                return Reply.findById(query);
            })
        );
        res.json(listQueries);
    } catch (error) {
        
    }
}