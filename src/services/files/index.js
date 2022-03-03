import express from "express"
import multer from "multer"
import uniqid from "uniqid"
import { saveAvatars } from "../../library/fs-tools.js"

const filesRouter = express.Router()

filesRouter.post("/uploadSingle", multer().single("avatar"), async (req, res, next) => {
// in multer() you can add some conditions like limits: fileSize or fileType)
// avatar is a name of the propery you need to use when Form.Data.append() in frontend
try {
await saveAvatars(uniqid() + req.file.originalname, req.file.buffer) 
// I added uniqid as a name of the file, so that no two names are repeated. 
res.send({message: "Avatar uploaded"})
                                                
} catch(error) {
    next(error)
}
})

filesRouter.post("/uploadMultiple", multer().array("avatars"), async (req, res, next) => {
    try {
        const arrayOfPromises = req.files.map(file => saveAvatars(uniqid() + file.originalname, file.buffer))
        await Promise.all(arrayOfPromises)
        res.send({message: "All images uploaded"})
    } catch(error) {
        next(error)
    }
})

export default filesRouter

