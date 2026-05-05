import express      from "express"
import adminauth    from "../middleware/adminauth.js"
import {
  getLiveBanners,
  getAllBanners,
  addBanner,
  updateBanner,
  toggleBannerStatus,
  deleteBanner,
} from "../controllers/bannerController.js"

const bannerrouter = express.Router()

// Public — frontend reads live banners
bannerrouter.post("/live",   getLiveBanners)

// Admin protected
bannerrouter.post("/all",    adminauth, getAllBanners)
bannerrouter.post("/add",    adminauth, addBanner)
bannerrouter.post("/update", adminauth, updateBanner)
bannerrouter.post("/toggle", adminauth, toggleBannerStatus)
bannerrouter.post("/delete", adminauth, deleteBanner)

export default bannerrouter