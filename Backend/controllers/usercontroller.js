// import usermodel from "../models/usermodel.js";
// import validator from "validator";
// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";
// // import { upload } from "../middleware/upload.js";
// import cloudinary from "../config/cloudinary.js";
// import fs from "fs";
// import streamifier from "streamifier";

// /* ======================================================
//    TOKEN GENERATOR
// ====================================================== */

// const createtoken = (id) => {
//   return jwt.sign(
//     { id },
//     process.env.JWT_KEY,
//     { expiresIn: "7d" }
//   );
// };

// /* ======================================================
//    REGISTER USER
// ====================================================== */

// export const registeruser = async (req, res) => {
//   try {
//     const { name, email, password, } = req.body;

//     // Check required fields
//     if (!name || !email || !password) {
//       return res.json({
//         success: false,
//         message: "Name, email and password are required",
//       });
//     }

//     // Email validation
//     if (!validator.isEmail(email)) {
//       return res.json({
//         success: false,
//         message: "Invalid email format",
//       });
//     }
//     // Password strength validation
// const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])/

// if (!passwordRegex.test(password)) {
//   return res.json({
//     success: false,
//     message: "Password must contain at least one letter, one number, and one special character"
//   })
// }

//     // Check existing user
//     const existingUser = await usermodel.findOne({ email });
//     if (existingUser) {
//       return res.json({
//         success: false,
//         message: "User already exists",
//       });
//     }

//     // Hash password
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);

//     const newUser = await usermodel.create({
//       name,
//       email,
      
//       password: hashedPassword,
//     });

//     const token = createtoken(newUser._id);

//     res.status(201).json({
//       success: true,
//       message: "User registered successfully",
//       token,
//       user: {
//         id: newUser._id,
//         name: newUser.name,
//         email: newUser.email,
        
//       },
//     });
//   } catch (error) {
//     console.error("Register Error:", error);
//     res.status(500).json({
//       success: false,
//       message: "Server error",
//     });
//   }
// };


// /* ======================================================
//    LOGIN USER
// ====================================================== */

// export const loginuser = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // Check fields
//     if (!email || !password) {
//       return res.status(400).json({
//         success: false,
//         message: "Email and password are required",
//       });
//     }

//     const user = await usermodel.findOne({ email });

//     if (!user) {
//       return res.status(400).json({
//         success: false,
//         message: "User does not exist",
//       });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);

//     if (!isMatch) {
//       return res.status(400).json({
//         success: false,
//         message: "Incorrect password",
//       });
//     }

//     const token = createtoken(user._id);

//     res.status(200).json({
//       success: true,
//       message: "Login successful",
//       token,
//       user: {
//         id: user._id,
//         name: user.name,
//         email: user.email,
//         phone: user.phone,
//       },
//     });
//   } catch (error) {
//     console.error("Login Error:", error);
//     res.status(500).json({
//       success: false,
//       message: "Server error",
//     });
//   }
// };
// // POST → Get Profile
// export const getUserProfile = async (req, res) => {
//     try {
//         const user = await usermodel
//             .findById(req.userId)
//             .select("-password");

//             if (!user) {
//             return res.json({ success: false, message: "User not found" });
//         }

//         res.json({ success: true, user });

//     } catch (error) {
//         res.json({ success: false, message: error.message });
//     }
// };


// // POST → Update Profile
// // export const updateUserProfile = async (req, res) => {
// //   try {
// //     const { name, email, phone } = req.body;

// //     let updateData = { name, email, phone };

// //     if (req.file) {
// //       const streamUpload = () =>
// //         new Promise((resolve, reject) => {
// //           const stream = cloudinary.uploader.upload_stream(
// //             { folder: "profile_images" },
// //             (error, result) => {
// //               if (result) resolve(result);
// //               else reject(error);
// //             }
// //           );
// //           streamifier.createReadStream(req.file.buffer).pipe(stream);
// //         });

// //       const result = await streamUpload();

// //       updateData.profileImage = result.secure_url; // Save Cloudinary URL
// //     }

