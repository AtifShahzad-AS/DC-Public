// backend/routes/wishlistRoute.js
import express from "express";
import auth from "../middleware/auth.js";
import { toggleWishlist } from "../controllers/wishlistController.js";

const router = express.Router();

// Only POST for toggle & fetching
router.post("/toggle", auth, toggleWishlist);

export default router;