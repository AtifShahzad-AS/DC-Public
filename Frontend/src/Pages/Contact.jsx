
import { useState } from "react"
import axios from "axios"
import { toast } from "react-toastify"
import { MdMail, MdPhone, MdLocationOn } from "react-icons/md"
import { FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa"

const backendurl = import.meta.env.VITE_BACKEND_URL

/* ---------------- CONTACT INFO ---------------- */

const contactInfo = [
  {
    label: "Email",
    value: "support@diamondcollection.pk",
    icon: <MdMail className="text-blue-500" />,
  },
  {
    label: "Phone",
    value: "+92 324 9590143",
    icon: <MdPhone className="text-blue-500" />,
  },
  {
    label: "Address",
    value: "Jhelum, Punjab, Pakistan",
    icon: <MdLocationOn className="text-blue-500" />,
  },
]

const hours = [
  ["Mon – Fri", "9:00 AM – 6:00 PM", false],
  ["Saturday", "10:00 AM – 4:00 PM", false],
  ["Sunday", "Closed", true],
]

const subjects = [
  "Order Inquiry",
  "Product Question",
  "Wholesale Inquiry",
  "Other",
]

const inputClass =
  "w-full border border-gray-300 rounded-sm px-3 py-2 text-sm text-gray-800 bg-white focus:outline-none focus:border-[#0078D4] focus:ring-1 focus:ring-[#0078D4] transition placeholder-gray-400"

const emptyForm = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  subject: "Order Inquiry",
  message: "",
}

/* ---------------- COMPONENT ---------------- */

