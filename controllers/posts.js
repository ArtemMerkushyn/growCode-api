import Post from '../models/Post.js';
import User from '../models/User.js';
import Comment from '../models/Comment.js';

// create post
export const createPost = async (req, res) => {
    try {
        const { imgUrl, title, text } = req.body;
        const user = await User.findById(req.userId);

        const newPost = new Post({
            username: user.username,
            profession: user.profession,
            imgUrl,
            title,
            text,
            author: req.userId,
        });

        await newPost.save();
        await User.findByIdAndUpdate(req.userId, {
            $push: { posts: newPost },
        });
        return res.json(newPost);
    } catch (error) {
        res.json({ message: `Щось пішло не так. ${error}` });
    }
}

// get my posts
export const getMyPosts = async (req, res) => {
    try {
       const user = await User.findById(req.userId);
       const list = await Promise.all(
          user.posts.map((post) => {
              return Post.findById(post._id);
          }),
       );
 
       res.json(list);
    } catch (error) {
       res.json({ message: 'Щось пішло не так.' });
    }
}

// get user posts
export const getUserPosts = async (req, res) => {
    const idUser = req.params.id;
    try {
        const user = await User.findById(idUser);
        if(!user) return res.json({ message: 'Даного користувача не знайдено.'});

        const list = await Promise.all(
            user.posts.map((post) => {
                return Post.findById(post._id);
            })
        );

        res.json({ user, list });
    } catch (error) {
        res.json({ message: `Щось пішло не так. ${error}` });
    }
}


//get post by id
export const getPostById = async (req, res) => {
    try {
        const post = await Post.findByIdAndUpdate(req.params.id, {
            $inc: { views: 1 },
         },
         { new: true });
   
         res.json(post);
    } catch (error) {
        res.json({ message: 'Щось пішло не так.' });
    }
}

// update post
export const updatePost = async (req, res) => {
    try {
        const { imgUrl, title, text, id } = req.body;
        const post = await Post.findById(id);

        post.imgUrl = imgUrl;
        post.title = title;
        post.text = text;

        await post.save();
        res.json({ post, message: 'Ви успішно оновили Вашу публікацію' });
    } catch (error) {
        res.json({ message: `Щось пішло не так. ${error}` });
    }
}

// remove post
export const removePost = async (req, res) => {
    try {
        const post = await Post.findByIdAndDelete(req.params.id);
        if(!post) return res.json({ message: 'Даного посту не існує' });

        const commentIds = post.comments;
        await Comment.deleteMany({ _id: { $in: commentIds } });

        await User.findByIdAndUpdate(req.userId, {
            $pull: { posts: req.params.id },
        });

        res.json({ message: 'Ви успішно видалили пост'});
    } catch (error) {
        res.json({ message: 'Щось пішло не так...' });
    }
}

export const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find().sort('-createdAt');
        const popularPosts = await Post.find().sort('-views');

        if(!posts) {
            return res.json({ message: 'Постів немає.' });
        }

        res.json({ posts, popularPosts });
    } catch (error) {
        res.json({ message: 'Щось пішло не так.' });
    }
}

// get post comments
export const getPostComments = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        const listComments = await Promise.all(
            post.comments.map((comment) => {
                return Comment.findById(comment);
            })
        );
        res.json(listComments);
    } catch (error) {
        res.json({ message: `Щось пішло не так.${error}` });
    }
}