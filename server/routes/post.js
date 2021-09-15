const router = require('express').Router();
const Post = require("../models/Post");
const User = require("../models/User");

// create POST
router.post("/", async (req, res) => {
    const newPost = new Post(req.body);
    try {
        const savedPost = await newPost.save();
        res.status(200).json({
            message: "Success",
            data: savedPost
        });
    } catch (error) {
        console.error(error)
        res.status(500).json({message: "Error"})
    }
});

// update post
router.put('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post.userId === req.body.userId) {
            await post.updateOne({ $set: req.body });
            res.status(200).json({message: "the post has been updated"});
        } else {
            res.status(403).json({message: "you can update only your post"})
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Error"})
    }
});

// delete post
router.delete('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post.userId === req.body.userId) {
            await post.deleteOne();
            res.status(200).json({message: "the post has been deleted"});
        } else {
            res.status(403).json({message: "you can delete only your post"})
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Error"})
    }
});

router.put("/:id/like", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post.likes.includes(req.body.userId)) {
            await post.updateOne({ $push: { likes: req.body.userId } });
            res.status(200).json({ message: "The post has been likes" });
        } else {
            await post.updateOne({ $pull: { likes: req.body.userId } });
            res.status(200).json({ message: "The psot has been disliked" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error" });
    }

});

// Get Post by Id
router.get('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        res.status(200).json({
            message: "Success",
            data: post
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Error"})
    }
});

// Get timelin post
router.get('/timeline/:userId', async (req, res) => {
    let postArray = [];
    try {
        const currentUser = await User.findById(req.params.userId);
        const userPosts = await Post.find({ userId: currentUser._id });
        const friendPosts = await Promise.all(
            currentUser.followings.map(friendId => {
                return Post.find({ userId: friendId });    
            })
        );
        res.status(200).json(userPosts.concat(...friendPosts));
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error" });
    }
});
 
module.exports = router;