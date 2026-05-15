// import express from "express";
// import upload from "../middleware/uploadMiddleware.js";
// import {
//   registeruser,
//   loginuser,
//   adminlogin,
//   getUserProfile,
//   updateUserProfile,updatePassword,
// } from "../controllers/usercontroller.js";
// import {
//   getAllCustomers,getSingleCustomer,deleteCustomer,
//   // getCustomerStats,
//   toggleBlockCustomer,
// } from "../controllers/customerController.js";

// import auth from "../middleware/auth.js";
// import adminauth from "../middleware/adminauth.js";

// const router = express.Router();

// /* ================= PUBLIC ROUTES ================= */

// // Register
// router.post("/register", registeruser);
// //  admin login
// router.post("/admin", adminlogin);

// // Login
// router.post("/login", loginuser);


// /* ================= PROTECTED ROUTES ================= */

// // Get Profile (changed from GET to POST)


// router.post("/profile", auth, getUserProfile);



// // router.post("/update-profile", upload.single("image"), updateUserProfile);

// router.post(
//     "/update-profile",
//     auth,
//     upload.single("image"),
//     updateUserProfile
// );

// // Add this line with your other routes
// router.post("/update-password", auth, updatePassword);
// export default router;

// //customerhandler

// router.post("/list",         adminauth, getAllCustomers)
// router.post("/single",       adminauth, getSingleCustomer)
// router.post("/delete",       adminauth, deleteCustomer)
// router.post("/block",        adminauth, toggleBlockCustomer)


// ─────────────────────────────────────────────────────────────
//  Add these 3 routes to your existing userrouter.js
//  (alongside your existing /register, /login routes)
// ─────────────────────────────────────────────────────────────





import express from "express";
import upload from "../middleware/uploadMiddleware.js";
import {
  // registeruser,
  sendOtp,
  verifyOtpAndRegister,
  forgotPasswordSendOtp,
  forgotResendOtp,
  resetPassword,
  resendOtp,
  loginuser,
  adminlogin,
  forgotVerifyOtp,
  getUserProfile,
  updateUserProfile,updatePassword,
} from "../controllers/usercontroller.js";
import {
  getAllCustomers,getSingleCustomer,deleteCustomer,
  // getCustomerStats,
  toggleBlockCustomer,
} from "../controllers/customerController.js";

import auth from "../middleware/auth.js";
import adminauth from "../middleware/adminauth.js";

const router = express.Router();

/* ================= PUBLIC ROUTES ================= */

// Register
// router.post("/register", registeruser);
//  admin login
router.post("/admin", adminlogin);

// Login
router.post("/login", loginuser);


/* ================= PROTECTED ROUTES ================= */

// Get Profile (changed from GET to POST)


router.post("/profile", auth, getUserProfile);



// router.post("/update-profile", upload.single("image"), updateUserProfile);

router.post(
    "/update-profile",
    auth,
    upload.single("image"),
    updateUserProfile
);

// Add this line with your other routes
router.post("/update-password", auth, updatePassword);
export default router;

//customerhandler

router.post("/list",         adminauth, getAllCustomers)
router.post("/single",       adminauth, getSingleCustomer)
router.post("/delete",       adminauth, deleteCustomer)
router.post("/block",        adminauth, toggleBlockCustomer)
// ── OTP Registration Flow ──────────────────────────────────
router.post("/send-otp",    sendOtp);               // Step 1: validate + send OTP
router.post("/verify-otp",  verifyOtpAndRegister);  // Step 2: verify OTP + create user
router.post("/resend-otp",  resendOtp);              // Resend a fresh OTP
// router.post("/forget-otp",  forgotPasswordSendOtp);              // forgrt OTP

/* ── Forgot Password Flow ────────────────────────────── */
router.post("/forgot-password",    forgotPasswordSendOtp); // Step 1: send reset OTP
router.post("/forgot-verify-otp",  forgotVerifyOtp);       // Step 2: verify → get reset token
router.post("/forgot-resend-otp",  forgotResendOtp);       // Resend reset OTP
router.post("/reset-password",     resetPassword);         // Step 3: save new password