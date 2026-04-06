// controllers/googleAuthController.js
import { OAuth2Client } from "google-auth-library";
import usermodel from "../models/usermodel.js";
import jwt from "jsonwebtoken";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
console.log("GOOGLE_CLIENT_ID:", process.env.GOOGLE_CLIENT_ID);
export const googleLogin = async (req, res) => {
  try {
    const { credential } = req.body; // ID token from frontend

    if (!credential) {
      return res.status(400).json({ success: false, message: "No credential provided" });
    }

    // Verify the ID token
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    if (!payload || !payload.email) {
      return res.status(400).json({ success: false, message: "Invalid Google token" });
    }

    const email = payload.email;
    const name = payload.name || "";
    const picture = payload.picture || null;
    const googleId = payload.sub; // unique Google user id

    // find user by googleId or email
    let user = await usermodel.findOne({
      $or: [{ googleId }, { email }],
    });

    if (!user) {
      // create a new user for first time Google login
      user = await usermodel.create({
        name,
        email,
        password: "", // empty as Google user
        image: picture || "", // keep as array if needed
        googleId,
        googleImage: picture,
      });
    } else {
      // If user exists but googleId not set, set it (link accounts)
      let needsSave = false;
      if (!user.googleId) {
        user.googleId = googleId;
        needsSave = true;
      }
      if (!user.googleImage && picture) {
        user.googleImage = picture;
        needsSave = true;
      }
      if (needsSave) await user.save();
    }

    // create app JWT
    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_KEY, {
      expiresIn: "7d",
    });

    return res.json({
      success: true,
      message: "Google login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        googleImage: user.googleImage,
      },
    });
  } catch (error) {
    console.error("googleLogin error:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};
