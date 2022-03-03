import fs from "fs-extra"
import { join, dirname } from "path"
import { fileURLToPath } from "url"

const {readJSON, writeJSON, writeFile} = fs
const getJSONPath = (filename) => join(join(dirname(fileURLToPath(import.meta.url)), "../data"), filename)
const postsJSONPath = getJSONPath("posts.json")
const authorsJSONPath = getJSONPath("authors.json")
const usersPublicFolderPath = join(process.cwd(), "./public/img/users") //cwd gives un the root folder, here "Back-end rest API"

export const getPosts = () => readJSON(postsJSONPath) // no need to parse, it's already included
export const getAuthors = () => readJSON(authorsJSONPath) // no need to parse, it's already included
export const updatePosts = (array) => writeJSON(postsJSONPath, array) // no need to stringify, it's already included
export const updateAuthors = (array) => writeJSON(authorsJSONPath, array) // no need to stringify, it's already included
export const saveUsersPictures = (filename, contentAsABuffer) => writeFile(join(usersPublicFolderPath, filename), contentAsABuffer)
