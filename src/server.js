import express from "express"

const server = express()

const port = 3001

server.use(express.json ()) // we add this in lines before endpoint are added so the server will not return undefined.

server.listen(port, () => {console.log("Server runs on port " + port)})