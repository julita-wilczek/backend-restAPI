import express from "express"  // need to install it with npm i express
import { fileURLToPath } from "url" // no need to install it, it's a core package
import { dirname, join } from "path" // no need to install it, it's a core package
import fs from "fs" // no need to install it, it's a core package.
import uniqid from "uniqid" // need to install it with npm i uniqid

// I will need to use authors.json file here so I need to link to it.
// To link index.js to authors.json I need to get a dynamic URL for that files
// First I get the url for current files (index.js) import.meta.url
// Then I turn this url into path using fileURLToPath() - need to import it from url
// Then I get the parent's folder path of the current file using dirname() - need to import it from path
// Then I add (concatenate) the name of the file I want to link to, using  join() - need to import that also from path
join(dirname(fileURLToPath(import.meta.url)), "authors.json")

const authorsRouter = express.Router() // all the enpoints attached to this router will have http://localhost:3001/authors as PREFIX

authorsRouter.post("/", (request, response) => { // this is used for posting a new author object to the array of authors
// In this CRUD method I will receive a body as a part of the request
// To get it I need to write request.body
// If the request.body is empty then it means I did not add server.use(express.json()) in server.js file!!!


})

authorsRouter.get("/", (request, response) => {}) // this is used for gettingthe array of authors
authorsRouter.get("/:authorId", (request, response) => {}) // this is used for getting a specific author object
authorsRouter.put("/:authorId", (request, response) => {}) // this is used for updating a specific author object
authorsRouter.delete("/:authorId", (request, response) => {}) // this is used for deleting a specific author object

export default authorsRouter

/*

// 1.
usersRouter.post("/", (request, response) => {
  // 1. Read request body obtaining new user's data
  console.log("BODY: ", request.body) // DO NOT FORGET 

  // 2. Add some server generated informations (unique id, creation Date, ...)
  const newUser = { ...request.body, createdAt: new Date(), id: uniqid() } // uniqid is a 3rd party module that generates unique identifiers
  console.log(newUser)

  // 3. Read users.json --> obtaining an array
  const usersArray = JSON.parse(fs.readFileSync(usersJSONPath))

  // 4. Add new user to the array
  usersArray.push(newUser)

  // 5. Write the array back to users.json file
  fs.writeFileSync(usersJSONPath, JSON.stringify(usersArray)) // we cannot pass an array to this function, but we can pass the stringified version of it

  // 6. Send a proper response back

  response.status(201).send({ id: newUser.id })
})

// 2.
usersRouter.get("/", (request, response) => {
  // 1. Read the content of users.json file
  const fileContent = fs.readFileSync(usersJSONPath) // You obtain a BUFFER object, which is MACHINE READABLE ONLY
  console.log("FILE CONTENT: ", JSON.parse(fileContent))

  // 2. Get back an array from the file
  const usersArray = JSON.parse(fileContent) // JSON.parse() converts BUFFER into a real ARRAY

  // 3. Send back the array as a response

  response.send(usersArray)
})

// 3.
usersRouter.get("/:userId", (request, response) => {
  console.log("REQ PARAMS: ", request.params.userId)

  // 1. Read the file --> obtaining an array
  const usersArray = JSON.parse(fs.readFileSync(usersJSONPath))

  // 2. Find the specific user by id in the array
  const foundUser = usersArray.find(user => user.id === request.params.userId)

  // 3. Send a proper response
  response.send(foundUser)
})

// 4.
usersRouter.put("/:userId", (request, response) => {
  // 1. Read the content of the file --> obtaining an array of users
  const usersArray = JSON.parse(fs.readFileSync(usersJSONPath))

  // 2. Modify specified user into the array by merging previous properties and new properties coming from req.body
  const index = usersArray.findIndex(user => user.id === request.params.userId)
  const oldUser = usersArray[index]
  const updatedUser = { ...oldUser, ...request.body, updatedAt: new Date() }

  usersArray[index] = updatedUser

  // 3. Save file back with the updated list of users
  fs.writeFileSync(usersJSONPath, JSON.stringify(usersArray))

  // 4. Send back a proper response

  response.send(updatedUser)
})

// 5.
usersRouter.delete("/:userId", (request, response) => {
  // 1. Read the file --> obtaining an array of users
  const usersArray = JSON.parse(fs.readFileSync(usersJSONPath))

  // 2. Filter out the specified user from the array, obtaining an array of just the remaining users
  const remainingUsers = usersArray.filter(user => user.id !== request.params.userId) // ! = =

  // 3. Save the remaining users back to users.json file
  fs.writeFileSync(usersJSONPath, JSON.stringify(remainingUsers))

  // 4. Send a proper response

  response.status(204).send()


})

GET /authors => returns the list of authors
GET (single user) /authors/123 => returns a single author
POST /authors => create a new author
PUT (single user) /authors/123 => edit the author with the given id
DELETE (single user) /authors/123 => delete the author with the given id
*/