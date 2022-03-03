import express, { response } from "express" 
import uniqid from "uniqid" 
import { validationResult } from "express-validator"
import { newAuthorValidation } from "./validation.js"
import createHttpError from "http-errors"
import { getAuthors, updateAuthors } from "../../library/fs-tools.js"

const authorsRouter = express.Router() 

authorsRouter.post("/", newAuthorValidation, async (request, response, next) => { 
try {
    const errorsList = validationResult(request)
    const authors = await getAuthors()
    if (errorsList.isEmpty()) {
        const emailRepeated = authors.find(author => author.email === request.body.email)
        if (emailRepeated) {
            next(createHttpError(400, "This email already in use. Choose another one"))
        } else{
        const newUser = {...request.body, createdAt: new Date(), _id: uniqid(), avatar: `https://ui-avatars.com/api/?name=${request.body.name}+${request.body.surname}`}
        authors.push(newUser)
        await updateAuthors(authors)
        response.status(201).send(newUser)
        }
    } else {
        next(createHttpError(400, "Big mistake. Big. HUGE!", {errorsList}))
    }

} catch(error) {
    next(error)
}
})

authorsRouter.get("/", async (request, response, next) => {
try {
    const authors = await getAuthors()
    response.send(authors)
}
catch(error){
    next(error)
}

})

authorsRouter.get("/:authorId", async (request, response, next) => {
try {
    const authors = await getAuthors()
    const authorId = request.params.authorId
    const requestedAuthor = authors.find(author => author._id === authorId)
    if (requestedAuthor) {
        response.send(requestedAuthor)
    }
    else {
        next(createHttpError(404, "This is not the author you're looking for."))
    }
} catch(error) {
    next(error)
}

}) 

authorsRouter.put("/:authorId", async (request, response, next) => { 
    try {
        const authors = await getAuthors()
        const authorId = request.params.authorId
        const index = authors.findIndex(author => author._id === authorId)
        if (index !== -1) {
            const oldAuthor = authors[index]
            const updatedAuthor = {...oldAuthor, ...request.body, updatedAt: new Date()}
            authors[index] = updatedAuthor
            await updateAuthors(authors)
            response.send(updatedAuthor)
        } else {
            next(createHttpError(404, "This is not the author you're looking for."))
        }
    } catch(error) {
        next(error)
    }
}) 

authorsRouter.delete("/:authorId", async (request, response, next) => {
    try {
        const authors = await getAuthors()
        const remainingAuthors = authors.filter(author => author._id !== request.params.authorId)
        await updateAuthors(remainingAuthors)
        response.status(200).send({message: "Author deleted"})
    } catch (error) {
        next(error)
    }
})

// authorsRouter.patch("/:userId/avatar", multer().single("avatar"), (req,res) => {
//   // 1. save file in public folder
//   // 2. update specified user's record in db by adding a filed called avatar: "url"
// })

export default authorsRouter
