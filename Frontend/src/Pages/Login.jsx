

// import React, { useContext, useEffect, useState } from "react";
// import { toast } from "react-toastify";
// import { ShopContext } from "../../Context/Shopcontext";
// import axios from "axios";
// import { assets } from "../assets/assets";
// import { Link } from "react-router-dom";

// const validatePassword = (pass) => {
//   const hasLetter  = /[a-zA-Z]/.test(pass)
//   const hasNumber  = /[0-9]/.test(pass)
//   const hasSpecial = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(pass)
//   const hasLength  = pass.length >= 6
//   return {
//     hasLetter, hasNumber, hasSpecial, hasLength,
//     isValid: hasLetter && hasNumber && hasSpecial && hasLength
//   }
// }

// const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID

// const Login = () => {
//   const [currentstate, setcurrentstate] = useState("Signup")
//   const { token, settoken, backendurl, navigate } = useContext(ShopContext)
//   const [name, setname]         = useState("")
//   const [password, setpassword] = useState("")
//   const [email, setemail]       = useState("")
//   const [passwordStrength, setPasswordStrength] = useState({
//     hasLetter: false, hasNumber: false, hasSpecial: false, hasLength: false
//   })

//   const handlegooglelogin = async (response) => {
//     try {
//       const res = await axios.post(backendurl + "/api/auth/google", {
//         credential: response.credential
//       })
//       if (res.data.success) {
//         localStorage.setItem("token", res.data.token)
//         settoken(res.data.token)
//         navigate("/")
//       }
//     } catch (err) {
//       toast.error("Google login failed")
//     }
//   }

//   useEffect(() => {
//     if (window.google) {
//       window.google.accounts.id.initialize({
//         client_id: GOOGLE_CLIENT_ID,
//         callback:  handlegooglelogin
//       })
//       window.google.accounts.id.renderButton(
//         document.getElementById("googleSignInDiv"),
//         { theme: "outline", size: "large" }
//       )
//     }
//   }, [])

//   const onsubmithandler = async (e) => {
//     e.preventDefault()
//     try {
//       if (currentstate === "Signup") {

//         // Password validation
//         const strength = validatePassword(password)
//         if (!strength.isValid) {
//           toast.error("Password must contain a letter, number and special character")
//           return
//         }

//         const response = await axios.post(backendurl + "/api/user/register", {
//           name, email, password
//         })
//         if (response.data.success) {
//           settoken(response.data.token)
//           localStorage.setItem("token", response.data.token)
//         } else {
//           toast.error(response.data.message)
//         }

//       } else {
//         const response = await axios.post(backendurl + "/api/user/login", {
//           email, password
//         })
//         if (response.data.success) {
//           settoken(response.data.token)
//           localStorage.setItem("token", response.data.token)
//         } else {
//           toast.error(response.data.message)
//         }
//       }
//     } catch (error) {
//   // show actual error
//   if (error.response && error.response.data && error.response.data.message) {
//     toast.error(error.response.data.message)
//   } else {
//     toast.error(error.message)
//   }
// }
//   }

//   useEffect(() => { if (token) navigate("/") }, [token])

//   useEffect(() => {
//     if (!token && localStorage.getItem("token")) {
//       settoken(localStorage.getItem("token"))
//     }
//   }, [])

//   const handlePasswordChange = (e) => {
//     setpassword(e.target.value)
//     if (currentstate === "Signup") {
//       setPasswordStrength(validatePassword(e.target.value))
//     }
//   }

//   const strengthRules = [
//     { key: 'hasLength',  label: 'At least 6 characters'               },
//     { key: 'hasLetter',  label: 'Contains a letter'                   },
//     { key: 'hasNumber',  label: 'Contains a number'                   },
//     { key: 'hasSpecial', label: 'Contains a special character (!@#$...)' },
//   ]

//   return (
//     <div className="h-screen w-full flex flex-col lg:flex-row">

//       {/* ── Left Section ── */}
//       <div className="w-full lg:w-1/2 cursor-default flex flex-col sm:px-8 px-6 py-3 bg-white h-screen">

