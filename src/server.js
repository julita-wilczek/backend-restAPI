import express from "express"
import listEndpoints from "express-list-endpoints"
import authorsRouter from "./services/authors/index.js"

const server = express()

const port = 3001

server.use(express.json ()) // we add this in lines before endpoint are added so the server will not return undefined.
server.use("/authors", authorsRouter)

console.table(listEndpoints(server))

server.listen(port, () => {console.log("Server runs on port " + port)})