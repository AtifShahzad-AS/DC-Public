// admin/pages/AdminContacts.jsx
import { useEffect, useState } from "react"
import axios from "axios"
import { toast } from "react-toastify"

const backendurl = import.meta.env.VITE_BACKEND_URL

export default function AdminContacts({ token }) {
  const [contacts, setContacts]     = useState([])
  const [loading, setLoading]       = useState(true)
  const [selected, setSelected]     = useState(null)
  const [filter, setFilter]         = useState("all") // all | unread | read
  const [deleting, setDeleting]     = useState(null)

  // ── Fetch all messages ──
  const fetchContacts = async () => {
    try {
      const res = await axios.post(
        backendurl + "/api/contact/list",
        {},
        { headers: { token } }
      )
      if (res.data.success) {
        setContacts(res.data.contacts)
      } else {
        toast.error(res.data.message)
      }
    } catch (err) {
      toast.error("Failed to load messages")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchContacts() }, [])

  // ── Mark as read ──
  const markAsRead = async (contactId) => {
    try {
      const res = await axios.post(
        backendurl + "/api/contact/read",
        { contactId },
        { headers: { token } }
      )
      if (res.data.success) {
        setContacts(prev =>
          prev.map(c => c._id === contactId ? { ...c, isRead: true } : c)
        )
        if (selected?._id === contactId) {
          setSelected(prev => ({ ...prev, isRead: true }))
        }
      }
    } catch (err) {
      toast.error("Failed to mark as read")
    }
  }

  // ── Delete message ──
  const deleteContact = async (contactId) => {
    setDeleting(contactId)
    try {
      const res = await axios.post(
        backendurl + "/api/contact/delete",
        { contactId },
        { headers: { token } }
      )
      if (res.data.success) {
        toast.success("Message deleted")
        setContacts(prev => prev.filter(c => c._id !== contactId))
        if (selected?._id === contactId) setSelected(null)
      } else {
        toast.error(res.data.message)
      }
    } catch (err) {
      toast.error("Failed to delete message")
    } finally {
      setDeleting(null)
    }
  }

  // ── Open message ──
  const openMessage = (contact) => {
    setSelected(contact)
    if (!contact.isRead) markAsRead(contact._id)
  }

  // ── Filter ──
  const filtered = contacts.filter(c => {
    if (filter === "unread") return !c.isRead
    if (filter === "read")   return c.isRead
    return true
  })

  const unreadCount = contacts.filter(c => !c.isRead).length

  // ── Format date ──
  const formatDate = (dateStr) => {
    const d = new Date(dateStr)
    const now = new Date()
    const diffMs = now - d
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMs / 3600000)
    const diffDays = Math.floor(diffMs / 86400000)
    if (diffMins < 60)  return `${diffMins}m ago`
    if (diffHours < 24) return `${diffHours}h ago`
    if (diffDays < 7)   return `${diffDays}d ago`
    return d.toLocaleDateString("en-PK", { day: "numeric", month: "short", year: "numeric" })
  }

  // ── Subject badge color ──
  const subjectColor = (subject) => {
    const map = {
      "Order Inquiry":    "bg-blue-50 text-blue-700 border-blue-200",
      "Product Question": "bg-purple-50 text-purple-700 border-purple-200",
      "Return / Refund":  "bg-red-50 text-red-700 border-red-200",
      "Wholesale Inquiry":"bg-green-50 text-green-700 border-green-200",
      "Other":            "bg-gray-50 text-gray-600 border-gray-200",
    }
    return map[subject] || "bg-gray-50 text-gray-600 border-gray-200"
  }

  return (
    <div className="min-h-screen bg-[#F3F2F1] font-sans">

      {/* ── Top bar ── */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h1 className="text-lg font-semibold text-gray-800">Contact Messages</h1>
          {unreadCount > 0 && (
            <span className="bg-[#0078D4] text-white text-xs font-semibold px-2 py-0.5 rounded-full">
              {unreadCount} new
            </span>
          )}
        </div>
        <button
          onClick={fetchContacts}
          className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-[#0078D4] transition-colors"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
            <path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Refresh
        </button>
      </div>

      <div className="flex h-[calc(100vh-65px)]">

        {/* ── Left: Message list ── */}
        <div className="w-full md:w-80 lg:w-96 bg-white border-r border-gray-200 flex flex-col flex-shrink-0">

          {/* Filter tabs */}
          <div className="flex border-b border-gray-200">
            {[
              { key: "all",    label: "All",    count: contacts.length },
              { key: "unread", label: "Unread", count: unreadCount },
              { key: "read",   label: "Read",   count: contacts.length - unreadCount },
            ].map(tab => (
              <button
                key={tab.key}
                onClick={() => setFilter(tab.key)}
                className={`flex-1 py-3 text-xs font-semibold transition-colors border-b-2 ${
                  filter === tab.key
                    ? "border-[#0078D4] text-[#0078D4]"
                    : "border-transparent text-gray-400 hover:text-gray-600"
                }`}
              >
                {tab.label}
                {tab.count > 0 && (
                  <span className={`ml-1.5 px-1.5 py-0.5 rounded-full text-xs ${
                    filter === tab.key ? "bg-[#EFF6FC] text-[#0078D4]" : "bg-gray-100 text-gray-400"
                  }`}>
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto">
            {loading ? (
              <div className="flex items-center justify-center h-40">
                <svg className="animate-spin w-6 h-6 text-[#0078D4]" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                </svg>
              </div>
            ) : filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-40 text-gray-400">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8 mb-2 opacity-40">
                  <path d="M3 8l9 6 9-6M5 5h14a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2z"/>
                </svg>
                <p className="text-sm">No messages</p>
              </div>
            ) : (
              filtered.map(contact => (
                <div
                  key={contact._id}
                  onClick={() => openMessage(contact)}
                  className={`px-4 py-3 border-b border-gray-100 cursor-pointer transition-colors ${
                    selected?._id === contact._id
                      ? "bg-[#EFF6FC] border-l-2 border-l-[#0078D4]"
                      : "hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <div className="flex items-center gap-2">
                      {/* Unread dot */}
                      {!contact.isRead && (
                        <div className="w-2 h-2 rounded-full bg-[#0078D4] flex-shrink-0 mt-0.5" />
                      )}
                      <span className={`text-sm ${!contact.isRead ? "font-semibold text-gray-800" : "font-medium text-gray-600"}`}>
                        {contact.firstName} {contact.lastName}
                      </span>
                    </div>
                    <span className="text-xs text-gray-400 flex-shrink-0">{formatDate(contact.createdAt)}</span>
                  </div>
                  <p className="text-xs text-gray-500 truncate pl-4">{contact.subject}</p>
                  <p className="text-xs text-gray-400 truncate pl-4 mt-0.5">{contact.message}</p>
                </div>
              ))
            )}
          </div>
        </div>

        {/* ── Right: Message detail ── */}
        <div className="flex-1 overflow-y-auto">
          {!selected ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-400">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="w-16 h-16 mb-4 opacity-20">
                <path d="M3 8l9 6 9-6M5 5h14a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2z"/>
              </svg>
              <p className="text-sm">Select a message to read</p>
            </div>
          ) : (
            <div className="max-w-2xl mx-auto p-6">

              {/* Message header */}
              <div className="bg-white border border-gray-200 rounded mb-4 overflow-hidden">
                <div className="bg-[#0078D4] px-6 py-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h2 className="text-white font-semibold text-base">{selected.subject}</h2>
                      <p className="text-[#C7E0F4] text-xs mt-1">{formatDate(selected.createdAt)}</p>
                    </div>
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded border ${subjectColor(selected.subject)}`}>
                      {selected.subject}
                    </span>
                  </div>
                </div>

                {/* Sender info */}
                <div className="px-6 py-4 border-b border-gray-100 grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">From</div>
                    <div className="text-sm font-semibold text-gray-800">{selected.firstName} {selected.lastName}</div>
                    <div className="text-xs text-gray-500">{selected.email}</div>
                  </div>
                  {selected.phone && (
                    <div>
                      <div className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">Phone</div>
                      <div className="text-sm text-gray-800">{selected.phone}</div>
                    </div>
                  )}
                </div>

                {/* Message body */}
                <div className="px-6 py-4">
                  <div className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3">Message</div>
                  <div className="bg-gray-50 rounded p-4 text-sm text-gray-800 leading-relaxed whitespace-pre-wrap">
                    {selected.message}
                  </div>
                </div>

                {/* Action buttons */}
                <div className="px-6 py-4 border-t border-gray-100 flex items-center gap-3">
                  <a
                    href={`mailto:${selected.email}?subject=Re: ${selected.subject}`}
                    className="flex items-center gap-2 bg-[#0078D4] text-white text-sm font-semibold px-4 py-2 rounded-sm hover:bg-[#005A9E] transition-colors"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
                      <path d="M3 10l9-7 9 7v11a1 1 0 01-1 1H4a1 1 0 01-1-1V10z" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M9 21V12h6v9" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Reply via Email
                  </a>

                  {!selected.isRead && (
                    <button
                      onClick={() => markAsRead(selected._id)}
                      className="flex items-center gap-2 border border-gray-200 text-sm text-gray-600 px-4 py-2 rounded-sm hover:border-[#0078D4] hover:text-[#0078D4] transition-colors"
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
                        <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      Mark as Read
                    </button>
                  )}

                  <button
                    onClick={() => deleteContact(selected._id)}
                    disabled={deleting === selected._id}
                    className="flex items-center gap-2 border border-red-200 text-sm text-red-500 px-4 py-2 rounded-sm hover:bg-red-50 transition-colors disabled:opacity-50 ml-auto"
                  >
                    {deleting === selected._id ? (
                      <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                      </svg>
                    ) : (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
                        <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                    Delete
                  </button>
                </div>
              </div>

              {/* Status badge */}
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${selected.isRead ? "bg-gray-300" : "bg-[#0078D4]"}`} />
                <span className="text-xs text-gray-400">
                  {selected.isRead ? "Read" : "Unread"}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}