//         <div className="flex justify-between items-center mb-2">
//           <Link to="/" className="inline-block">
//             <img className="w-12 sm:w-15 md:17 lg:w-20" src={assets.glogo} alt="" />
//           </Link>
//           <Link
//             to="/"
//             className="px-2 sm:px-4 py-1 sm:py-2 bg-gray-100 text-black rounded-lg text-sm
//               font-semibold border border-gray-300 hover:bg-gray-200 transition"
//           >
//             Continue without login
//           </Link>
//         </div>

//         <div className="w-full md:w-1/2 lg:w-4/6 bg-white lg:bg-none px-3 py-3 lg:py-5
//           rounded-md shadow-xl lg:shadow-none border lg:border-none m-auto flex flex-col">

//           <h2 className="sm:text-2xl text-lg font-bold text-gray-900 mb-1 text-center">
//             {currentstate === "Login" ? "Welcome Back" : "Create Your Account"}
//           </h2>
//           <p className="text-gray-500 text-center text-sm mb-3 sm:mb-4">
//             Please enter your details to continue
//           </p>

//           <form onSubmit={onsubmithandler} className="flex flex-col gap-3">

//             <div id="googleSignInDiv" className="gap-0" />

//             <div className="flex items-center lg:my-1">
//               <hr className="flex-grow border-t border-gray-300" />
//               <span className="mx-2 text-gray-400 font-semibold text-sm">OR</span>
//               <hr className="flex-grow border-t border-gray-300" />
//             </div>

//             {currentstate === "Signup" && (
//               <input
//                 onChange={(e) => setname(e.target.value)}
//                 value={name}
//                 required
//                 type="text"
//                 className="w-full text-black border rounded-lg border-gray-300 px-2.5 py-2 text-sm outline-none"
//                 placeholder="Full Name"
//               />
//             )}

//             <input
//               onChange={(e) => setemail(e.target.value)}
//               value={email}
//               required
//               type="email"
//               className="w-full text-black border rounded-lg border-gray-300 px-2.5 py-2 text-sm outline-none"
//               placeholder="Email Address"
//             />

//             <input
//               onChange={handlePasswordChange}
//               value={password}
//               required
//               type="password"
//               className="w-full text-black border rounded-lg border-gray-300 px-2.5 py-2 text-sm outline-none"
//               placeholder="Password"
//             />

//             {/* ── Password strength — Signup only ── */}
//             {currentstate === "Signup" && password.length > 0 && (
//               <div className="flex flex-col gap-1.5 p-3 bg-gray-50 rounded-lg border border-gray-100">
//                 {strengthRules.map(rule => (
//                   <div key={rule.key} className="flex items-center gap-2">
//                     <div className={`w-3.5 h-3.5 rounded-full flex items-center justify-center flex-shrink-0
//                       ${passwordStrength[rule.key] ? 'bg-green-500' : 'bg-gray-200'}`}>
//                       {passwordStrength[rule.key] && (
//                         <svg className="w-2 h-2 text-white" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
//                           <polyline points="20 6 9 17 4 12"/>
//                         </svg>
//                       )}
//                     </div>
//                     <span className={`text-xs ${passwordStrength[rule.key] ? 'text-green-600' : 'text-gray-400'}`}>
//                       {rule.label}
//                     </span>
//                   </div>
//                 ))}
//               </div>
//             )}

//             <div className="flex justify-between text-xs">
//               {currentstate === "Login" && (
//                 <p className="hover:cursor-pointer text-black sm:text-sm">Forgot Password?</p>
//               )}
//               {currentstate === "Login" ? (
//                 <p onClick={() => { setcurrentstate("Signup"); setpassword(""); setPasswordStrength({ hasLetter: false, hasNumber: false, hasSpecial: false, hasLength: false }) }}
//                   className="hover:cursor-pointer text-black sm:text-sm">
//                   Don't have an account?
//                 </p>
//               ) : (
//                 <p onClick={() => { setcurrentstate("Login"); setpassword(""); setPasswordStrength({ hasLetter: false, hasNumber: false, hasSpecial: false, hasLength: false }) }}
//                   className="hover:cursor-pointer text-black sm:text-sm">
//                   Already have an account?
//                 </p>
//               )}
//             </div>

