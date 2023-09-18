const { User } = require("../Models/UserModel")
require("dotenv").config()
const secretkey = process.env.secretkey
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const saltRounds = 5

exports.signup = async (req, res) => {
    const { name, email, password } = req.body
    try {
        const findUser = await User.findOne({ email })
        if (findUser) {
            return res.status(401).send({ err: "User already exists , please login" })
        }

        bcrypt.hash(password, saltRounds, async function (err, hash) {
            if (err) {
                console.log(err);
                return res.status(400).send({ err: "Something went wrong" })
            }
            const newUser = new User({ name, email, password: hash })
            await newUser.save()
            return res.status(201).send({ msg: "Registration successfull" })
        });

    } catch (error) {
        console.log("Error signing up : ", error);
        res.status(500).send({ err: "Server error" })
    }
}


exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email })

        if (!user) {
            return res.status(404).send({ err: "User not found " })
        }

        const verify = bcrypt.compareSync(password, user.password);


        if (!verify) {
            return res.status(401).send({ err: "Invalid Credentials" })
        }
        const token = jwt.sign({ userId: user._id, role: user.role, username: user.username }, secretkey, { expiresIn: 60 * 60 * 24 * 7 })

        res.cookie('token', token, {
            maxAge: 3600 * 1000 * 24 * 7,
            // httpOnly: true,
        })
        console.log(user.name)
        res.status(200).send({ msg: "Login Successfull", token, username: user.name })
    } catch (error) {
        console.log(error);
        res.status(500).send({ err: "Server error" })
    }
}

