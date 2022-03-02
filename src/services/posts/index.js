import express, { response } from "express" 
import { fileURLToPath } from "url" 
import { dirname, join } from "path" 
import fs from "fs"
import uniqid from "uniqid" 

const postsJSONPath = join(dirname(fileURLToPath(import.meta.url)), "posts.json")
const postsArray = JSON.parse(fs.readFileSync(postsJSONPath)) 
const updateArray = (array) => fs.writeFileSync(postsJSONPath, JSON.stringify(array)) 

const postsRouter = express.Router()

postsRouter.post("/", (request, response) => { 
const newPost = {...request.body, createdAt: new Date(), _id: uniqid()}
postsArray.push(newPost)
updateArray(postsArray)
response.status(201).send(newPost)
})

postsRouter.get("/", (request, response) => {
response.send(postsArray)
}) 

postsRouter.get("/:postId", (request, response) => { 
const requestedPost =postsArray.find(post => post._id === request.params.postId)
response.send(requestedPost)
}) 

postsRouter.put("/:postId", (request, response) => { 
const index = postsArray.findIndex(post => post._id === request.params.postId)
const oldPost = postsArray[index]
const updatedPost = {...oldPost, ...request.body, updatedAt: new Date()}
postsArray[index] = updatedPost
updateArray(postsArray)
response.send(updatedPost)

}) 
postsRouter.delete("/:postId", (request, response) => {
const remainingPosts = postsArray.filter(post => post._id !== request.params.postId)
updateArray(remainingPosts)
response.status(200).send({message: "Post deleted"})
})

export default postsRouter
