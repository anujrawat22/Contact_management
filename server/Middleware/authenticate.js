const jwt = require("jsonwebtoken")
require('dotenv').config()
const secretkey = process.env.secretkey

const authenticate = (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1]
        if (!token) {
            return res.status(401).send({ err: "Unauthorized" })
        }

        const decoded = jwt.verify(token, secretkey)

        if (decoded) {
            req.userId = decoded.userId
            req.role = decoded.role
            req.username = decoded.username
            next()
        } else {

            return res.status(401).send({ err: "Unauthorized" })
        }

    } catch (error) {
        console.log(error);
        res.status(500).send({ err: "Authentication error" })
    }
}

module.exports = { authenticate }