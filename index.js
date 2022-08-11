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

const users = require("./api/users-model")

const PORT = process.env.PORT || 9000

server.listen(PORT, () => {
    console.log("Listening on port: ", PORT)
})

server.get("/api/hello", (req, res) => {
    res.json({ message: 'api is working' })
})

server.get("/api/users", (req, res) => {
    users.findAll()
        .then(result => {
            res.json(result)
        })
        .catch(() => {
            res.status(500).json({
                message: "Something odd happened."
            })
        })
})

server.post("/api/register", (req, res) => {
    users.create(req.body)
        .then(result => {
            res.status(201).json(result)
        })
        .catch((err) => {
            res.status(500).json({
                message: "Something odd happened."
            })
        })
})

server.post("/api/login", (req, res) => {
    users.FindUser(req.body)
        .then(result => {
            console.log("success")
            res.send(`<h1> Welcome ${req.body.username}!</h1>`)
        })
        .catch(() => {
            res.status(500).json({
                message: "Something odd happened."
            })
        })

})



/*
server.use("*", (req, res) => {
    res.send(`<h1>Hello, there!</h1>`)
})
*/

server.use((err, req, res, next) => {
    res.status(500).json({
        message: err.message,
        stack: err.stack
    })
})