export default function ContactUs() {
  const [form, setForm] = useState(emptyForm)
  const [loading, setLoading] = useState(false)

  const handle = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await axios.post(
        backendurl + "/api/contact/submit",
        form
      )

      if (response.data.success) {
        toast.success("Message sent successfully!")
        setForm(emptyForm)
      } else toast.error(response.data.message)
    } catch (error) {
      toast.error("Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative min-h-screen bg-gray-50 overflow-hidden">

      {/* Decorative Background */}
      <div className="absolute -top-40 -left-40 w-64 sm:w-96 h-64 sm:h-96 bg-blue-100 rounded-full blur-3xl opacity-40 pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-64 sm:w-96 h-64 sm:h-96 bg-purple-100 rounded-full blur-3xl opacity-40 pointer-events-none"></div>

      {/* ================= HERO ================= */}

      <div className="relative mt-12 sm:mt-16 md:mt-20 h-[280px] sm:h-[340px] md:h-[420px]">

        <img
          src="contact.jfif"
          alt="Contact Us"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Light Overlay */}
        <div className="absolute inset-0 bg-white/60"></div>

        <div className="relative h-full flex flex-col justify-center items-center text-center px-4">
          <p className="text-xs sm:text-base tracking-widest uppercase text-gray-900 font-semibold">
            Diamond Collection
          </p>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-blue-600 mt-2">
            Contact Us
          </h1>

          <p className="text-gray-600 text-sm mt-3 max-w-xs sm:max-w-sm md:max-w-xl">
            We're here to help. Reach out and we'll respond within 24 hours.
          </p>
        </div>

      </div>

      {/* ================= FLOATING OVERLAY CARD ================= */}

      {/* 
        On mobile:   card sits with a small negative margin (-mt-10) so it overlaps hero slightly
        On sm:       -mt-20
        On md+:      -mt-32 (original)
      */}
      <div className="max-w-6xl mx-auto px-4 sm:px-8 md:px-16 -mt-10 sm:-mt-20 md:-mt-32 relative z-20 pb-10">

        <div className="bg-white rounded-2xl shadow-xl p-5 sm:p-7 md:p-10">

          {/* 
            Layout:
            - Mobile (< md):   stacked, info on top, form below
            - Tablet (md):     2-col grid, info 2/5, form 3/5
          */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-8">

            {/* ================= LEFT INFO ================= */}

            <div className="md:col-span-2 flex flex-col gap-4">

              {contactInfo.map((item) => (
                <div
                  key={item.label}
                  className="border border-gray-200 rounded-lg p-3 sm:p-4 hover:border-[#0078D4] transition"
                >
                  <div className="flex gap-3 items-start">
                    <div className="w-9 h-9 flex-shrink-0 bg-blue-50 rounded flex items-center justify-center">
                      {item.icon}
                    </div>

                    <div className="min-w-0">
                      <p className="text-xs uppercase text-gray-400 font-semibold">
                        {item.label}
                      </p>
                      <p className="text-sm text-gray-800 break-words">{item.value}</p>
                    </div>
                  </div>
                </div>
              ))}

              {/* Business Hours */}
              <div className="border border-gray-200 rounded-lg p-3 sm:p-4">
                <p className="text-xs uppercase text-gray-400 mb-3 font-semibold">
                  Business Hours
                </p>

                {hours.map(([day, time, closed]) => (
                  <div
                    key={day}
                    className="flex justify-between py-2 text-sm border-b last:border-none"
                  >
                    <span className="text-gray-500">{day}</span>
                    <span
                      className={
                        closed ? "text-gray-300" : "font-semibold text-gray-800"
                      }
                    >
                      {time}
                    </span>
                  </div>
                ))}
              </div>

              {/* Social Icons */}
              <div className="flex gap-3 justify-around pt-2">

                <a
                  href="https://www.facebook.com/share/18mreNmttq/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Facebook"
                  className="p-3 bg-gray-100 text-2xl text-blue-600 rounded-full hover:bg-blue-600 hover:text-white transition"
                >
                  <FaFacebookF />
                </a>

                <a
                  href="https://www.instagram.com/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram"
                  className="p-3 bg-gray-100 text-[#f14bc2] text-2xl rounded-full hover:bg-blue-600 hover:text-white transition"
                >
                  <FaInstagram />
                </a>

                <a
                  href="https://wa.me/923249590143"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="WhatsApp"
                  className="p-3 bg-gray-100 text-2xl text-green-700 rounded-full hover:bg-blue-600 hover:text-white transition"
                >
                  <FaWhatsapp />
                </a>

              </div>

            </div>

            {/* ================= FORM ================= */}

            <div className="md:col-span-3">

              <form onSubmit={handleSubmit} className="space-y-4">

                {/* Name row: stacked on xs, side-by-side from sm */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                  <input
                    name="firstName"
                    placeholder="First Name"
                    className={inputClass}
                    value={form.firstName}
                    onChange={handle}
                    required
                  />

                  <input
                    name="lastName"
                    placeholder="Last Name"
                    className={inputClass}
                    value={form.lastName}
                    onChange={handle}
                    required
                  />

                </div>

                <input
                  name="email"
                  type="email"
                  placeholder="Email Address"
                  className={inputClass}
                  value={form.email}
                  onChange={handle}
                  required
                />

                <input
                  name="phone"
                  type="tel"
                  placeholder="Phone Number"
                  className={inputClass}
                  value={form.phone}
                  onChange={handle}
                />

                <select
                  name="subject"
                  className={inputClass}
                  value={form.subject}
                  onChange={handle}
                >
                  {subjects.map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>

                <textarea
                  name="message"
                  rows="5"
                  placeholder="Your Message..."
                  className={inputClass}
                  value={form.message}
                  onChange={handle}
                  required
                />

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#0078D4] hover:bg-blue-700 disabled:opacity-60 text-white font-semibold py-3 rounded-lg transition"
                >
                  {loading ? "Sending..." : "Send Message"}
                </button>

              </form>

            </div>

          </div>
        </div>
      </div>

      {/* ================= MAP ================= */}
      {/* Full-bleed on mobile, padded on larger screens */}
      <div className="mt-10 px-4 sm:px-10 md:px-20 pb-12 rounded-md overflow-hidden">
        <div className="rounded-xl overflow-hidden shadow-md">
          <iframe
            title="Diamond Collection Location"
            src="https://maps.google.com/maps?q=Jhelum%20Punjab%20Pakistan&t=&z=13&ie=UTF8&iwloc=&output=embed"
            className="w-full h-[220px] sm:h-[280px] md:h-[350px] border-0"
            loading="lazy"
          ></iframe>
        </div>
      </div>

    </div>
  )
}