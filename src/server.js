import express from "express"
// import listEndpoints from "express-list-endpoints" --> use with console.table to check the endpoints
import authorsRouter from "./services/authors/index.js"
import postsRouter from "./services/posts/index.js"
import cors from "cors"
import { badRequestHandler, genericErrorHandler, notFoundHandler, unauthorizedHandler } from "./ErrorHandlers.js"


const server = express()

const port = 3001
server.use(cors()) // needed to connect to frontend, will be discussed in detail on Monday
server.use(express.json ()) // we add this in lines before endpoint are added so the server will not return undefined.

// ***************** ENDPOINTS *****************
server.use("/authors", authorsRouter)
server.use("/blogPosts", postsRouter)

// ***************** ERRORHANDLERS **************

server.use(badRequestHandler)
server.use(unauthorizedHandler)
server.use(notFoundHandler)
server.use(genericErrorHandler)

server.listen(port, () => {console.log("Server runs on port " + port)})