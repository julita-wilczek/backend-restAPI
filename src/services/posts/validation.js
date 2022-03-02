import { body } from "express-validator"

export const newPostValidation = [
    body("title").exists().withMessage("Title is a mandatory field!"),
    body("category").exists().withMessage("Category is a mandatory field!"),
    body("content").exists().withMessage("You need to have some content")

]