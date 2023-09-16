const express = require('express')
require('dotenv').config()
const cors = require('cors')
const { connection } = require('./Config/db')
const { ContactRouter } = require('./Routes/ContactRoutes')
const port = process.env.PORT

const app = express()
app.use(cors("*"))


app.use("/api/contacts", ContactRouter)


app.listen(port, async () => {
    try {
        await connection;
        console.log("Connected to DB");
        console.log(`Server listening on Port - ${port}`);
    } catch (error) {
        console.log(error);
    }
})