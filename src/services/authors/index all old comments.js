import express, { response } from "express"  // need to install it with npm i express
import { fileURLToPath } from "url" // no need to install it, it's a core package
import { dirname, join } from "path" // no need to install it, it's a core package
import fs from "fs" // no need to install it, it's a core package.
import uniqid from "uniqid" // need to install it with npm i uniqid
import { validationResult } from "express-validator"
import { newAuthorValidation } from "./validation"

// I will need to use authors.json file here so I need to link to it.
// To link index.js to authors.json I need to get a dynamic URL for that files
// First I get the url for current files (index.js) import.meta.url
// Then I turn this url into path using fileURLToPath() - need to import it from url
// Then I get the parent's folder path of the current file using dirname() - need to import it from path
// Then I add (concatenate) the name of the file I want to link to, using  join() - need to import that also from path
const authorsJSONPath = join(dirname(fileURLToPath(import.meta.url)), "authors.json")

const authorsRouter = express.Router() // all the enpoints attached to this router will have http://localhost:3001/authors as PREFIX

authorsRouter.post("/", (request, response) => { // this is used for posting a new author object to the array of authors
//Here I get the current array from JSON file and change it into the regular array so I can add new object there
const authorsArray = JSON.parse(fs.readFileSync(authorsJSONPath)) //
// In this CRUD method I will receive a body as a part of the request
// To get it I need to write request.body
// If the request.body is getting to me as undefined then it means I did not add server.use(express.json()) in server.js file!!!
// Let's check if the email in the request in unique
const emailRepeated = authorsArray.find(author => author.email === request.body.email)
if (emailRepeated) {
    response.status(400).send("This email already in use. Choose another one")
} else{
// With the request.body I create a new user, adding some server info with spread operator
// I use uniqid, a 3rd party module to generate unique ids
const newUser = {...request.body, createdAt: new Date(), _id: uniqid(), avatar: `https://ui-avatars.com/api/?name=${request.body.name}+${request.body.surname}`}
authorsArray.push(newUser)
// Then I write update the JSON file to reflect the change 
fs.writeFileSync(authorsJSONPath, JSON.stringify(authorsArray)) // before we pass it we need to turn it back to json
// Then send the response back // 201 means Created
response.status(201).send(newUser) // this is what we send back to user in the response. Could also be just id {_id: newUser.id }
}
})

authorsRouter.get("/", (request, response) => {
// First, we get the contents of authors.json file as a BUFFER object, sth that is machine readable only
const fileContent = fs.readFileSync(authorsJSONPath)
// Now we make is human readible with JSON.parse
const authorsArray = JSON.parse(fileContent)
// Now let's send it back to the user that requested it
response.send(authorsArray)

}) // this is used for getting the array of authors
authorsRouter.get("/:authorId", (request, response) => { // this is used for getting a specific author object

// First, get the array and make it human readible 
const authorsArray = JSON.parse(fs.readFileSync(authorsJSONPath))
// The authors id that the user requested is stored in request params
const authorId = request.params.authorId
// Now let's find the object the user requested in the array
const requestedAuthor = authorsArray.find(author => author._id === authorId)
// Now let's send it back to the user that requested it
response.send(requestedAuthor)
}) 

authorsRouter.put("/:authorId", (request, response) => { // this is used for updating a specific author object
// First, get the array and make it human readible 
const authorsArray = JSON.parse(fs.readFileSync(authorsJSONPath))
// The authors id that the user requested is stored in request params
const authorId = request.params.authorId
// Now let's find the indexOf the object so we can change the object later
const index = authorsArray.findIndex(author => author._id === authorId)
// So this is the author object before the changes
const oldAuthor = authorsArray[index]
// Here we ask to combine the current author object with any changes there are, plus added date of update for further reference
const updatedAuthor = {...oldAuthor, ...request.body, updatedAt: new Date()}
// Now we replace the old author object with the updated one, keeping the same index number
authorsArray[index] = updatedAuthor
// Let's save the changes in the authors.json file
fs.writeFileSync(authorsJSONPath, JSON.stringify(authorsArray))
// Let the user now what the updated authors file look like
response.send(updatedAuthor)

}) 
authorsRouter.delete("/:authorId", (request, response) => {// this is used for deleting a specific author object
//Again, get the file and it's content
const authorsArray = JSON.parse(fs.readFileSync(authorsJSONPath))
// Now create of it a new array that contains everything but the object requested
const remainingAuthors = authorsArray.filter(author => author._id !== request.params.authorId)

// Save the changes in the JSON file
fs.writeFileSync(authorsJSONPath, JSON.stringify(remainingAuthors))
// Send a proper response (204 means No Content but then you cannot send any message, so I went with 200)
response.status(200).send("Author deleted")
})

export default authorsRouter