// //     const updatedUser = await usermodel.findByIdAndUpdate(
// //       req.userId,
// //       updateData,
// //       { new: true }
// //     ).select("-password");

// //     res.json({ success: true, user: updatedUser });

// //   } catch (error) {
// //     res.json({ success: false, message: error.message });
// //   }
// // };


// export const updateUserProfile = async (req, res) => {
//   try {
//     console.log("REQ FILE:", req.file);
//     const { name, email, phone } = req.body;

//     let updateData = { name, email, phone };

//     // ✅ if image uploaded
//     if (req.file) {
//       const result = await cloudinary.uploader.upload(
//         req.file.path,
//         { folder: "profile_images" }
//       );

//       updateData.profileImage = result.secure_url;

//       // delete local file
//       fs.unlinkSync(req.file.path);
//     }

//     const updatedUser = await usermodel
//       .findByIdAndUpdate(req.userId, updateData, { new: true })
//       .select("-password");

//     res.json({ success: true, user: updatedUser });

//   } catch (error) {
//     console.log(error);
//     res.json({ success: false, message: error.message });
//   }
// };


// //admin login

// // controllers/adminController.js

// export const adminlogin = async (req, res) => {
//   const { email, password } = req.body;

//   if (!email || !password) {
//     return res.status(400).json({ success: false, message: "Email and password required" });
//   }

//   if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
//     const token = jwt.sign(
//       { email }, // payload
//       process.env.JWT_KEY,
//       { expiresIn: "1d" }
//     );

//     return res.status(200).json({ success: true, token });
//   }

//   res.status(401).json({ success: false, message: "Invalid credentials" });
// };

// //update password

// export const updatePassword = async (req, res) => {
//   try {
//     const { currentPassword, newPassword } = req.body;

//     // Validation
//     if (!currentPassword || !newPassword) {
//       return res.json({ success: false, message: "All fields are required" });
//     }

//     if (newPassword.length < 6) {
//       return res.json({ success: false, message: "Password must be at least 6 characters" });
//     }

//     // Find user with password field included
//     const user = await usermodel.findById(req.userId).select("+password");

//     if (!user) {
//       return res.json({ success: false, message: "User not found" });
//     }

//     // Check if user signed up via Google (no password set)
//     if (!user.password) {
//       return res.json({ success: false, message: "Password update not available for Google accounts" });
//     }

//     // Verify current password
//     const isMatch = await bcrypt.compare(currentPassword, user.password);

//     if (!isMatch) {
//       return res.json({ success: false, message: "Current password is incorrect" });
//     }

//     // Check new password is not same as old
//     const isSame = await bcrypt.compare(newPassword, user.password);

//     if (isSame) {
//       return res.json({ success: false, message: "New password must be different from current password" });
//     }
//     // Add before hashing new password
// if (!passwordRegex.test(newPassword)) {
//   return res.json({
//     success: false,
//     message: "Password must contain at least one letter, one number, and one special character"
//   })
// }

//     // Hash new password
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(newPassword, salt);

//     // Update in DB
//     await usermodel.findByIdAndUpdate(req.userId, { password: hashedPassword });

//     res.json({ success: true, message: "Password updated successfully" });

//   } catch (error) {
//     console.log(error);
//     res.json({ success: false, message: error.message });
//   }
// };


import usermodel from "../models/usermodel.js";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cloudinary from "../config/cloudinary.js";
import fs from "fs";
import crypto from "crypto";
import nodemailer from "nodemailer";

/* ======================================================
   SHARED: PASSWORD REGEX
====================================================== */
const passwordRegex =
  /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])/;

/* ======================================================
   SHARED: IN-MEMORY STORES
   For multi-server production → replace with Redis
====================================================== */
const otpStore        = new Map(); // registration:  email  → { otp, expiresAt, userData }
const resetOtpStore   = new Map(); // forgot pw OTP: email  → { otp, expiresAt }
const resetTokenStore = new Map(); // forgot pw tok: token  → { email, expiresAt }

