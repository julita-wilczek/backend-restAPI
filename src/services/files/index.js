import express from "express"
import multer from "multer"
import uniqid from "uniqid"
import { saveUsersPictures } from "../../library/fs-tools"

const filesRouter = express.Router

filesRouter.post("/uploadSingle", multer().single("avatar"), async (req, res, next) => {
// in multer() you can add some conditions like limits: fileSize or fileType)
// avatar is a name of the propery you need to use when Form.Data.append() in frontend
try {
await saveUsersPictures(uniqid(), req.file.buffer) 
// I added uniqid as a name of the file, so that no two names are repeated. 
// Otherwise could use req.file.originalname
res.send({message: "Avatar uploaded"})
                                                
} catch(error) {
    next(error)
}
})

filesRouter.posts("/uploadMultiple", multer().array("avatars"), async (req, res, next) => {
    try {
        const arrayOfPromises = req.files.map(file => saveUsersPictures(uniqid(), file.buffer))
        await Promise.all(arrayOfPromises)
        req.send({message: "All images uploaded"})
    } catch(error) {
        next(error)
    }
})

export default filesRouter

