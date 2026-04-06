import React, { useState, useEffect, useContext } from 'react'
import { FaCloudUploadAlt, FaRegUser, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa'
import { IoBagCheckOutline } from 'react-icons/io5'
import { IoMdHeartEmpty } from 'react-icons/io'
import { IoIosLogOut } from 'react-icons/io'
import { NavLink, useNavigate } from 'react-router-dom'
import TextField from '@mui/material/TextField'
import axios from 'axios'
import { ShopContext } from '../../Context/Shopcontext'
import { toast } from 'react-toastify'

const validatePassword = (pass) => {
  const hasLetter  = /[a-zA-Z]/.test(pass)
  const hasNumber  = /[0-9]/.test(pass)
  const hasSpecial = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(pass)
  const hasLength  = pass.length >= 6
  return {
    hasLetter, hasNumber, hasSpecial, hasLength,
    isValid: hasLetter && hasNumber && hasSpecial && hasLength
  }
}

const strengthRules = [
  { key: 'hasLength',  label: 'At least 6 characters'                },
  { key: 'hasLetter',  label: 'Contains a letter'                    },
  { key: 'hasNumber',  label: 'Contains a number'                    },
  { key: 'hasSpecial', label: 'Contains a special character (!@#$...)' },
]

const Profile = () => {
  const { backendurl, token, settoken, setcartitems } = useContext(ShopContext)
  const navigate = useNavigate()

  const [userData, setUserData]       = useState({})
  const [image, setImage]             = useState(null)
  const [name, setName]               = useState("")
  const [email, setEmail]             = useState("")
  const [phone, setPhone]             = useState("")
  const [profileLoading, setProfileLoading] = useState(false)

  const [currentPassword, setCurrentPassword]   = useState("")
  const [newPassword, setNewPassword]           = useState("")
  const [confirmPassword, setConfirmPassword]   = useState("")
  const [showCurrent, setShowCurrent]           = useState(false)
  const [showNew, setShowNew]                   = useState(false)
  const [showConfirm, setShowConfirm]           = useState(false)
  const [passwordLoading, setPasswordLoading]   = useState(false)
  const [newPasswordStrength, setNewPasswordStrength] = useState({
    hasLetter: false, hasNumber: false, hasSpecial: false, hasLength: false
  })

  // ── Fetch Profile ──
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await axios.post(
          backendurl + "/api/user/profile", {},
          { headers: { Authorization: `Bearer ${token}` } }
        )
        if (data.success) {
          setUserData(data.user)
          setName(data.user.name)
          setEmail(data.user.email)
          setPhone(data.user.phone || "")
        }
      } catch (error) {
        console.log(error)
      }
    }
    if (token) fetchProfile()
  }, [token, backendurl])

  // ── Update Profile ──
  const handleSubmit = async (e) => {
    e.preventDefault()
    setProfileLoading(true)
    try {
      const formData = new FormData()
      formData.append("name", name)
      formData.append("email", email)
      formData.append("phone", phone)
      if (image) formData.append("image", image)

      const { data } = await axios.post(
        backendurl + "/api/user/update-profile", formData,
        { headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" } }
      )
      if (data.success) {
        toast.success("Profile updated successfully")
        setUserData(data.user)
        setName(data.user.name)
        setEmail(data.user.email)
        setPhone(data.user.phone || "")
        setImage(null)
      }
    } catch (error) {
      toast.error("Failed to update profile")
      console.log(error)
    } finally {
      setProfileLoading(false)
    }
  }

  // ── Update Password ──
  const handlePasswordUpdate = async (e) => {
    e.preventDefault()

    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error("Please fill in all password fields")
      return
    }

    // ── Full validation ──
    const strength = validatePassword(newPassword)
    if (!strength.isValid) {
      toast.error("Password must contain a letter, number and special character at least 6")
      return
    }

    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match")
      return
    }

    setPasswordLoading(true)
    try {
      const { data } = await axios.post(
        backendurl + "/api/user/update-password",
        { currentPassword, newPassword },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      if (data.success) {
        toast.success("Password updated successfully")
        setCurrentPassword("")
        setNewPassword("")
        setConfirmPassword("")
        setNewPasswordStrength({ hasLetter: false, hasNumber: false, hasSpecial: false, hasLength: false })
      } else {
        toast.error(data.message || "Failed to update password")
      }
    } catch (error) {
      toast.error("Something went wrong")
      console.log(error)
    } finally {
      setPasswordLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("token")
    settoken("")
    setcartitems({})
    toast.success("Logged out")
    navigate("/", { replace: true })
  }

  const sidebarLinks = [
    { to: "/profile",  label: "My Profile",  icon: <FaRegUser className="text-[17px]" />      },
    { to: "/wishlist", label: "My Wishlist",  icon: <IoMdHeartEmpty className="text-[18px]" /> },
    { to: "/orders",   label: "My Orders",    icon: <IoBagCheckOutline className="text-[17px]" /> },
  ]

  return (
    <section className="w-full min-h-screen bg-[#f7f3f3] px-4 sm:px-6 lg:px-10 py-24">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-6">

        {/* ── Sidebar ── */}
        <aside className="w-full lg:w-[25%]">
          <div className="bg-white shadow-md rounded-xl overflow-hidden">
            <div className="flex flex-col items-center p-6 border-b">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden mb-3 relative group">
                <img
                  src={image ? URL.createObjectURL(image) : userData.profileImage || "/default-profile.png"}
                  className="w-full h-full object-cover"
                  alt="profile"
                />
                <div className="absolute inset-0 z-10 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                  <FaCloudUploadAlt className="text-white text-2xl" />
                  <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])}
                    className="absolute inset-0 opacity-0 cursor-pointer" />
                </div>
              </div>
              <h2 className="font-semibold text-gray-800 text-base sm:text-lg">{userData.name}</h2>
              <p className="text-xs text-gray-500 mt-1 text-center break-all">{userData.email}</p>
            </div>

            <ul className="py-2 bg-[#d8e1f3]">
              {sidebarLinks.map((link) => (
                <li key={link.to} className="w-full">
                  <NavLink to={link.to}>
                    <button className="w-full py-2.5 px-5 flex items-center gap-2 text-sm text-gray-800 hover:bg-blue-100 transition-colors">
                      {link.icon} {link.label}
                    </button>
                  </NavLink>
                </li>
              ))}
              <li className="w-full">
                <button onClick={handleLogout}
                  className="w-full py-2.5 px-5 flex items-center gap-2 text-sm text-gray-800 hover:bg-blue-100 transition-colors">
                  <IoIosLogOut className="text-[18px]" /> Logout
                </button>
              </li>
            </ul>
          </div>
        </aside>

        {/* ── Main Content ── */}
        <main className="w-full lg:w-[75%] flex flex-col gap-6">

          {/* ── Profile Card ── */}
          <div className="bg-white shadow-md rounded-xl p-5 sm:p-7">
            <h2 className="text-lg font-semibold text-gray-800 mb-1">My Profile</h2>
            <hr className="mb-5" />
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="w-full sm:w-1/2">
                  <TextField label="Full Name" variant="outlined" size="small" className="w-full"
                    value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="w-full sm:w-1/2">
                  <TextField label="Phone Number" variant="outlined" size="small" className="w-full"
                    value={phone} onChange={(e) => setPhone(e.target.value)} />
                </div>
              </div>
              <div className="w-full">
                <TextField label="Email" variant="outlined" size="small" className="w-full"
                  value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div className="flex flex-wrap gap-3 mt-1">
                <button type="submit" disabled={profileLoading}
                  className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md text-sm font-medium transition-colors disabled:opacity-60 cursor-pointer">
                  {profileLoading ? "Saving..." : "Save Changes"}
                </button>
                <button type="button"
                  onClick={() => { setName(userData.name); setEmail(userData.email); setPhone(userData.phone || ""); setImage(null) }}
                  className="px-6 py-2 border border-blue-500 text-blue-500 hover:bg-blue-50 rounded-md text-sm font-medium transition-colors cursor-pointer">
                  Cancel
                </button>
              </div>
            </form>
          </div>

          {/* ── Password Card ── */}
          <div className="bg-white shadow-md rounded-xl p-5 sm:p-7">
            <div className="flex items-center gap-2 mb-1">
              <FaLock className="text-blue-500 text-base" />
              <h2 className="text-lg font-semibold text-gray-800">Update Password</h2>
            </div>
            <hr className="mb-5" />

            <form onSubmit={handlePasswordUpdate} className="flex flex-col gap-4">

              {/* Current Password */}
              <div className="relative w-full">
                <TextField
                  label="Current Password" variant="outlined" size="small"
                  type={showCurrent ? "text" : "password"} className="w-full"
                  value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)}
                />
                <button type="button" onClick={() => setShowCurrent(!showCurrent)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  {showCurrent ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                {/* New Password */}
                <div className="relative w-full sm:w-1/2">
                  <TextField
                    label="New Password" variant="outlined" size="small"
                    type={showNew ? "text" : "password"} className="w-full"
                    value={newPassword}
                    onChange={(e) => {
                      setNewPassword(e.target.value)
                      setNewPasswordStrength(validatePassword(e.target.value))
                    }}
                  />
                  <button type="button" onClick={() => setShowNew(!showNew)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                    {showNew ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>

                {/* Confirm Password */}
                <div className="relative w-full sm:w-1/2">
                  <TextField
                    label="Confirm New Password" variant="outlined" size="small"
                    type={showConfirm ? "text" : "password"} className="w-full"
                    value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  <button type="button" onClick={() => setShowConfirm(!showConfirm)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                    {showConfirm ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              {/* ── Strength Indicator ── */}
              {newPassword.length > 0 && (
                <div className="flex flex-col gap-1.5 p-3 bg-gray-50 rounded-lg border border-gray-100">
                  {strengthRules.map(rule => (
                    <div key={rule.key} className="flex items-center gap-2">
                      <div className={`w-3.5 h-3.5 rounded-full flex items-center justify-center flex-shrink-0
                        ${newPasswordStrength[rule.key] ? 'bg-green-500' : 'bg-gray-200'}`}>
                        {newPasswordStrength[rule.key] && (
                          <svg className="w-2 h-2 text-white" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
                            <polyline points="20 6 9 17 4 12"/>
                          </svg>
                        )}
                      </div>
                      <span className={`text-xs ${newPasswordStrength[rule.key] ? 'text-green-600' : 'text-gray-400'}`}>
                        {rule.label}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* Match hint */}
              {confirmPassword.length > 0 && (
                <p className={`text-xs -mt-2 ${newPassword !== confirmPassword ? "text-red-500" : "text-green-500"}`}>
                  {newPassword !== confirmPassword ? "Passwords do not match" : "Passwords match"}
                </p>
              )}

              <div className="flex flex-wrap gap-3 mt-1">
                <button type="submit" disabled={passwordLoading}
                  className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md text-sm font-medium transition-colors disabled:opacity-60 cursor-pointer">
                  {passwordLoading ? "Updating..." : "Update Password"}
                </button>
                <button type="button"
                  onClick={() => {
                    setCurrentPassword(""); setNewPassword(""); setConfirmPassword("")
                    setNewPasswordStrength({ hasLetter: false, hasNumber: false, hasSpecial: false, hasLength: false })
                  }}
                  className="px-6 py-2 border border-blue-500 text-blue-500 hover:bg-blue-50 rounded-md text-sm font-medium transition-colors cursor-pointer">
                  Clear
                </button>
              </div>
            </form>
          </div>

        </main>
      </div>
    </section>
  )
}

export default Profile