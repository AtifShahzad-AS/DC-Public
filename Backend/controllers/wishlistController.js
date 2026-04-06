// backend/controllers/wishlistController.js
import usermodel from "../models/usermodel.js";

export const toggleWishlist = async (req, res) => {
  try {
    const userId = req.userId;
    const { productId } = req.body;

    const user = await usermodel.findById(userId);
    let wishlist = user.wishlist || [];

    // Toggle product only if productId is sent
    if (productId) {
      if (wishlist.includes(productId)) {
        wishlist = wishlist.filter(id => id !== productId);
      } else {
        wishlist.push(productId);
      }
      await usermodel.findByIdAndUpdate(userId, { wishlist });
    }

    // Always return latest wishlist
    res.json({ success: true, wishlist });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};