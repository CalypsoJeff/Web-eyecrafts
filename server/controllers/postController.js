import Post from '../models/Post.js';

export const createPost = async (req, res) => {
    const post = new Post({ ...req.body, author: req.user });
    await post.save();
    res.status(201).json(post);
};

export const getAllPosts = async (req, res) => {
    const posts = await Post.find().populate('author', 'username');
    res.json(posts);
};

export const getPostById = async (req, res) => {
    const post = await Post.findById(req.params.id).populate('author', 'username');
    if (!post) return res.status(404).json({ msg: 'Post not found' });
    res.json(post);
};

export const updatePost = async (req, res) => {
    const post = await Post.findById(req.params.id);
    if (!post || post.author.toString() !== req.user)
        return res.status(403).json({ msg: 'Not authorized' });

    Object.assign(post, req.body);
    await post.save();
    res.json(post);
};

export const deletePost = async (req, res) => {
    const post = await Post.findById(req.params.id);
    if (!post || post.author.toString() !== req.user)
        return res.status(403).json({ msg: 'Not authorized' });

    await post.deleteOne();
    res.json({ msg: 'Post deleted' });
};
