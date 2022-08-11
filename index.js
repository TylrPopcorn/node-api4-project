/*  Dependencies

    npx gitignore node
    npm init -y
    npx eslint --init
    npm install express
    npm install dotenv
    npm install cors
    npm i -D nodemon


    //HOW TO DISABLE ESLINT ON 1 LINE:
    // eslint-disable-line
*/

require('dotenv').config()

const express = require("express")
const cors = require("cors")

const server = express()

server.use(express.json())
server.use(cors())

const PORT = process.env.PORT || 9000

server.listen(PORT, () => {
    console.log("Listening on port: ", PORT)
})

server.get("/api/hello", (req, res) => {
    res.json({ message: 'api is working' })
})

server.use("*", (req, res) => {
    res.send(`<h1>Hello, there!</h1>`)
})

server.use((err, req, res, next) => {
    res.status(500).json({
        message: err.message,
        stack: err.stack
    })
})