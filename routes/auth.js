const router = require("express").Router()
const User = require("../models/User")
const jwt = require("jsonwebtoken");
const bcrypt = require("../utils/bcrypt")
const auth = require("../middleware/auth")

// @route POST /sigin
// @description Sign in user
// @access Public
router.post("/signin", (req, res) => {
    const { email, password } = req.body
    
    if (!email || !password) {
        return res.status(400).json({ msg: "Login failed, invalid email or password" })
    }

    User.findOne({ email })
        .then((user) => {
            if (!user) return res.status(404).json({ msg: "Login failed, invalid email or password" });
            if (!user.isConfirmed) return res.status(401).json({ msg: "You need to verify you account first" });

            bcrypt.comparePassword(password, user.password)
                .then(() => {
                    const userDTO = {
                        firstname: user.firstname,
                        lastname: user.lastname,
                        email: user.email
                    }
            
                    jwt.sign(
                        { _id: user._id },
                        process.env.JWT_KEY,
                        (error, token) => {
                            if (error) res.status(500).json({ msg: "Something went wrong... Try again later or contact us" });
                            return res.status(200).json({
                                token,
                                user: userDTO,
                                msg: "You are now logged in!"
                            });
                        }
                    );
                })
                .catch(() => {
                    return res.status(400).json({ msg: "Login failed, invalid email or password" });
                });
        })  
        .catch((error) => {
            console.log("Login: " + error);
            return res.status(500).json({ msg: "Something went wrong... Try again later or contact us" });
        })
})

// @route POST /auth
// @description Get user data
// @access Private
router.get("/user", auth, (req, res) => {
    const _id = req.user._id;
    User.findOne({ _id })
    .select('-password')
    .then((user) => {
        return res.status(200).json({ user });
    })
    .catch((error) => {
        console.log("GET USER ERROR: " + error);
        return res.status(500).json({ msg: "Something went wrong... Try again later or contact us" });
    })
})

module.exports = router;