/* ======================================================
   SHARED: JWT TOKEN CREATOR
====================================================== */
const createtoken = (id) =>
  jwt.sign({ id }, process.env.JWT_KEY, { expiresIn: "7d" });

/* ======================================================
   SHARED: EMAIL TRANSPORTER
   Add to .env:
     SMTP_HOST=smtp.gmail.com
     SMTP_PORT=587
     SMTP_USER=you@gmail.com
     SMTP_PASS=your_app_password   ← Gmail App Password, not regular password
====================================================== */
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: Number(process.env.SMTP_PORT) || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

/* Helper: send OTP email */
const sendOtpEmail = async (email, otp, subject, bodyLine) => {
  await transporter.sendMail({
    from: `"Diamond Collection" <${process.env.SMTP_USER}>`,
    to: email,
    subject,
    html: `
      <div style="font-family:sans-serif;max-width:420px;margin:auto;padding:32px;
                  border:1px solid #e5e7eb;border-radius:12px">
        <h2 style="color:#0078D4;margin-bottom:8px">Diamond Collection</h2>
        <p style="color:#374151;font-size:15px">
          ${bodyLine}<br/>
          It expires in <strong>10 minutes</strong>.
        </p>
        <div style="font-size:36px;font-weight:700;letter-spacing:10px;
                    color:#111827;text-align:center;padding:24px 0">
          ${otp}
        </div>
        <p style="color:#9ca3af;font-size:12px;margin-top:16px">
          If you didn't request this, please ignore this email.
        </p>
      </div>`,
  });
};

/* ======================================================
   ── REGISTRATION FLOW ──────────────────────────────────
====================================================== */

/* STEP 1 – Validate inputs, send OTP
   POST /api/user/send-otp
   Body: { name, email, password }
*/
export const sendOtp = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password)
      return res.json({ success: false, message: "Name, email and password are required" });

    if (!validator.isEmail(email))
      return res.json({ success: false, message: "Invalid email format" });

    if (password.length < 6)
      return res.json({ success: false, message: "Password must be at least 6 characters" });

    if (!passwordRegex.test(password))
      return res.json({
        success: false,
        message: "Password must contain at least one letter, one number, and one special character",
      });

    const existing = await usermodel.findOne({ email });
    if (existing)
      return res.json({ success: false, message: "An account with this email already exists" });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    otpStore.set(email, {
      otp,
      expiresAt: Date.now() + 10 * 60 * 1000,
      userData: { name, email, password: hashedPassword },
    });

    await sendOtpEmail(
      email, otp,
      "Verify Your Email – Diamond Collection",
      "Use the OTP below to complete your registration."
    );

    res.json({ success: true, message: "OTP sent to your email address" });
  } catch (error) {
    console.error("Send OTP Error:", error);
    res.status(500).json({ success: false, message: "Failed to send OTP. Please try again." });
  }
};

/* STEP 2 – Verify OTP → create account
   POST /api/user/verify-otp
   Body: { email, otp }
*/
export const verifyOtpAndRegister = async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp)
      return res.json({ success: false, message: "Email and OTP are required" });

    const record = otpStore.get(email);
    if (!record)
      return res.json({ success: false, message: "No pending registration found. Please sign up again." });

    if (Date.now() > record.expiresAt) {
      otpStore.delete(email);
      return res.json({ success: false, message: "OTP has expired. Please request a new one." });
    }

    if (record.otp !== otp.trim())
      return res.json({ success: false, message: "Incorrect OTP. Please try again." });

    otpStore.delete(email);

    const existing = await usermodel.findOne({ email: record.userData.email });
    if (existing)
      return res.json({ success: false, message: "An account with this email already exists" });

    const newUser = await usermodel.create(record.userData);
    const token = createtoken(newUser._id);

    res.status(201).json({
      success: true,
      message: "Account created successfully!",
      token,
      user: { id: newUser._id, name: newUser.name, email: newUser.email },
    });
  } catch (error) {
    console.error("Verify OTP Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

/* Resend registration OTP
   POST /api/user/resend-otp
   Body: { email }
*/
export const resendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.json({ success: false, message: "Email is required" });

    const record = otpStore.get(email);
    if (!record)
      return res.json({ success: false, message: "No pending registration. Please sign up again." });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    record.otp = otp;
    record.expiresAt = Date.now() + 10 * 60 * 1000;
    otpStore.set(email, record);

    await sendOtpEmail(
      email, otp,
      "Verify Your Email – Diamond Collection",
      "Use the OTP below to complete your registration."
    );

    res.json({ success: true, message: "A new OTP has been sent to your email" });
  } catch (error) {
    console.error("Resend OTP Error:", error);
    res.status(500).json({ success: false, message: "Failed to resend OTP" });
  }
};

