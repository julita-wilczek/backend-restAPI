import express, { response } from "express" 
import { fileURLToPath } from "url" 
import { dirname, join } from "path" 
import fs from "fs"
import uniqid from "uniqid"
import createHttpError from "http-errors"
import { validationResult } from "express-validator"
import { newPostValidation } from "./validation.js"
import req from "express/lib/request"

const postsJSONPath = join(dirname(fileURLToPath(import.meta.url)), "posts.json")
const postsArray = JSON.parse(fs.readFileSync(postsJSONPath)) 
const updateArray = (array) => fs.writeFileSync(postsJSONPath, JSON.stringify(array)) 

const postsRouter = express.Router()

postsRouter.post("/", newPostValidation, (request, response, next) => { 
    try { 
        const errorsList = validationResult(request)
        if (errorsList.isEmpty()) {
            const newPost = {...request.body, createdAt: new Date(), _id: uniqid()}
            postsArray.push(newPost)
            updateArray(postsArray)
            response.status(201).send(newPost)
        } else {
            next(createHttpError(400, "Big mistake. Big. HUGE!", {errorsList}))
        }

    } catch(error) {
        next(error)
    } 

})

postsRouter.get("/", (request, response, next) => {
    try {
        if (request.query && request.query.category){
            const filteredPosts = postsArray.filter(post => post.category === request.query.category)
            response.send(filteredPosts)
        }
        else {response.send(postsArray)}
    } catch(error) {
        next(error)
    }

}) 

postsRouter.get("/:postId", (request, response, next) => { 
    try {
        const requestedPost = postsArray.find(post => post._id === request.params.postId)
        if (requesteBook) {
            response.send(requestedPost)
        } else {
            next(createHttpError(404, "This is not the post you're looking for."))
        }
    } catch (error) {
        next(error)
    }


}) 

postsRouter.put("/:postId", (request, response, next) => { 

    try {
    const index = postsArray.findIndex(post => post._id === request.params.postId)
    if (index !== -1) {
        const oldPost = postsArray[index]
        const updatedPost = {...oldPost, ...request.body, updatedAt: new Date()}
        postsArray[index] = updatedPost
        updateArray(postsArray)
        response.send(updatedPost)
    } else {
        next(createHttpError(404, "This is not the post you're looking for."))
    }
    } catch(error) {
        next(error)
    }




}) 
postsRouter.delete("/:postId", (request, response) => {
const remainingPosts = postsArray.filter(post => post._id !== request.params.postId)
updateArray(remainingPosts)
response.status(200).send({message: "Post deleted"})
})

export default postsRouter

/*
  try {
    const index = books.findIndex(book => book.id === bookId)

    if (index !== -1) {
      const oldBook = books[index]

      const updatedBook = { ...oldBook, ...req.body, updatedAt: new Date() }

      books[index] = updatedBook

      writeBooks(books)

      res.send(updatedBook)
    } else {
      next(createHttpError(404, `Book with id ${bookId} not found!`))
    }
  } catch (error) {
    next(error)
  }
})

booksRouter.delete("/:bookId", (req, res, next) => {
  try {
    const bookId = req.params.bookId

    const books = getBooks()

    const remainingBooks = books.filter(book => book.id !== bookId)

    writeBooks(remainingBooks)

    res.status(204).send()
  } catch (error) {
    next(error)
  }
})

export default booksRouter

*/