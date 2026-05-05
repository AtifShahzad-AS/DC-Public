import reviewmodel  from "../models/reviewModel.js"
import usermodel    from "../models/userModel.js"
import productmodel from "../models/productModel.js"

// ── Customer: submit review ──
export const addReview = async (req, res) => {
  try {
    const { productId, rating, comment } = req.body
    const userId = req.userId

    if (!productId || !rating || !comment) {
      return res.json({ success: false, message: "All fields are required" })
    }

    if (rating < 1 || rating > 5) {
      return res.json({ success: false, message: "Rating must be between 1 and 5" })
    }

    if (comment.trim().length < 5) {
      return res.json({ success: false, message: "Review must be at least 5 characters" })
    }

    // Check product exists
    const product = await productmodel.findById(productId)
    if (!product) {
      return res.json({ success: false, message: "Product not found" })
    }

    // Check user exists
    const user = await usermodel.findById(userId)
    if (!user) {
      return res.json({ success: false, message: "User not found" })
    }

    // Check already reviewed
    const existing = await reviewmodel.findOne({ productId, userId })
    if (existing) {
      return res.json({ success: false, message: "You have already reviewed this product" })
    }

    const review = await reviewmodel.create({
      productId,
      userId,
      userName: user.name,
      rating:   Number(rating),
      comment:  comment.trim(),
      status:   'pending',
      isVisible: false,
    })

    res.json({
      success: true,
      message: "Review submitted successfully. It will appear after approval.",
      review,
    })

  } catch (error) {
    // Duplicate key — already reviewed
    if (error.code === 11000) {
      return res.json({ success: false, message: "You have already reviewed this product" })
    }
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}

// ── Customer: get approved reviews for a product ──
export const getProductReviews = async (req, res) => {
  try {
    const { productId } = req.body

    if (!productId) {
      return res.json({ success: false, message: "productId is required" })
    }

    const reviews = await reviewmodel
      .find({ productId, status: 'approved', isVisible: true })
      .sort({ createdAt: -1 })
      .select("-userId")

    // Average rating
    const avgRating = reviews.length > 0
      ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
      : 0

    res.json({ success: true, reviews, avgRating, totalReviews: reviews.length })

  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}

// ── Customer: check if user already reviewed ──
export const checkUserReview = async (req, res) => {
  try {
    const { productId } = req.body
    const userId = req.userId

    const existing = await reviewmodel.findOne({ productId, userId })

    res.json({
      success:     true,
      hasReviewed: !!existing,
      status:      existing?.status || null,
    })

  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}

// ── Admin: get all reviews with filters ──
export const getAllReviews = async (req, res) => {
  try {
    const { status } = req.body
    // status can be 'pending', 'approved', 'rejected', or omitted for all

    const filter = {}
    if (status && ['pending', 'approved', 'rejected'].includes(status)) {
      filter.status = status
    }

    const reviews = await reviewmodel
      .find(filter)
      .populate('productId', 'name image category')
      .sort({ createdAt: -1 })

    const counts = {
      all:      await reviewmodel.countDocuments({}),
      pending:  await reviewmodel.countDocuments({ status: 'pending'  }),
      approved: await reviewmodel.countDocuments({ status: 'approved' }),
      rejected: await reviewmodel.countDocuments({ status: 'rejected' }),
    }

    res.json({ success: true, reviews, counts })

  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}

// ── Admin: approve review ──
export const approveReview = async (req, res) => {
  try {
    const { reviewId } = req.body

    if (!reviewId) {
      return res.json({ success: false, message: "reviewId is required" })
    }

    const review = await reviewmodel.findByIdAndUpdate(
      reviewId,
      { status: 'approved', isVisible: true },
      { new: true }
    )

    if (!review) {
      return res.json({ success: false, message: "Review not found" })
    }

    // Update product average rating
    await updateProductRating(review.productId)

    res.json({ success: true, message: "Review approved", review })

  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}

// ── Admin: reject review ──
export const rejectReview = async (req, res) => {
  try {
    const { reviewId } = req.body

    if (!reviewId) {
      return res.json({ success: false, message: "reviewId is required" })
    }

    const review = await reviewmodel.findByIdAndUpdate(
      reviewId,
      { status: 'rejected', isVisible: false },
      { new: true }
    )

    if (!review) {
      return res.json({ success: false, message: "Review not found" })
    }

    // Recalculate product rating after rejection
    await updateProductRating(review.productId)

    res.json({ success: true, message: "Review rejected", review })

  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}

// ── Admin: delete review ──
export const deleteReview = async (req, res) => {
  try {
    const { reviewId } = req.body

    if (!reviewId) {
      return res.json({ success: false, message: "reviewId is required" })
    }

    const review = await reviewmodel.findByIdAndDelete(reviewId)

    if (!review) {
      return res.json({ success: false, message: "Review not found" })
    }

    await updateProductRating(review.productId)

    res.json({ success: true, message: "Review deleted" })

  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}

// ── Helper: recalculate and save product average rating ──
const updateProductRating = async (productId) => {
  try {
    const approvedReviews = await reviewmodel.find({
      productId,
      status: 'approved',
      isVisible: true,
    })

    const avgRating = approvedReviews.length > 0
      ? Number(
          (approvedReviews.reduce((sum, r) => sum + r.rating, 0) / approvedReviews.length).toFixed(1)
        )
      : 0

    await productmodel.findByIdAndUpdate(productId, {
      rating:      avgRating,
      reviewCount: approvedReviews.length,
    })

  } catch (err) {
    console.log("Rating update error:", err.message)
  }
}