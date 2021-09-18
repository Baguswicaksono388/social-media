const router = require('express').Router();
const User = require("../models/User");
const bcrypt = require('bcrypt');

router.post('/register', async (req, res) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        const user = await new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword
        });

        const users = await user.save();
        res.status(200).json({
            message: 'Success',
            data: users
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Error'
        });
    }
});

router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        !user && res.status(404).json({ message: "User not found" });

        const validPassword = await bcrypt.compare(req.body.password, user.password);
        !validPassword && res.status(400).json({ message: "Wrong password" });
        
        res.status(200).json({message:"Login Success", data: user});
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message:'Success'
        });
    }
})

module.exports = router;