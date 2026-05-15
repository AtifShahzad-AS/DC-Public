import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { backendurl } from '../App'
import { toast } from 'react-toastify'

const TABS = ['Branding', 'Password', 'Payment Methods', 'Delivery']

// ── Reusable input styles ──
const inputClass = "w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-[#1a1a2e] outline-none focus:border-[#e8a87c] bg-white transition-colors"
const labelClass = "text-[11px] text-gray-500 font-medium mb-1 block"

const Settings = ({ token }) => {
  const [activeTab, setActiveTab]     = useState('Branding')
  const [adminRole, setAdminRole]     = useState('')
  const [adminId, setAdminId]         = useState('')

 // ── Delivery state ──
  const [deliveryFee, setDeliveryFee] = useState('')
  const [freeDeliveryAbove, setFreeDeliveryAbove] = useState('')
  const [deliverySaving, setDeliverySaving] = useState(false)
  // ── Branding state ──
  const [storeName, setStoreName]     = useState('')
  const [tagline, setTagline]         = useState('')
  const [currentLogo, setCurrentLogo] = useState('')
  const [logoFile, setLogoFile]       = useState(null)
  const [logoPreview, setLogoPreview] = useState(null)
  const [brandSaving, setBrandSaving] = useState(false)

  // ── Password state — own ──
  const [currentPass, setCurrentPass] = useState('')
  const [newPass, setNewPass]         = useState('')
  const [confirmPass, setConfirmPass] = useState('')
  const [showCurrent, setShowCurrent] = useState(false)
  const [showNew, setShowNew]         = useState(false)
  const [passSaving, setPassSaving]   = useState(false)

  // ── Password state — reset other admin (superadmin only) ──
  const [managers, setManagers]             = useState([])
  const [selectedManager, setSelectedManager] = useState('')
  const [resetPass, setResetPass]           = useState('')
  const [confirmResetPass, setConfirmResetPass] = useState('')
  const [resetSaving, setResetSaving]       = useState(false)
  const [showReset, setShowReset]           = useState(false)

  // ── Payment state ──
  const [payments, setPayments]       = useState({ cod: true, stripe: true })
  const [paymentSaving, setPaymentSaving] = useState('')

  // ── Load settings + admin info on mount ──
  useEffect(() => {
    fetchSettings()
    fetchAdminInfo()
  }, [token])

  useEffect(() => {
    if (adminRole === 'superadmin' && activeTab === 'Password') {
      fetchManagers()
    }
  }, [activeTab, adminRole])

  const fetchSettings = async () => {
    try {
      const { data } = await axios.post(backendurl + '/api/settings/get')
      if (data.success) {
        setStoreName(data.settings.storeName || '')
        setTagline(data.settings.tagline || '')
        setCurrentLogo(data.settings.logo || '')
        setPayments(data.settings.payments || { cod: true, stripe: true })
// Set Delivery Data
        setDeliveryFee(data.settings.deliveryFee ?? 200)
        setFreeDeliveryAbove(data.settings.freeDeliveryAbove ?? 3000)
      }
    } catch (err) {
      console.log(err)
    }
  }

  const fetchAdminInfo = async () => {
    try {
      // Decode role from token
      const payload = JSON.parse(atob(token.split('.')[1]))
      setAdminRole(payload.role || '')
      setAdminId(payload.id || '')
    } catch (err) {
      console.log(err)
    }
  }

  const fetchManagers = async () => {
    try {
      const { data } = await axios.post(
        backendurl + '/api/settings/admins-list',
        {},
        { headers: { token } }
      )
      if (data.success) setManagers(data.admins)
    } catch (err) {
      console.log(err)
    }
  }
const handleDeliverySave = async (e) => {
    e.preventDefault()
    if (!deliveryFee || !freeDeliveryAbove) return toast.error('All fields required')
    setDeliverySaving(true)
    try {
      const { data } = await axios.post(backendurl + '/api/settings/delivery', 
        { deliveryFee, freeDeliveryAbove }, { headers: { token } })
      if (data.success) toast.success('Delivery settings updated')
      else toast.error(data.message)
    } catch (err) { toast.error('Failed to save delivery settings') }
    finally { setDeliverySaving(false) }
  }

  // ── Save branding ──
  const handleBrandingSave = async (e) => {
    e.preventDefault()
    if (!storeName.trim()) {
      toast.error('Store name is required')
      return
    }
    setBrandSaving(true)
    try {
      const formData = new FormData()
      formData.append('storeName', storeName)
      formData.append('tagline',   tagline)
      if (logoFile) formData.append('logo', logoFile)

      const { data } = await axios.post(
        backendurl + '/api/settings/branding',
        formData,
        { headers: { token, 'Content-Type': 'multipart/form-data' } }
      )
      if (data.success) {
        toast.success('Branding updated successfully')
        setCurrentLogo(data.settings.logo || currentLogo)
        setLogoFile(null)
        setLogoPreview(null)
      } else {
        toast.error(data.message)
      }
    } catch (err) {
      toast.error('Failed to update branding')
    } finally {
      setBrandSaving(false)
    }
  }

  // ── Change own password ──
  const handleOwnPassword = async (e) => {
    e.preventDefault()
    if (!currentPass || !newPass || !confirmPass) {
      toast.error('Please fill all fields')
      return
    }
    if (newPass.length < 6) {
      toast.error('Password must be at least 6 characters')
      return
    }
    if (newPass !== confirmPass) {
      toast.error('Passwords do not match')
      return
    }
    setPassSaving(true)
    try {
      const { data } = await axios.post(
        backendurl + '/api/settings/change-password',
        { currentPassword: currentPass, newPassword: newPass },
        { headers: { token } }
      )
      if (data.success) {
        toast.success(data.message)
        setCurrentPass(''); setNewPass(''); setConfirmPass('')
      } else {
        toast.error(data.message)
      }
    } catch (err) {
      toast.error('Failed to update password')
    } finally {
      setPassSaving(false)
    }
  }

  // ── Reset manager password (superadmin only) ──
  const handleResetPassword = async (e) => {
    e.preventDefault()
    if (!selectedManager) {
      toast.error('Select an admin to reset')
      return
    }
    if (!resetPass || resetPass.length < 6) {
      toast.error('Password must be at least 6 characters')
      return
    }
    if (resetPass !== confirmResetPass) {
      toast.error('Passwords do not match')
      return
    }
    setResetSaving(true)
    try {
      const { data } = await axios.post(
        backendurl + '/api/settings/reset-password',
        { adminId: selectedManager, newPassword: resetPass },
        { headers: { token } }
      )
      if (data.success) {
        toast.success(data.message)
        setSelectedManager('')
        setResetPass('')
        setConfirmResetPass('')
        setShowReset(false)
      } else {
        toast.error(data.message)
      }
    } catch (err) {
      toast.error('Failed to reset password')
    } finally {
      setResetSaving(false)
    }
  }

  // ── Toggle payment ──
  const handleTogglePayment = async (method) => {
    setPaymentSaving(method)
    try {
      const { data } = await axios.post(
        backendurl + '/api/settings/toggle-payment',
        { method },
        { headers: { token } }
      )
      if (data.success) {
        toast.success(data.message)
        setPayments(data.payments)
      } else {
        toast.error(data.message)
      }
    } catch (err) {
      toast.error('Failed to update payment method')
    } finally {
      setPaymentSaving('')
    }
  }

  // ── Eye icon ──
  const EyeIcon = ({ show, toggle }) => (
    <button type="button" onClick={toggle}
      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        {show
          ? <><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></>
          : <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></>
        }
      </svg>
    </button>
  )

  // ── Save button ──
  const SaveButton = ({ loading, label = 'Save Changes', loadingLabel = 'Saving...' }) => (
    <button type="submit" disabled={loading}
      className="flex items-center gap-2 bg-[#1a1a2e] text-white text-xs font-medium
        px-5 py-2.5 rounded-lg hover:bg-[#2a2a3e] transition-colors disabled:opacity-60">
      {loading
        ? <><div className="w-3 h-3 border border-white/30 border-t-white rounded-full animate-spin"/>{loadingLabel}</>
        : label
      }
    </button>
  )

  return (
    <div className="space-y-5">
      <div className="bg-white rounded-xl border border-black/5 overflow-hidden">

        {/* Header */}
        <div className="px-5 py-4 border-b border-gray-100">
          <h2 className="text-sm font-semibold text-[#1a1a2e]">Website Settings</h2>
          <p className="text-xs text-gray-400 mt-0.5">
            Manage branding, passwords and payment methods
          </p>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-100 overflow-x-auto">
          {TABS.map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`px-5 py-3 text-xs font-semibold whitespace-nowrap transition-colors border-b-2
                ${activeTab === tab
                  ? 'border-[#e8a87c] text-[#1a1a2e]'
                  : 'border-transparent text-gray-400 hover:text-gray-600'
                }`}>
              {tab}
            </button>
          ))}
        </div>

        <div className="p-5 sm:p-6">

          {/* ══════════════════════════
              BRANDING TAB
          ══════════════════════════ */}
          {activeTab === 'Branding' && (
            <form onSubmit={handleBrandingSave} className="space-y-5 max-w-lg">

              {/* Logo */}
              <div>
                <label className={labelClass}>Store Logo</label>
                <div className="flex items-center gap-4">

                  {/* Preview box */}
                  <div className="w-16 h-16 rounded-xl border-2 border-dashed border-gray-200
                    bg-gray-50 flex items-center justify-center overflow-hidden flex-shrink-0">
                    {logoPreview || currentLogo ? (
                      <img
                        src={logoPreview || currentLogo}
                        alt="logo"
                        className="w-full h-full object-contain p-1"
                      />
                    ) : (
                      <svg className="w-6 h-6 text-gray-300" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                        <rect x="3" y="3" width="18" height="18" rx="2"/>
                        <circle cx="8.5" cy="8.5" r="1.5"/>
                        <polyline points="21 15 16 10 5 21"/>
                      </svg>
                    )}
                  </div>

                  <div className="flex-1">
                    <label className="flex items-center gap-2 cursor-pointer bg-gray-50 border
                      border-gray-200 rounded-lg px-4 py-2.5 hover:border-[#e8a87c] transition-colors w-fit">
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
                        <polyline points="17 8 12 3 7 8"/>
                        <line x1="12" y1="3" x2="12" y2="15"/>
                      </svg>
                      <span className="text-xs font-medium text-gray-600">
                        {logoFile ? logoFile.name : 'Upload Logo'}
                      </span>
                      <input type="file" accept="image/*" hidden
                        onChange={e => {
                          const file = e.target.files[0]
                          if (!file) return
                          setLogoFile(file)
                          setLogoPreview(URL.createObjectURL(file))
                        }}
                      />
                    </label>
                    <p className="text-[10px] text-gray-400 mt-1.5">
                      PNG or SVG · Max 2MB · Recommended 200×60px
                    </p>
                    {logoPreview && (
                      <button type="button"
                        onClick={() => { setLogoFile(null); setLogoPreview(null) }}
                        className="text-[10px] text-red-400 hover:text-red-600 mt-1">
                        Remove new logo
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Store name */}
              <div>
                <label className={labelClass}>Store Name <span className="text-red-400">*</span></label>
                <input type="text" value={storeName} onChange={e => setStoreName(e.target.value)}
                  className={inputClass} placeholder="LuxeHome" />
              </div>

              {/* Tagline */}
              <div>
                <label className={labelClass}>Tagline</label>
                <input type="text" value={tagline} onChange={e => setTagline(e.target.value)}
                  className={inputClass} placeholder="Premium Home Textiles" />
              </div>

              {/* Live preview */}
              {(storeName || logoPreview || currentLogo) && (
                <div className="bg-gray-50 border border-gray-100 rounded-xl p-4">
                  <p className="text-[10px] text-gray-400 mb-2 uppercase tracking-wide">Preview</p>
                  <div className="flex items-center gap-2">
                    {(logoPreview || currentLogo) && (
                      <img src={logoPreview || currentLogo} alt="" className="h-8 object-contain" />
                    )}
                    <div>
                      <p className="text-sm font-bold text-[#1a1a2e]">{storeName}</p>
                      {tagline && <p className="text-[10px] text-gray-400">{tagline}</p>}
                    </div>
                  </div>
                </div>
              )}

              <SaveButton loading={brandSaving} label="Save Branding" />
            </form>
          )}

          {/* ══════════════════════════
              PASSWORD TAB
          ══════════════════════════ */}
          {activeTab === 'Password' && (
            <div className="space-y-8 max-w-lg">

              {/* ── Change own password ── */}
              <div>
                <h3 className="text-sm font-semibold text-[#1a1a2e] mb-1">Change My Password</h3>
                <p className="text-xs text-gray-400 mb-4">Update the password for your own admin account</p>

                <form onSubmit={handleOwnPassword} className="space-y-4">
                  <div>
                    <label className={labelClass}>Current Password</label>
                    <div className="relative">
                      <input type={showCurrent ? 'text' : 'password'} value={currentPass}
                        onChange={e => setCurrentPass(e.target.value)}
                        className={inputClass + ' pr-10'} placeholder="Enter current password" />
                      <EyeIcon show={showCurrent} toggle={() => setShowCurrent(!showCurrent)} />
                    </div>
                  </div>

                  <div>
                    <label className={labelClass}>New Password</label>
                    <div className="relative">
                      <input type={showNew ? 'text' : 'password'} value={newPass}
                        onChange={e => setNewPass(e.target.value)}
                        className={inputClass + ' pr-10'} placeholder="Min 6 characters" />
                      <EyeIcon show={showNew} toggle={() => setShowNew(!showNew)} />
                    </div>
                    {newPass.length > 0 && (
                      <p className={`text-[10px] mt-1 ${newPass.length < 6 ? 'text-red-400' : 'text-green-500'}`}>
                        {newPass.length < 6 ? 'Too short — min 6 characters' : 'Length looks good'}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className={labelClass}>Confirm New Password</label>
                    <input type="password" value={confirmPass}
                      onChange={e => setConfirmPass(e.target.value)}
                      className={inputClass} placeholder="Repeat new password" />
                    {confirmPass.length > 0 && (
                      <p className={`text-[10px] mt-1 ${newPass !== confirmPass ? 'text-red-400' : 'text-green-500'}`}>
                        {newPass !== confirmPass ? 'Passwords do not match' : 'Passwords match'}
                      </p>
                    )}
                  </div>

                  <SaveButton loading={passSaving} label="Update My Password" loadingLabel="Updating..." />
                </form>
              </div>

              {/* ── Reset another admin's password — superadmin only ── */}
              {adminRole === 'superadmin' && (
                <>
                  <hr className="border-gray-100" />

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <div>
                        <h3 className="text-sm font-semibold text-[#1a1a2e]">Reset Admin Password</h3>
                        <p className="text-xs text-gray-400 mt-0.5">Super admin only — reset a manager's password</p>
                      </div>
                      <span className="text-[10px] bg-purple-50 text-purple-700 font-semibold
                        px-2 py-0.5 rounded-full">Super Admin</span>
                    </div>

                    {/* Managers list */}
                    {managers.length === 0 ? (
                      <p className="text-xs text-gray-400 mt-4">No manager accounts found.</p>
                    ) : (
                      <div className="mt-4 space-y-2">
                        {managers.map(mgr => (
                          <div key={mgr._id}
                            className={`flex items-center justify-between p-3 rounded-xl border
                              transition-colors cursor-pointer
                              ${selectedManager === mgr._id
                                ? 'border-[#e8a87c] bg-[#fff9f4]'
                                : 'border-gray-100 bg-gray-50 hover:border-gray-200'
                              }`}
                            onClick={() => {
                              setSelectedManager(mgr._id)
                              setShowReset(true)
                              setResetPass('')
                              setConfirmResetPass('')
                            }}
                          >
                            <div className="flex items-center gap-2.5">
                              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center
                                justify-center text-xs font-semibold text-blue-700 flex-shrink-0">
                                {mgr.name?.charAt(0)?.toUpperCase()}
                              </div>
                              <div>
                                <p className="text-xs font-semibold text-[#1a1a2e]">{mgr.name}</p>
                                <p className="text-[10px] text-gray-400">{mgr.email}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium
                                ${mgr.isActive
                                  ? 'bg-green-50 text-green-700'
                                  : 'bg-red-50 text-red-500'
                                }`}>
                                {mgr.isActive ? 'Active' : 'Inactive'}
                              </span>
                              <svg className={`w-4 h-4 transition-colors
                                ${selectedManager === mgr._id ? 'text-[#e8a87c]' : 'text-gray-300'}`}
                                fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                <polyline points="9 18 15 12 9 6"/>
                              </svg>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Reset form — shows when manager selected */}
                    {showReset && selectedManager && (
                      <form onSubmit={handleResetPassword}
                        className="mt-4 p-4 bg-gray-50 border border-gray-100 rounded-xl space-y-3">
                        <p className="text-[11px] font-semibold text-[#1a1a2e]">
                          Set new password for{' '}
                          <span className="text-[#e8a87c]">
                            {managers.find(m => m._id === selectedManager)?.name}
                          </span>
                        </p>

                        <div>
                          <label className={labelClass}>New Password</label>
                          <input type="password" value={resetPass}
                            onChange={e => setResetPass(e.target.value)}
                            className={inputClass} placeholder="Min 6 characters" />
                        </div>

                        <div>
                          <label className={labelClass}>Confirm Password</label>
                          <input type="password" value={confirmResetPass}
                            onChange={e => setConfirmResetPass(e.target.value)}
                            className={inputClass} placeholder="Repeat password" />
                          {confirmResetPass.length > 0 && (
                            <p className={`text-[10px] mt-1 ${resetPass !== confirmResetPass ? 'text-red-400' : 'text-green-500'}`}>
                              {resetPass !== confirmResetPass ? 'Passwords do not match' : 'Passwords match'}
                            </p>
                          )}
                        </div>

                        <div className="flex gap-2">
                          <SaveButton loading={resetSaving} label="Reset Password" loadingLabel="Resetting..." />
                          <button type="button"
                            onClick={() => { setShowReset(false); setSelectedManager(''); setResetPass(''); setConfirmResetPass('') }}
                            className="text-xs font-medium px-4 py-2.5 rounded-lg bg-gray-100
                              text-gray-600 hover:bg-gray-200 transition-colors">
                            Cancel
                          </button>
                        </div>
                      </form>
                    )}
                  </div>
                </>
              )}
            </div>
          )}

          {/* ══════════════════════════
              PAYMENT METHODS TAB
          ══════════════════════════ */}
          {activeTab === 'Payment Methods' && (
            <div className="space-y-4 max-w-lg">

              <p className="text-xs text-gray-400">
                Enable or disable payment methods shown to customers at checkout.
                At least one method must remain active.
              </p>

              {/* COD */}
              <div className={`flex items-center justify-between p-4 rounded-xl border transition-colors
                ${payments.cod ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'}`}>
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0
                    ${payments.cod ? 'bg-green-100' : 'bg-gray-100'}`}>
                    <svg className={`w-5 h-5 ${payments.cod ? 'text-green-600' : 'text-gray-400'}`}
                      fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <rect x="2" y="6" width="20" height="12" rx="2"/>
                      <path d="M12 12h.01"/>
                      <path d="M17 12h.01"/>
                      <path d="M7 12h.01"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#1a1a2e]">Cash on Delivery</p>
                    <p className="text-[11px] text-gray-400">Customer pays when order arrives</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full
                    ${payments.cod ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-500'}`}>
                    {payments.cod ? 'Enabled' : 'Disabled'}
                  </span>
                  {/* Toggle switch */}
                  <button
                    onClick={() => handleTogglePayment('cod')}
                    disabled={paymentSaving === 'cod'}
                    className="relative flex-shrink-0"
                  >
                    {paymentSaving === 'cod' ? (
                      <div className="w-5 h-5 border-2 border-gray-300 border-t-green-500 rounded-full animate-spin" />
                    ) : (
                      <div className={`w-11 h-6 rounded-full transition-colors duration-200 relative
                        ${payments.cod ? 'bg-green-500' : 'bg-gray-300'}`}>
                        <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all duration-200
                          ${payments.cod ? 'left-5' : 'left-0.5'}`} />
                      </div>
                    )}
                  </button>
                </div>
              </div>

              {/* Stripe */}
              <div className={`flex items-center justify-between p-4 rounded-xl border transition-colors
                ${payments.stripe ? 'bg-blue-50 border-blue-200' : 'bg-gray-50 border-gray-200'}`}>
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0
                    ${payments.stripe ? 'bg-blue-100' : 'bg-gray-100'}`}>
                    <div className={`w-5 h-5 rounded flex items-center justify-center text-xs font-bold
                      ${payments.stripe ? 'bg-[#635BFF] text-white' : 'bg-gray-300 text-gray-500'}`}>
                      S
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#1a1a2e]">Stripe — Card Payment</p>
                    <p className="text-[11px] text-gray-400">Customer pays online with debit/credit card</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full
                    ${payments.stripe ? 'bg-blue-100 text-blue-700' : 'bg-gray-200 text-gray-500'}`}>
                    {payments.stripe ? 'Enabled' : 'Disabled'}
                  </span>
                  <button
                    onClick={() => handleTogglePayment('stripe')}
                    disabled={paymentSaving === 'stripe'}
                    className="relative flex-shrink-0"
                  >
                    {paymentSaving === 'stripe' ? (
                      <div className="w-5 h-5 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin" />
                    ) : (
                      <div className={`w-11 h-6 rounded-full transition-colors duration-200 relative
                        ${payments.stripe ? 'bg-blue-500' : 'bg-gray-300'}`}>
                        <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all duration-200
                          ${payments.stripe ? 'left-5' : 'left-0.5'}`} />
                      </div>
                    )}
                  </button>
                </div>
              </div>

              {/* Warning if one is disabled */}
              {(!payments.cod || !payments.stripe) && (
                <div className="flex items-start gap-2 bg-yellow-50 border border-yellow-200 rounded-xl p-3">
                  <svg className="w-4 h-4 text-yellow-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
                    <line x1="12" y1="9" x2="12" y2="13"/>
                    <line x1="12" y1="17" x2="12.01" y2="17"/>
                  </svg>
                  <p className="text-xs text-yellow-700">
                    {!payments.cod && !payments.stripe
                      ? 'Both methods are disabled — customers cannot place orders.'
                      : `${!payments.cod ? 'Cash on Delivery' : 'Stripe'} is currently disabled at checkout.`
                    }
                  </p>
                </div>
              )}
            </div>
          )}
  {/* DELIVERY TAB */}
          {activeTab === 'Delivery' && (
            <form onSubmit={handleDeliverySave} className="space-y-5 max-w-lg">
              <div>
                <label className={labelClass}>Default Delivery Fee (Rs)</label>
                <input type="number" value={deliveryFee} onChange={e => setDeliveryFee(e.target.value)} className={inputClass} placeholder="200" />
              </div>
              <div>
                <label className={labelClass}>Free Delivery Threshold (Rs)</label>
                <input type="number" value={freeDeliveryAbove} onChange={e => setFreeDeliveryAbove(e.target.value)} className={inputClass} placeholder="3000" />
              </div>
              <div className="bg-[#fff4e5] rounded-lg px-4 py-3 text-xs text-[#b36b00]">
                Orders under <strong>Rs {Number(freeDeliveryAbove).toLocaleString()}</strong> will be charged <strong>Rs {Number(deliveryFee).toLocaleString()}</strong>.
              </div>
              <button type="submit" disabled={deliverySaving} className="bg-[#1a1a2e] text-white text-xs font-medium px-5 py-2.5 rounded-lg disabled:opacity-50">
                {deliverySaving ? 'Updating...' : 'Save Delivery Settings'}
              </button>
            </form>
          )}

        </div>
      </div>
    </div>
  )
}

export default Settings
