import express from "express"
import multer from "multer"
import {
  getLiveSlides,
  getAllSlides,
  addSlide,
  toggleSlideStatus,
  deleteSlide,
  updateSlideOrder,
} from "../controllers/slideController.js"
import adminauth from "../middleware/adminauth.js"

const slideRouter = express.Router()

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename:    (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
})
const upload = multer({ storage })

// public
slideRouter.post("/list",         getLiveSlides)

// admin protected
slideRouter.post("/all",          adminauth, getAllSlides)
slideRouter.post("/add",          adminauth, upload.single("image"), addSlide)
slideRouter.post("/toggle",       adminauth, toggleSlideStatus)
slideRouter.post("/delete",       adminauth, deleteSlide)
slideRouter.post("/updateorder",  adminauth, updateSlideOrder)

export default slideRouter