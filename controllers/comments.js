import Comment from '../models/Comment.js';
import User from '../models/User.js';
import Post from '../models/Post.js';

//create comment 
export const createComment = async (req, res) => {
    try {
        const user = await User.findById(req.userId);
        const { postId, comment } = req.body;
        if(!comment) {
            return res.json({ message: 'Коментарій не може бути пустим' });
        }

        const newComment = new Comment({ 
            post: postId,
            author: req.userId,
            username: user.username,
            profession: user.profession,
            comment
        });
        await newComment.save();

        try {
            await Post.findByIdAndUpdate(postId, {
                $push: { comments: newComment._id },
            });
        } catch (error) {
            console.log(error);
        }

        res.json(newComment);
    } catch (error) {
        res.json({ message: `Щось пішло нетак. ${error}` });
    }
}

//update comment
export const updateComment = async (req, res) => {
    try {
        const { commentText } = req.body;
        const comment = await Comment.findByIdAndUpdate(req.params.id);
        if(!comment) return res.json({ message: 'Такого коментаря не існує'});

        comment.comment = commentText;
        await comment.save();
        res.json({ comment, message: 'Ви успішно змінили Ваш коментар' });
    } catch (error) {
        res.json({ message: `Щось пішло нетак... ${error}` });
    }
}

//remove comment
export const removeComment = async (req, res) => {
    try {
        const comment = await Comment.findByIdAndDelete(req.params.id);
        if(!comment) return res.json({ message: 'Такого коментаря не існує'});

        await Post.findByIdAndUpdate(comment.post, {
            $pull: { comments: req.params.id },
        });
        res.json({ message: 'Ви успішно видалили коментар', comment});
    } catch (error) {
        res.json({ message: `Щось пішло не так${error}` });
    }
}

//get all posts
export const getAllComments = async (req, res) => {
    try {
        const comments = await Comment.find().sort('-createdAt');
        if(!comments) {
            return res.json({ message: 'Коментарів немає.' });
        }

        res.json({ comments });
    } catch (error) {
        res.json({ message: 'Немає доступу' })
    }
}