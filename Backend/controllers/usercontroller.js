import usermodel from "../models/usermodel.js";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
// import { upload } from "../middleware/upload.js";
import cloudinary from "../config/cloudinary.js";
import fs from "fs";
import streamifier from "streamifier";

/* ======================================================
   TOKEN GENERATOR
====================================================== */

const createtoken = (id) => {
  return jwt.sign(
    { id },
    process.env.JWT_KEY,
    { expiresIn: "7d" }
  );
};

/* ======================================================
   REGISTER USER
====================================================== */

export const registeruser = async (req, res) => {
  try {
    const { name, email, password, } = req.body;

    // Check required fields
    if (!name || !email || !password) {
      return res.json({
        success: false,
        message: "Name, email and password are required",
      });
    }

    // Email validation
    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Invalid email format",
      });
    }
    // Password strength validation
const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])/

if (!passwordRegex.test(password)) {
  return res.json({
    success: false,
    message: "Password must contain at least one letter, one number, and one special character"
  })
}

    // Check existing user
    const existingUser = await usermodel.findOne({ email });
    if (existingUser) {
      return res.json({
        success: false,
        message: "User already exists",
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await usermodel.create({
      name,
      email,
      
      password: hashedPassword,
    });

    const token = createtoken(newUser._id);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      token,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        
      },
    });
  } catch (error) {
    console.error("Register Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};


/* ======================================================
   LOGIN USER
====================================================== */

export const loginuser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check fields
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const user = await usermodel.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User does not exist",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Incorrect password",
      });
    }

    const token = createtoken(user._id);

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
      },
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
// POST → Get Profile
export const getUserProfile = async (req, res) => {
    try {
        const user = await usermodel
            .findById(req.userId)
            .select("-password");

            if (!user) {
            return res.json({ success: false, message: "User not found" });
        }

        res.json({ success: true, user });

    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};


// POST → Update Profile
// export const updateUserProfile = async (req, res) => {
//   try {
//     const { name, email, phone } = req.body;

//     let updateData = { name, email, phone };

//     if (req.file) {
//       const streamUpload = () =>
//         new Promise((resolve, reject) => {
//           const stream = cloudinary.uploader.upload_stream(
//             { folder: "profile_images" },
//             (error, result) => {
//               if (result) resolve(result);
//               else reject(error);
//             }
//           );
//           streamifier.createReadStream(req.file.buffer).pipe(stream);
//         });

//       const result = await streamUpload();

//       updateData.profileImage = result.secure_url; // Save Cloudinary URL
//     }

//     const updatedUser = await usermodel.findByIdAndUpdate(
//       req.userId,
//       updateData,
//       { new: true }
//     ).select("-password");

//     res.json({ success: true, user: updatedUser });

//   } catch (error) {
//     res.json({ success: false, message: error.message });
//   }
// };


export const updateUserProfile = async (req, res) => {
  try {
    console.log("REQ FILE:", req.file);
    const { name, email, phone } = req.body;

    let updateData = { name, email, phone };

    // ✅ if image uploaded
    if (req.file) {
      const result = await cloudinary.uploader.upload(
        req.file.path,
        { folder: "profile_images" }
      );

      updateData.profileImage = result.secure_url;

      // delete local file
      fs.unlinkSync(req.file.path);
    }

    const updatedUser = await usermodel
      .findByIdAndUpdate(req.userId, updateData, { new: true })
      .select("-password");

    res.json({ success: true, user: updatedUser });

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};


//admin login

// controllers/adminController.js

export const adminlogin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: "Email and password required" });
  }

  if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
    const token = jwt.sign(
      { email }, // payload
      process.env.JWT_KEY,
      { expiresIn: "1d" }
    );

    return res.status(200).json({ success: true, token });
  }

  res.status(401).json({ success: false, message: "Invalid credentials" });
};

//update password

export const updatePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    // Validation
    if (!currentPassword || !newPassword) {
      return res.json({ success: false, message: "All fields are required" });
    }

    if (newPassword.length < 6) {
      return res.json({ success: false, message: "Password must be at least 6 characters" });
    }

    // Find user with password field included
    const user = await usermodel.findById(req.userId).select("+password");

    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    // Check if user signed up via Google (no password set)
    if (!user.password) {
      return res.json({ success: false, message: "Password update not available for Google accounts" });
    }

    // Verify current password
    const isMatch = await bcrypt.compare(currentPassword, user.password);

    if (!isMatch) {
      return res.json({ success: false, message: "Current password is incorrect" });
    }

    // Check new password is not same as old
    const isSame = await bcrypt.compare(newPassword, user.password);

    if (isSame) {
      return res.json({ success: false, message: "New password must be different from current password" });
    }
    // Add before hashing new password
if (!passwordRegex.test(newPassword)) {
  return res.json({
    success: false,
    message: "Password must contain at least one letter, one number, and one special character"
  })
}

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update in DB
    await usermodel.findByIdAndUpdate(req.userId, { password: hashedPassword });

    res.json({ success: true, message: "Password updated successfully" });

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};