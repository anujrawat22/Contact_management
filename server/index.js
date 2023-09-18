const express = require('express')
require('dotenv').config()
const cors = require('cors')
const { connection } = require('./Config/db')

const { UserRouter } = require('./Routes/UserRoute')
const { authenticate } = require('./Middleware/authenticate')
const { ContactRouter } = require('./Routes/ContactRoute')
const port = process.env.PORT

const app = express()
app.use(express.json())
app.use(cors())

app.use("/api/user", UserRouter)
app.use("/api/contacts", authenticate, ContactRouter)


app.listen(port, async () => {
    try {
        await connection;
        console.log("Connected to DB");
        console.log(`Server listening on Port - ${port}`);
    } catch (error) {
        console.log(error);
    }
})