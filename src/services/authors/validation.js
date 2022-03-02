import { body } from "express-validator"

export const newAuthorValidation = [
    body("name").exists().withMessage("Name is a mandatory field!"),
    body("surname").exists().withMessage("Surname is a mandatory field!"),
    body("email").exists().withMessage("Email is a mandatory field", 
    body("email").isEmail().withMessage("This is not a valid email"))

]