/* ======================================================
   ── FORGOT PASSWORD FLOW ───────────────────────────────
====================================================== */

/* STEP 1 – Send reset OTP
   POST /api/user/forgot-password
   Body: { email }
*/
export const forgotPasswordSendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.json({ success: false, message: "Email is required" });

    if (!validator.isEmail(email))
      return res.json({ success: false, message: "Invalid email format" });

    // ✅ Select password to check if account is Google-only
    const user = await usermodel.findOne({ email }).select("+password");

    // Always respond success to prevent email enumeration
    if (!user)
      return res.json({ success: true, message: "If this email is registered, an OTP has been sent." });

    if (!user.password)
      return res.json({
        success: false,
        message: "This account uses Google Sign-In. Password reset is not available.",
      });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    resetOtpStore.set(email, { otp, expiresAt: Date.now() + 10 * 60 * 1000 });

    await sendOtpEmail(
      email, otp,
      "Reset Your Password – Diamond Collection",
      "We received a request to reset your password. Use the OTP below."
    );

    res.json({ success: true, message: "If this email is registered, an OTP has been sent." });
  } catch (error) {
    console.error("Forgot Password Send OTP Error:", error);
    res.status(500).json({ success: false, message: "Failed to send OTP. Please try again." });
  }
};

/* STEP 2 – Verify reset OTP → return short-lived reset token
   POST /api/user/forgot-verify-otp
   Body: { email, otp }
*/
export const forgotVerifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp)
      return res.json({ success: false, message: "Email and OTP are required" });

    const record = resetOtpStore.get(email);
    if (!record)
      return res.json({ success: false, message: "No password reset request found. Please start again." });

    if (Date.now() > record.expiresAt) {
      resetOtpStore.delete(email);
      return res.json({ success: false, message: "OTP has expired. Please request a new one." });
    }

    if (record.otp !== otp.trim())
      return res.json({ success: false, message: "Incorrect OTP. Please try again." });

    resetOtpStore.delete(email);

    // Issue a one-time reset token valid for 15 minutes
    const resetToken = crypto.randomBytes(32).toString("hex");
    resetTokenStore.set(resetToken, { email, expiresAt: Date.now() + 15 * 60 * 1000 });

    res.json({ success: true, message: "OTP verified", resetToken });
  } catch (error) {
    console.error("Forgot Verify OTP Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

/* STEP 3 – Save new password using reset token
   POST /api/user/reset-password
   Body: { resetToken, newPassword }
*/
export const resetPassword = async (req, res) => {
  try {
    const { resetToken, newPassword } = req.body;

    if (!resetToken || !newPassword)
      return res.json({ success: false, message: "Reset token and new password are required" });

    if (newPassword.length < 6)
      return res.json({ success: false, message: "Password must be at least 6 characters" });

    if (!passwordRegex.test(newPassword))
      return res.json({
        success: false,
        message: "Password must contain at least one letter, one number, and one special character",
      });

    const record = resetTokenStore.get(resetToken);
    if (!record)
      return res.json({ success: false, message: "Invalid or expired reset link. Please start again." });

    if (Date.now() > record.expiresAt) {
      resetTokenStore.delete(resetToken);
      return res.json({ success: false, message: "Reset link has expired. Please request a new one." });
    }

    const user = await usermodel.findOne({ email: record.email }).select("+password");
    if (!user) return res.json({ success: false, message: "User not found" });

    if (user.password) {
      const isSame = await bcrypt.compare(newPassword, user.password);
      if (isSame)
        return res.json({
          success: false,
          message: "New password must be different from your current password",
        });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    await usermodel.findOneAndUpdate({ email: record.email }, { password: hashedPassword });

    resetTokenStore.delete(resetToken);

    res.json({ success: true, message: "Password reset successfully! You can now log in." });
  } catch (error) {
    console.error("Reset Password Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

/* Resend forgot-password OTP
   POST /api/user/forgot-resend-otp
   Body: { email }
*/
export const forgotResendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.json({ success: false, message: "Email is required" });

    const user = await usermodel.findOne({ email });
    if (!user)
      return res.json({ success: true, message: "If this email is registered, an OTP has been sent." });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    resetOtpStore.set(email, { otp, expiresAt: Date.now() + 10 * 60 * 1000 });

    await sendOtpEmail(
      email, otp,
      "Reset Your Password – Diamond Collection",
      "Here is your new OTP for password reset."
    );

    res.json({ success: true, message: "New OTP sent to your email" });
  } catch (error) {
    console.error("Forgot Resend OTP Error:", error);
    res.status(500).json({ success: false, message: "Failed to resend OTP" });
  }
};

/* ======================================================
   ── STANDARD AUTH ──────────────────────────────────────
====================================================== */

export const loginuser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ success: false, message: "Email and password are required" });

    // ✅ Must explicitly select password because schema has select: false
    const user = await usermodel.findOne({ email }).select("+password");
    if (!user)
      return res.status(400).json({ success: false, message: "User does not exist" });

    // ✅ Handle Google-only accounts (no password set)
    if (!user.password)
      return res.status(400).json({
        success: false,
        message: "This account was created with Google. Please use Google Sign-In.",
      });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ success: false, message: "Incorrect password" });

    const token = createtoken(user._id);
    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: { id: user._id, name: user.name, email: user.email, phone: user.phone },
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const adminlogin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ success: false, message: "Email and password required" });

  if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
    const token = jwt.sign({ email }, process.env.JWT_KEY, { expiresIn: "1d" });
    return res.status(200).json({ success: true, token });
  }

  res.status(401).json({ success: false, message: "Invalid credentials" });
};

