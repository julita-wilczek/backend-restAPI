import fs from "fs-extra"
import { join, dirname } from "path"
import { fileURLToPath } from "url"

const {readJSON, writeJSON, writeFile} = fs
const getJSONPath = (filename) => join(join(dirname(fileURLToPath(import.meta.url)), "../data"), filename)
const postsJSONPath = getJSONPath("posts.json")
const authorsJSONPath = getJSONPath("authors.json")
const authorsPublicFolderPath = join(process.cwd(), "./public/img/authors") //cwd gives un the root folder, here "Back-end rest API"
const postsPublicFolderPath = join(process.cwd(), "./public/img/blogPosts")

export const getPosts = () => readJSON(postsJSONPath) // no need to parse, it's already included
export const getAuthors = () => readJSON(authorsJSONPath) // no need to parse, it's already included
export const updatePosts = (array) => writeJSON(postsJSONPath, array) // no need to stringify, it's already included
export const updateAuthors = (array) => writeJSON(authorsJSONPath, array) // no need to stringify, it's already included
export const saveAvatars = (filename, contentAsABuffer) => writeFile(join(authorsPublicFolderPath, filename), contentAsABuffer)
export const saveCovers = (filename, contentAsABuffer) => writeFile(join(postsPublicFolderPath, filename), contentAsABuffer)
