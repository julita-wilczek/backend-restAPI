import { body } from "express-validator"

export const newPostValidation = [
    body("title").exists().withMessage("Title is a mandatory field!"),
    body("category").exists().withMessage("Category is a mandatory field!"),
    body("content").exists().withMessage("You need to have some content")

]

export const newCommentValidation = [
    body("name").exists().withMessage("You need to tell us your name"),
    body("text").exists().withMessage("You need to add some comment")
]