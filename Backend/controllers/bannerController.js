import bannermodel from "../models/bannerModel.js"

// ── Public: get all live banners (for frontend) ──
export const getLiveBanners = async (req, res) => {
  try {
    const banners = await bannermodel
      .find({ status: 'Live' })
      .sort({ order: 1, createdAt: 1 })
    res.json({ success: true, banners })
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}

// ── Admin: get all banners ──
export const getAllBanners = async (req, res) => {
  try {
    const banners = await bannermodel.find({}).sort({ order: 1, createdAt: 1 })
    res.json({ success: true, banners })
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}

// ── Admin: add banner ──
export const addBanner = async (req, res) => {
  try {
    const { title, link, position, status, colorIndex } = req.body

    if (!title) {
      return res.json({ success: false, message: "Banner text is required" })
    }

    const count  = await bannermodel.countDocuments({})
    const banner = await bannermodel.create({
      title,
      link:       link       || '/',
      position:   position   || 'Top',
      status:     status     || 'Live',
      colorIndex: Number(colorIndex) || 0,
      order:      count,
    })

    res.json({ success: true, message: "Banner added", banner })
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}

// ── Admin: update banner ──
export const updateBanner = async (req, res) => {
  try {
    const { bannerId, title, link, position, status, colorIndex } = req.body

    if (!bannerId) {
      return res.json({ success: false, message: "bannerId is required" })
    }
    if (!title) {
      return res.json({ success: false, message: "Banner text is required" })
    }

    const banner = await bannermodel.findByIdAndUpdate(
      bannerId,
      { title, link, position, status, colorIndex: Number(colorIndex) },
      { new: true }
    )

    if (!banner) {
      return res.json({ success: false, message: "Banner not found" })
    }

    res.json({ success: true, message: "Banner updated", banner })
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}

// ── Admin: toggle status ──
export const toggleBannerStatus = async (req, res) => {
  try {
    const { bannerId } = req.body

    if (!bannerId) {
      return res.json({ success: false, message: "bannerId is required" })
    }

    const banner = await bannermodel.findById(bannerId)
    if (!banner) {
      return res.json({ success: false, message: "Banner not found" })
    }

    banner.status = banner.status === 'Live' ? 'Draft' : 'Live'
    await banner.save()

    res.json({
      success: true,
      message: `Banner ${banner.status === 'Live' ? 'published' : 'unpublished'}`,
      status:  banner.status,
    })
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}

// ── Admin: delete banner ──
export const deleteBanner = async (req, res) => {
  try {
    const { bannerId } = req.body

    if (!bannerId) {
      return res.json({ success: false, message: "bannerId is required" })
    }

    const banner = await bannermodel.findByIdAndDelete(bannerId)
    if (!banner) {
      return res.json({ success: false, message: "Banner not found" })
    }

    res.json({ success: true, message: "Banner deleted" })
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}