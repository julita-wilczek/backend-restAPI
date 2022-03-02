import express from "express"
import listEndpoints from "express-list-endpoints"
import authorsRouter from "./services/authors/index.js"
import postsRouter from "./services/posts/index.js"
import cors from "cors"


const server = express()

const port = 3001
server.use(cors()) // needed to connect to frontend, will be discussed in detail on Monday
server.use(express.json ()) // we add this in lines before endpoint are added so the server will not return undefined.
server.use("/authors", authorsRouter)
server.use("/blogPosts", postsRouter)


server.listen(port, () => {console.log("Server runs on port " + port)})