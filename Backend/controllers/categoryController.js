// controllers/categoryController.js
import categoryModel from "../models/categoryModel.js"
import { v2 as cloudinary } from "cloudinary"

// ── List all categories ──
const listCategories = async (req, res) => {
  try {
    const categories = await categoryModel.find({}).sort({ createdAt: 1 })
    res.json({ success: true, categories })
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}

// ── Add category ──
const addCategory = async (req, res) => {
  try {
    const { name, emoji, description, sizes } = req.body

    if (!name) return res.json({ success: false, message: "Category name is required" })

    // Check duplicate
    const existing = await categoryModel.findOne({
      name: { $regex: new RegExp(`^${name.trim()}$`, "i") }
    })
    if (existing) return res.json({ success: false, message: "Category already exists" })

    let imageUrl = ""

    // Upload image to Cloudinary if provided
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        resource_type: "image",
        folder: "categories"
      })
      imageUrl = result.secure_url
    }

    const category = new categoryModel({
      name:        name.trim().charAt(0).toUpperCase() + name.trim().slice(1).toLowerCase(),
      emoji:       emoji || "📦",
      description: description || "",
      image:       imageUrl,
      sizes:       sizes ? JSON.parse(sizes) : [],
    })

    await category.save()
    res.json({ success: true, message: "Category added", category })
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}

// ── Update category ──
const updateCategory = async (req, res) => {
  try {
    const { categoryId, name, emoji, description, sizes } = req.body

    if (!categoryId) return res.json({ success: false, message: "categoryId required" })

    const updateData = {}
    if (name)        updateData.name        = name.trim().charAt(0).toUpperCase() + name.trim().slice(1).toLowerCase()
    if (emoji)       updateData.emoji       = emoji
    if (description !== undefined) updateData.description = description
    if (sizes)       updateData.sizes       = JSON.parse(sizes)

    // Upload new image if provided
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        resource_type: "image",
        folder: "categories"
      })
      updateData.image = result.secure_url
    }

    const category = await categoryModel.findByIdAndUpdate(categoryId, updateData, { new: true })
    if (!category) return res.json({ success: false, message: "Category not found" })

    res.json({ success: true, message: "Category updated", category })
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}

// ── Delete category ──
const deleteCategory = async (req, res) => {
  try {
    const { categoryId } = req.body
    if (!categoryId) return res.json({ success: false, message: "categoryId required" })

    await categoryModel.findByIdAndDelete(categoryId)
    res.json({ success: true, message: "Category deleted" })
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}

export { listCategories, addCategory, updateCategory, deleteCategory }