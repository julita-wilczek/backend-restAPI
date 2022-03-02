import express, { response } from "express" 
import { fileURLToPath } from "url" 
import { dirname, join } from "path" 
import fs from "fs"
import uniqid from "uniqid" 
import { nextTick } from "process"
import { validationResult } from "express-validator"
import { newAuthorValidation } from "./validation.js"
import createHttpError from "http-errors"

const authorsJSONPath = join(dirname(fileURLToPath(import.meta.url)), "authors.json")
const authorsArray = JSON.parse(fs.readFileSync(authorsJSONPath))
const updateArray = array => fr.writeFileSync(authorsJSONPath, JSON.stringify(array))

const authorsRouter = express.Router() 

authorsRouter.post("/", newAuthorValidation, (request, response, next) => { 
try {
    const errorsList = validationResult(request)
    if (errorsList.isEmpty()) {
        const emailRepeated = authorsArray.find(author => author.email === request.body.email)
        if (emailRepeated) {
            response.status(400).send("This email already in use. Choose another one")
        } else{
        const newUser = {...request.body, createdAt: new Date(), _id: uniqid(), avatar: `https://ui-avatars.com/api/?name=${request.body.name}+${request.body.surname}`}
        authorsArray.push(newUser)
        updateArray(authorsArray)
        response.status(201).send(newUser)
        }
    } else {
        next(createHttpError(400, "Big mistake. Big. HUGE!", {errorsList}))
    }

} catch(error) {
    next(error)
}
})

authorsRouter.get("/", (request, response, next) => {
try {
    response.send(authorsArray)
}
catch(error){
    next(error)
}

})

authorsRouter.get("/:authorId", (request, response, next) => {
try {
    const authorId = request.params.authorId
    const requestedAuthor = authorsArray.find(author => author._id === authorId)
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

authorsRouter.put("/:authorId", (request, response, next) => { 
    try {
        const authorId = request.params.authorId
        const index = authorsArray.findIndex(author => author._id === authorId)
        if (index !== -1) {
            const oldAuthor = authorsArray[index]
            const updatedAuthor = {...oldAuthor, ...request.body, updatedAt: new Date()}
            authorsArray[index] = updatedAuthor
            updateArray(authorsArray)
            response.send(updatedAuthor)
        } else {
            next(createHttpError(404, "This is not the author you're looking for."))
        }
    } catch(error) {
        next(error)
    }
}) 

authorsRouter.delete("/:authorId", (request, response) => {
const remainingAuthors = authorsArray.filter(author => author._id !== request.params.authorId)
updateArray(remainingAuthors)
response.status(200).send("Author deleted")
})

export default authorsRouter
