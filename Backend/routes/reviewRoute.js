import express from "express"
import {
  addReview,
  getProductReviews,
  checkUserReview,
  getAllReviews,
  approveReview,
  rejectReview,
  deleteReview,
} from "../controllers/reviewController.js"
import auth  from "../middleware/auth.js"
import adminauth from "../middleware/adminauth.js"

const reviewrouter = express.Router()

// ── Customer routes ──
reviewrouter.post("/add",         auth,  addReview)
reviewrouter.post("/list",                   getProductReviews)
reviewrouter.post("/check",       auth,  checkUserReview)

// ── Admin routes ──
reviewrouter.post("/admin/all",   adminauth, getAllReviews)
reviewrouter.post("/admin/approve", adminauth, approveReview)
reviewrouter.post("/admin/reject",  adminauth, rejectReview)
reviewrouter.post("/admin/delete",  adminauth, deleteReview)

export default reviewrouter