/* ======================================================
   ── PROFILE ────────────────────────────────────────────
====================================================== */

export const getUserProfile = async (req, res) => {
  try {
    const user = await usermodel.findById(req.userId).select("-password");
    if (!user) return res.json({ success: false, message: "User not found" });
    res.json({ success: true, user });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const updateUserProfile = async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    let updateData = { name, email, phone };

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, { folder: "profile_images" });
      updateData.profileImage = result.secure_url;
      fs.unlinkSync(req.file.path);
    }

    const updatedUser = await usermodel
      .findByIdAndUpdate(req.userId, updateData, { new: true })
      .select("-password");

    res.json({ success: true, user: updatedUser });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

export const updatePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword)
      return res.json({ success: false, message: "All fields are required" });

    if (newPassword.length < 6)
      return res.json({ success: false, message: "Password must be at least 6 characters" });

    if (!passwordRegex.test(newPassword))
      return res.json({
        success: false,
        message: "Password must contain at least one letter, one number, and one special character",
      });

    const user = await usermodel.findById(req.userId).select("+password");
    if (!user) return res.json({ success: false, message: "User not found" });

    if (!user.password)
      return res.json({ success: false, message: "Password update not available for Google accounts" });

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) return res.json({ success: false, message: "Current password is incorrect" });

    const isSame = await bcrypt.compare(newPassword, user.password);
    if (isSame)
      return res.json({ success: false, message: "New password must be different from current password" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    await usermodel.findByIdAndUpdate(req.userId, { password: hashedPassword });

    res.json({ success: true, message: "Password updated successfully" });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};