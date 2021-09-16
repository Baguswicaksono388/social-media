const router = require('express').Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

// update user
router.put("/:id", async (req, res) => {
    if (req.body.userId == req.params.id || req.body.isAdmin) {
        if (req.body.password) {
            try {
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password, salt);
            } catch (error) {
                console.error(error);
                res.status(500).json({ message: "Error" });
            }
        }
        try {
            const user = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body
            });
            res.status(200).json({message: "Account has been updated"});
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Error" });
        }
    } else {
        return res.status(403).json({ message:"You can update only your account" });
    }
});

// delete users
router.delete("/:id", async (req, res) => {
    if (req.body.userId == req.params.id || req.body.isAdmin) {
        try {
            await User.findByIdAndDelete({ _id: req.params.id });
            res.status(200).json({message: "Account has been deleted"});
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Error" });
        }
    } else {
        return res.status(403).json({ message:"You can delete only your account" });
    }
});

// get users by id
router.get("/:id", async (req, res) => {
    try {
        const users = await User.findById({ _id: req.params.id });
        const { password, updatedAt, ...other } = users._doc;
        res.status(200).json(other);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error" });
    }
});

// follow  a user
router.put('/:id/follow', async (req, res) => {
    if (req.body.userId !== req.params.id) {
        try {
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);
            if (!user.followers.includes(req.body.userId)) {
                await user.updateOne({ $push: { followers: req.body.userId } });
                await currentUser.updateOne({ $push: { followings: req.params.id } });
                res.status(200).json({ message: "user has been followed" });
            } else {
                res.status(403).json({ message: "you already follow this user" });
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Error" });
        }
    } else {
        res.status(403).json({ message: "You can follow yourself" });
    }
});

router.put('/:id/unfollow', async (req, res) => {
    if (req.body.userId !== req.params.id) {
        try {
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);
            if (user.followers.includes(req.body.userId)) {
                await user.updateOne({ $pull: { followers: req.body.userId } });
                await currentUser.updateOne({ $pull: { followings: req.params.id } });
                res.status(200).json({ message: "user has been unfollowed" });
            } else {
                res.status(403).json({ message:"you dont follow this user" });
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Error" });
        }
    } else {
        res.status(403).json({ message: "You can unfollow yourself" });
    }
})

module.exports = router;