//             <button className="w-full py-2.5 font-bold text-white rounded-lg bg-blue-500 hover:cursor-pointer shadow-md text-sm">
//               {currentstate === "Login" ? "Sign In" : "Sign Up"}
//             </button>

//           </form>
//         </div>
//       </div>

//       {/* ── Right Section ── */}
//       <div className="hidden lg:flex w-1/2 relative">
//         <img
//           src={assets.b6}
//           alt="Login Side"
//           className="w-full h-full object-cover"
//         />
//         <div className="absolute inset-0 flex flex-col justify-center items-center text-center
//           px-6 text-black max-w-lg mx-auto drop-shadow-lg">
//           <h2 className="text-4xl font-bold mb-4">
//             Transform Your Home with Comfort
//           </h2>
//           <p className="text-lg leading-relaxed">
//             Shop premium bedsheets, pillows, curtains, sofa covers & more —
//             beautifully crafted for your lifestyle.
//           </p>
//         </div>
//       </div>

//     </div>
//   )
// }

// export default Login

import React, { useContext, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { ShopContext } from "../../Context/Shopcontext";
import axios from "axios";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

/* ======================================================
   PASSWORD STRENGTH HELPER
====================================================== */
const validatePassword = (pass) => {
  const hasLetter  = /[a-zA-Z]/.test(pass);
  const hasNumber  = /[0-9]/.test(pass);
  const hasSpecial = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(pass);
  const hasLength  = pass.length >= 6;
  return {
    hasLetter, hasNumber, hasSpecial, hasLength,
    isValid: hasLetter && hasNumber && hasSpecial && hasLength,
  };
};

const strengthRules = [
  { key: "hasLength",  label: "At least 6 characters"                   },
  { key: "hasLetter",  label: "Contains a letter"                       },
  { key: "hasNumber",  label: "Contains a number"                       },
  { key: "hasSpecial", label: "Contains a special character (!@#$...)"  },
];

const emptyStrength = { hasLetter: false, hasNumber: false, hasSpecial: false, hasLength: false };

/* ======================================================
   REUSABLE: 6-BOX OTP INPUT
====================================================== */
function OtpInput({ value, onChange }) {
  const inputs = useRef([]);

  const handleChange = (i, e) => {
    const raw = e.target.value.replace(/\D/g, "");

    // Handle paste of multiple digits
    if (raw.length > 1) {
      const filled = raw.slice(0, 6).split("");
      const arr = Array(6).fill("");
      filled.forEach((d, idx) => { arr[idx] = d; });
      onChange(arr.join(""));
      const nextEmpty = arr.findIndex((c) => !c);
      inputs.current[nextEmpty === -1 ? 5 : nextEmpty]?.focus();
      return;
    }

    const arr = value.padEnd(6, "").split("");
    arr[i] = raw;
    onChange(arr.join("").trimEnd());
    if (raw && i < 5) inputs.current[i + 1]?.focus();
  };

  const handleKeyDown = (i, e) => {
    if (e.key === "Backspace") {
      const arr = value.padEnd(6, "").split("");
      if (arr[i]) {
        arr[i] = "";
        onChange(arr.join("").trimEnd());
      } else if (i > 0) {
        inputs.current[i - 1]?.focus();
      }
    }
  };

  return (
    <div className="flex gap-2 justify-center my-4">
      {Array.from({ length: 6 }).map((_, i) => (
        <input
          key={i}
          ref={(el) => (inputs.current[i] = el)}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={value[i] || ""}
          onChange={(e) => handleChange(i, e)}
          onKeyDown={(e) => handleKeyDown(i, e)}
          className="w-10 h-11 sm:w-11 sm:h-12 text-center text-lg font-bold border-2
            rounded-lg border-gray-300 focus:border-blue-500 focus:outline-none
            transition text-gray-900 bg-white caret-transparent select-none"
        />
      ))}
    </div>
  );
}

/* ======================================================
   REUSABLE: COUNTDOWN HOOK
====================================================== */
function useCountdown(initial = 60) {
  const [seconds, setSeconds] = useState(0);
  const start = () => setSeconds(initial);
  useEffect(() => {
    if (seconds <= 0) return;
    const t = setTimeout(() => setSeconds((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [seconds]);
  return { seconds, start };
}

/* ======================================================
   MODAL WRAPPER
====================================================== */
function Modal({ children, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 sm:p-8 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-gray-400 hover:text-gray-600 text-xl font-bold leading-none"
          aria-label="Close"
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  );
}

/* ======================================================
   OTP MODAL (shared for both signup & forgot-password)
   Props:
     title        – heading text
     subtitle     – line below heading
     email        – shown in blue
     onVerify(otp) – called when user clicks Verify
     onResend()   – called when user clicks Resend
     onClose()    – close modal
     verifyLabel  – button text (e.g. "Verify & Create Account")
     loading      – disables verify button
====================================================== */
function OtpModal({ title, subtitle, email, onVerify, onResend, onClose, verifyLabel, loading }) {
  const [otp, setOtp] = useState("");
  const { seconds, start } = useCountdown(60);

  useEffect(() => { start(); }, []); // start countdown on mount

  const handleResend = async () => {
    if (seconds > 0) return;
    await onResend();
    start();
    setOtp("");
  };

  return (
    <Modal onClose={onClose}>
      {/* Icon */}
      <div className="flex justify-center mb-3">
        <div className="w-14 h-14 bg-blue-50 rounded-full flex items-center justify-center">
          <svg className="w-7 h-7 text-blue-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
      </div>

      <h3 className="text-center text-lg font-bold text-gray-900 mb-1">{title}</h3>
      <p className="text-center text-sm text-gray-500 mb-1">{subtitle}</p>
      <p className="text-center text-sm font-semibold text-blue-500 break-all mb-2">{email}</p>

      <OtpInput value={otp} onChange={setOtp} />

      <button
        onClick={() => onVerify(otp)}
        disabled={loading || otp.replace(/\s/g, "").length < 6}
        className="w-full py-2.5 bg-blue-500 hover:bg-blue-600 disabled:opacity-50
          disabled:cursor-not-allowed text-white font-bold rounded-lg text-sm transition mt-1"
      >
        {loading ? "Verifying…" : verifyLabel}
      </button>

      <p className="text-center text-xs text-gray-400 mt-4">
        Didn't receive the code?{" "}
        {seconds > 0 ? (
          <span className="text-gray-400">Resend in {seconds}s</span>
        ) : (
          <button
            onClick={handleResend}
            className="text-blue-500 font-semibold hover:underline"
          >
            Resend OTP
          </button>
        )}
      </p>
    </Modal>
  );
}

/* ======================================================
   NEW PASSWORD MODAL
   Shown after forgot-password OTP is verified.
   Props:
     onSubmit(newPassword) – save password
     onClose()
     loading
====================================================== */
function NewPasswordModal({ onSubmit, onClose, loading }) {
  const [newPass, setNewPass]     = useState("");
  const [confirm, setConfirm]     = useState("");
  const [showNew, setShowNew]     = useState(false);
  const [showConf, setShowConf]   = useState(false);
  const [strength, setStrength]   = useState(emptyStrength);

  const handleChange = (e) => {
    setNewPass(e.target.value);
    setStrength(validatePassword(e.target.value));
  };

  const handleSubmit = () => {
    if (!strength.isValid) {
      toast.error("Password must contain a letter, number and special character");
      return;
    }
    if (newPass !== confirm) {
      toast.error("Passwords do not match");
      return;
    }
    onSubmit(newPass);
  };

  return (
    <Modal onClose={onClose}>
      {/* Icon */}
      <div className="flex justify-center mb-3">
        <div className="w-14 h-14 bg-green-50 rounded-full flex items-center justify-center">
          <svg className="w-7 h-7 text-green-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M12 11c0-1.1-.9-2-2-2s-2 .9-2 2v2H7v4h10v-4h-1v-2c0-1.1-.9-2-2-2s-2 .9-2 2v2h2v-2z" />
            <rect x="3" y="11" width="18" height="11" rx="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>

      <h3 className="text-center text-lg font-bold text-gray-900 mb-1">Set New Password</h3>
      <p className="text-center text-sm text-gray-500 mb-4">
        Choose a strong password for your account
      </p>

      {/* New password */}
      <div className="relative mb-3">
        <input
          type={showNew ? "text" : "password"}
          value={newPass}
          onChange={handleChange}
          placeholder="New Password"
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm pr-10 outline-none
            focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
        />
        <button
          type="button"
          onClick={() => setShowNew((s) => !s)}
          className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600 text-xs"
        >
          {showNew ? "Hide" : "Show"}
        </button>
      </div>

      {/* Strength indicators */}
      {newPass.length > 0 && (
        <div className="flex flex-col gap-1.5 p-3 bg-gray-50 rounded-lg border border-gray-100 mb-3">
          {strengthRules.map((rule) => (
            <div key={rule.key} className="flex items-center gap-2">
              <div className={`w-3.5 h-3.5 rounded-full flex items-center justify-center flex-shrink-0
                ${strength[rule.key] ? "bg-green-500" : "bg-gray-200"}`}>
                {strength[rule.key] && (
                  <svg className="w-2 h-2 text-white" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
              </div>
              <span className={`text-xs ${strength[rule.key] ? "text-green-600" : "text-gray-400"}`}>
                {rule.label}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Confirm password */}
      <div className="relative mb-4">
        <input
          type={showConf ? "text" : "password"}
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          placeholder="Confirm New Password"
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm pr-10 outline-none
            focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
        />
        <button
          type="button"
          onClick={() => setShowConf((s) => !s)}
          className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600 text-xs"
        >
          {showConf ? "Hide" : "Show"}
        </button>
      </div>

      {/* Match indicator */}
      {confirm.length > 0 && (
        <p className={`text-xs mb-3 ${newPass === confirm ? "text-green-600" : "text-red-500"}`}>
          {newPass === confirm ? "✓ Passwords match" : "✗ Passwords do not match"}
        </p>
      )}

      <button
        onClick={handleSubmit}
        disabled={loading || !strength.isValid || newPass !== confirm}
        className="w-full py-2.5 bg-blue-500 hover:bg-blue-600 disabled:opacity-50
          disabled:cursor-not-allowed text-white font-bold rounded-lg text-sm transition"
      >
        {loading ? "Saving…" : "Reset Password"}
      </button>
    </Modal>
  );
}

/* ======================================================
   FORGOT PASSWORD MODAL (email input — step 0)
====================================================== */
function ForgotEmailModal({ onSend, onClose, loading }) {
  const [email, setEmail] = useState("");

  return (
    <Modal onClose={onClose}>
      <div className="flex justify-center mb-3">
        <div className="w-14 h-14 bg-blue-50 rounded-full flex items-center justify-center">
          <svg className="w-7 h-7 text-blue-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
          </svg>
        </div>
      </div>

      <h3 className="text-center text-lg font-bold text-gray-900 mb-1">Forgot Password?</h3>
      <p className="text-center text-sm text-gray-500 mb-5">
        Enter your registered email and we'll send you an OTP to reset your password.
      </p>

      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email Address"
        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none
          focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition mb-4"
        onKeyDown={(e) => e.key === "Enter" && email && onSend(email)}
      />

      <button
        onClick={() => onSend(email)}
        disabled={loading || !email}
        className="w-full py-2.5 bg-blue-500 hover:bg-blue-600 disabled:opacity-50
          disabled:cursor-not-allowed text-white font-bold rounded-lg text-sm transition"
      >
        {loading ? "Sending OTP…" : "Send OTP"}
      </button>
    </Modal>
  );
}

/* ======================================================
   SUCCESS MODAL
====================================================== */
function SuccessModal({ message, onClose }) {
  return (
    <Modal onClose={onClose}>
      <div className="flex justify-center mb-4">
        <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center">
          <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
      </div>
      <h3 className="text-center text-lg font-bold text-gray-900 mb-2">Success!</h3>
      <p className="text-center text-sm text-gray-500 mb-6">{message}</p>
      <button
        onClick={onClose}
        className="w-full py-2.5 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-lg text-sm transition"
      >
        Go to Login
      </button>
    </Modal>
  );
}

/* ======================================================
   MAIN LOGIN / SIGNUP COMPONENT
====================================================== */
const Login = () => {
  const [currentstate, setCurrentState] = useState("Signup");
  const { token, settoken, backendurl, navigate } = useContext(ShopContext);

  /* Form fields */
  const [name, setName]         = useState("");
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [passwordStrength, setPasswordStrength] = useState(emptyStrength);

  /* UI states */
  const [sendingOtp, setSendingOtp]   = useState(false);
  const [verifyingOtp, setVerifyingOtp] = useState(false);
  const [savingPass, setSavingPass]   = useState(false);
  const [sendingForgot, setSendingForgot] = useState(false);

  /* Modal visibility
     "signup-otp"   → signup OTP modal
     "forgot-email" → forgot password email entry
     "forgot-otp"   → forgot password OTP modal
     "new-password" → new password entry
     "success"      → success screen
  */
  const [modal, setModal] = useState(null);

  /* Forgot password state */
  const [forgotEmail, setForgotEmail]     = useState("");
  const [resetToken, setResetToken]       = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  /* ── Google login ── */
  const handleGoogleLogin = async (response) => {
    try {
      const res = await axios.post(backendurl + "/api/auth/google", {
        credential: response.credential,
      });
      if (res.data.success) {
        localStorage.setItem("token", res.data.token);
        settoken(res.data.token);
        navigate("/");
      }
    } catch {
      toast.error("Google login failed");
    }
  };

  useEffect(() => {
    if (window.google) {
      window.google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: handleGoogleLogin,
      });
      window.google.accounts.id.renderButton(
        document.getElementById("googleSignInDiv"),
        { theme: "outline", size: "large" }
      );
    }
  }, []);

  useEffect(() => { if (token) navigate("/"); }, [token]);
  useEffect(() => {
    if (!token && localStorage.getItem("token")) settoken(localStorage.getItem("token"));
  }, []);

  /* ── Password change ── */
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (currentstate === "Signup") setPasswordStrength(validatePassword(e.target.value));
  };

  const switchState = (next) => {
    setCurrentState(next);
    setPassword("");
    setPasswordStrength(emptyStrength);
  };

  /* ══════════════════════════════════════════════════════
     SIGNUP FLOW
  ══════════════════════════════════════════════════════ */
  const handleSignupSubmit = async (e) => {
    e.preventDefault();

    const strength = validatePassword(password);
    if (!strength.isValid) {
      toast.error("Password must contain a letter, number and special character");
      return;
    }

    setSendingOtp(true);
    try {
      const res = await axios.post(backendurl + "/api/user/send-otp", { name, email, password });
      if (res.data.success) {
        toast.info("OTP sent! Check your inbox.");
        setModal("signup-otp");
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || err.message);
    } finally {
      setSendingOtp(false);
    }
  };

  /* Verify signup OTP */
  const handleSignupVerify = async (otp) => {
    setVerifyingOtp(true);
    try {
      const res = await axios.post(backendurl + "/api/user/verify-otp", { email, otp });
      if (res.data.success) {
        toast.success("Account created successfully!");
        setModal(null);
        settoken(res.data.token);
        localStorage.setItem("token", res.data.token);
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "Verification failed");
    } finally {
      setVerifyingOtp(false);
    }
  };

  /* Resend signup OTP */
  const handleSignupResend = async () => {
    try {
      const res = await axios.post(backendurl + "/api/user/resend-otp", { email });
      if (res.data.success) toast.success("New OTP sent!");
      else toast.error(res.data.message);
    } catch {
      toast.error("Failed to resend OTP");
    }
  };

  /* ══════════════════════════════════════════════════════
     LOGIN FLOW
  ══════════════════════════════════════════════════════ */
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(backendurl + "/api/user/login", { email, password });
      if (res.data.success) {
        settoken(res.data.token);
        localStorage.setItem("token", res.data.token);
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || err.message);
    }
  };

  const onsubmithandler = currentstate === "Signup" ? handleSignupSubmit : handleLoginSubmit;

  /* ══════════════════════════════════════════════════════
     FORGOT PASSWORD FLOW
  ══════════════════════════════════════════════════════ */

  /* Step 0 → open email modal */
  const openForgot = () => setModal("forgot-email");

  /* Step 1 → send OTP */
  const handleForgotSend = async (emailInput) => {
    if (!emailInput) { toast.error("Enter your email"); return; }
    setSendingForgot(true);
    try {
      const res = await axios.post(backendurl + "/api/user/forgot-password", { email: emailInput });
      if (res.data.success) {
        setForgotEmail(emailInput);
        toast.info("OTP sent! Check your inbox.");
        setModal("forgot-otp");
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to send OTP");
    } finally {
      setSendingForgot(false);
    }
  };

  /* Step 2 → verify reset OTP */
  const handleForgotVerify = async (otp) => {
    setVerifyingOtp(true);
    try {
      const res = await axios.post(backendurl + "/api/user/forgot-verify-otp", {
        email: forgotEmail,
        otp,
      });
      if (res.data.success) {
        setResetToken(res.data.resetToken);
        setModal("new-password");
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "Verification failed");
    } finally {
      setVerifyingOtp(false);
    }
  };

  /* Resend reset OTP */
  const handleForgotResend = async () => {
    try {
      const res = await axios.post(backendurl + "/api/user/forgot-resend-otp", { email: forgotEmail });
      if (res.data.success) toast.success("New OTP sent!");
      else toast.error(res.data.message);
    } catch {
      toast.error("Failed to resend OTP");
    }
  };

  /* Step 3 → save new password */
  const handleResetPassword = async (newPassword) => {
    setSavingPass(true);
    try {
      const res = await axios.post(backendurl + "/api/user/reset-password", {
        resetToken,
        newPassword,
      });
      if (res.data.success) {
        setSuccessMessage(res.data.message);
        setModal("success");
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to reset password");
    } finally {
      setSavingPass(false);
    }
  };

  /* After success → go to login */
  const handleSuccessClose = () => {
    setModal(null);
    setForgotEmail("");
    setResetToken("");
    switchState("Login");
  };

  /* ══════════════════════════════════════════════════════
     RENDER
  ══════════════════════════════════════════════════════ */
  return (
    <>
      {/* ── Signup OTP Modal ── */}
      {modal === "signup-otp" && (
        <OtpModal
          title="Verify your email"
          subtitle="We sent a 6-digit code to"
          email={email}
          onVerify={handleSignupVerify}
          onResend={handleSignupResend}
          onClose={() => setModal(null)}
          verifyLabel="Verify & Create Account"
          loading={verifyingOtp}
        />
      )}

      {/* ── Forgot: email entry ── */}
      {modal === "forgot-email" && (
        <ForgotEmailModal
          onSend={handleForgotSend}
          onClose={() => setModal(null)}
          loading={sendingForgot}
        />
      )}

      {/* ── Forgot: OTP entry ── */}
      {modal === "forgot-otp" && (
        <OtpModal
          title="Check your email"
          subtitle="Enter the OTP sent to"
          email={forgotEmail}
          onVerify={handleForgotVerify}
          onResend={handleForgotResend}
          onClose={() => setModal(null)}
          verifyLabel="Verify OTP"
          loading={verifyingOtp}
        />
      )}

      {/* ── New password ── */}
      {modal === "new-password" && (
        <NewPasswordModal
          onSubmit={handleResetPassword}
          onClose={() => setModal(null)}
          loading={savingPass}
        />
      )}

      {/* ── Success ── */}
      {modal === "success" && (
        <SuccessModal
          message={successMessage || "Your password has been reset. You can now log in."}
          onClose={handleSuccessClose}
        />
      )}

      {/* ══════════════════════════════════════════════════
          MAIN PAGE
      ══════════════════════════════════════════════════ */}
      <div className="h-screen w-full flex flex-col lg:flex-row">

        {/* ── Left Section ── */}
        <div className="w-full lg:w-1/2 flex flex-col sm:px-8 px-6 py-3 bg-white h-screen">

          {/* Top bar */}
          <div className="flex justify-between items-center mb-2">
            <Link to="/" className="inline-block">
              <img className="w-12 sm:w-14 lg:w-20" src={assets.glogo} alt="Logo" />
            </Link>
            <Link
              to="/"
              className="px-2 sm:px-4 py-1 sm:py-2 bg-gray-100 text-black rounded-lg text-sm
                font-semibold border border-gray-300 hover:bg-gray-200 transition"
            >
              Continue without login
            </Link>
          </div>

          {/* Card */}
          <div className="w-full md:w-1/2 lg:w-4/6 bg-white lg:bg-none px-3 py-3 lg:py-5
            rounded-md shadow-xl lg:shadow-none border lg:border-none m-auto flex flex-col">

            <h2 className="sm:text-2xl text-lg font-bold text-gray-900 mb-1 text-center">
              {currentstate === "Login" ? "Welcome Back" : "Create Your Account"}
            </h2>
            <p className="text-gray-500 text-center text-sm mb-3 sm:mb-4">
              Please enter your details to continue
            </p>

            <form onSubmit={onsubmithandler} className="flex flex-col gap-3">

              {/* Google button */}
              <div id="googleSignInDiv" />

              <div className="flex items-center">
                <hr className="flex-grow border-t border-gray-300" />
                <span className="mx-2 text-gray-400 font-semibold text-sm">OR</span>
                <hr className="flex-grow border-t border-gray-300" />
              </div>

              {/* Name — signup only */}
              {currentstate === "Signup" && (
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  type="text"
                  placeholder="Full Name"
                  className="w-full text-black border rounded-lg border-gray-300 px-2.5 py-2 text-sm outline-none focus:border-blue-500 transition"
                />
              )}

              {/* Email */}
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                type="email"
                placeholder="Email Address"
                className="w-full text-black border rounded-lg border-gray-300 px-2.5 py-2 text-sm outline-none focus:border-blue-500 transition"
              />

              {/* Password */}
              <input
                value={password}
                onChange={handlePasswordChange}
                required
                type="password"
                placeholder="Password"
                className="w-full text-black border rounded-lg border-gray-300 px-2.5 py-2 text-sm outline-none focus:border-blue-500 transition"
              />

              {/* Strength indicators — signup only */}
              {/* {currentstate === "Signup" && password.length > 0 && (
                <div className="flex flex-col gap-1.5 p-3 bg-gray-50 rounded-lg border border-gray-100">
                  {strengthRules.map((rule) => (
                    <div key={rule.key} className="flex items-center gap-2">
                      <div className={`w-3.5 h-3.5 rounded-full flex items-center justify-center flex-shrink-0
                        ${passwordStrength[rule.key] ? "bg-green-500" : "bg-gray-200"}`}>
                        {passwordStrength[rule.key] && (
                          <svg className="w-2 h-2 text-white" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        )}
                      </div>
                      <span className={`text-xs ${passwordStrength[rule.key] ? "text-green-600" : "text-gray-400"}`}>
                        {rule.label}
                      </span>
                    </div>
                  ))}
                </div>
              )} */}

              {/* Forgot / switch state */}
              <div className="flex justify-between text-xs sm:text-sm">
                {currentstate === "Login" && (
                  <button
                    type="button"
                    onClick={openForgot}
                    className="text-blue-500 font-semibold hover:underline"
                  >
                    Forgot Password?
                  </button>
                )}
                {currentstate === "Login" ? (
                  <button
                    type="button"
                    onClick={() => switchState("Signup")}
                    className="text-black hover:text-blue-500 transition ml-auto"
                  >
                    Don't have an account?
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => switchState("Login")}
                    className="text-black hover:text-blue-500 transition"
                  >
                    Already have an account?
                  </button>
                )}
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={sendingOtp}
                className="w-full py-2.5 font-bold text-white rounded-lg bg-blue-500
                  hover:bg-blue-600 disabled:opacity-60 disabled:cursor-not-allowed
                  shadow-md text-sm transition"
              >
                {currentstate === "Login"
                  ? "Sign In"
                  : sendingOtp
                  ? "Sending OTP…"
                  : "Sign Up"}
              </button>

            </form>
          </div>
        </div>

        {/* ── Right Section (desktop only) ── */}
        <div className="hidden lg:flex w-1/2 relative">
          <img
            src={assets.b6}
            alt="Login visual"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 flex flex-col justify-center items-center text-center
            px-6 text-black max-w-lg mx-auto drop-shadow-lg">
            <h2 className="text-4xl font-bold mb-4">Transform Your Home with Comfort</h2>
            <p className="text-lg leading-relaxed">
              Shop premium bedsheets, pillows, curtains, sofa covers & more —
              beautifully crafted for your lifestyle.
            </p>
          </div>
        </div>

      </div>
    </>
  );
};

export default Login;