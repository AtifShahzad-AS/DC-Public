import slidemodel from "../models/slideModel.js"
import cloudinary from "cloudinary"
import fs from "fs"

// ── Public: get all live slides (for frontend) ──
export const getLiveSlides = async (req, res) => {
  try {
    const slides = await slidemodel
      .find({ status: "Live" })
      .sort({ order: 1, createdAt: 1 })
    res.json({ success: true, slides })
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}

// ── Admin: get all slides ──
export const getAllSlides = async (req, res) => {
  try {
    const slides = await slidemodel.find({}).sort({ order: 1, createdAt: 1 })
    res.json({ success: true, slides })
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}

// ── Admin: add slide ──
export const addSlide = async (req, res) => {
  try {
    const { title, link, order, status } = req.body

    if (!req.file) {
      return res.json({ success: false, message: "Slide image is required" })
    }

    const result = await cloudinary.v2.uploader.upload(req.file.path, {
      folder: "slides",
    })

    fs.unlinkSync(req.file.path)

    const slide = await slidemodel.create({
      title:  title  || "",
      link:   link   || "/",
      image:  result.secure_url,
      order:  parseInt(order) || 0,
      status: status || "Live",
    })

    res.json({ success: true, message: "Slide added successfully", slide })
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}

// ── Admin: toggle Live/Draft ──
export const toggleSlideStatus = async (req, res) => {
  try {
    const { slideId } = req.body
    if (!slideId) return res.json({ success: false, message: "slideId required" })

    const slide = await slidemodel.findById(slideId)
    if (!slide) return res.json({ success: false, message: "Slide not found" })

    slide.status = slide.status === "Live" ? "Draft" : "Live"
    await slide.save()

    res.json({
      success: true,
      message: `Slide is now ${slide.status}`,
      status: slide.status,
    })
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}

// ── Admin: delete slide ──
export const deleteSlide = async (req, res) => {
  try {
    const { slideId } = req.body
    if (!slideId) return res.json({ success: false, message: "slideId required" })

    const slide = await slidemodel.findById(slideId)
    if (!slide) return res.json({ success: false, message: "Slide not found" })

    // delete from cloudinary
    const publicId = slide.image.split('/').slice(-2).join('/').split('.')[0]
    await cloudinary.v2.uploader.destroy(publicId)

    await slidemodel.findByIdAndDelete(slideId)

    res.json({ success: true, message: "Slide deleted successfully" })
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}

// ── Admin: update order ──
export const updateSlideOrder = async (req, res) => {
  try {
    const { slideId, order } = req.body
    if (!slideId) return res.json({ success: false, message: "slideId required" })

    await slidemodel.findByIdAndUpdate(slideId, { order: parseInt(order) })
    res.json({ success: true, message: "Order updated" })
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}