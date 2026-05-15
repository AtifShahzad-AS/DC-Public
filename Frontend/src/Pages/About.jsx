import { useState } from "react"
import { FiArrowRight } from "react-icons/fi"
import {
  FaLeaf, FaTruck, FaLock, FaUndo,
  FaFacebookF, FaInstagram, FaLinkedinIn,
  FaStar, FaQuoteLeft
} from "react-icons/fa"
import { MdVerified } from "react-icons/md"
import { HiSparkles } from "react-icons/hi"

// ── Data ──────────────────────────────────────────────────────────────────────

const stats = [
  { num: "2,400+", label: "Happy Customers", icon: "😊" },
  { num: "7",      label: "Categories",      icon: "🛏"  },
  { num: "120+",   label: "Products",        icon: "📦"  },
  { num: "97%",    label: "Satisfaction",    icon: "⭐"  },
]

const pillars = [
  { icon: <FaLeaf   className="w-5 h-5" />, title: "Premium Quality",     text: "Carefully sourced fabrics that are soft, durable, and long-lasting."                   },
  { icon: <FaTruck  className="w-5 h-5" />, title: "Nationwide Delivery", text: "Fast and reliable shipping across Pakistan with full order tracking."                 },
  { icon: <FaLock   className="w-5 h-5" />, title: "Secure Payments",     text: "Pay online via Stripe or choose Cash on Delivery — your choice."                      },
  { icon: <FaUndo   className="w-5 h-5" />, title: "Easy Returns",        text: "Hassle-free return policy. Your satisfaction is our priority."                        },
]

const categories = [
  { name: "Bedsheets & Quilts", emoji: "🛏", desc: "Breathable, soft-touch fabrics in single, double and king sizes."          },
  { name: "Curtains",           emoji: "🪟", desc: "Stylish window treatments that add warmth, privacy and elegance."           },
  { name: "Cushions",           emoji: "🛋", desc: "Decorative covers that complete your bedroom or living space."              },
  { name: "Pillow Covers",      emoji: "💤", desc: "Mix-and-match covers with premium stitching and vibrant prints."            },
  { name: "Blankets",           emoji: "🧣", desc: "Cozy, warm blankets for cold nights in multiple weights and sizes."         },
  { name: "Home Décor Sets",    emoji: "✨", desc: "Curated matching sets to give your bedroom a cohesive finished look."       },
]

const team = [
  {
    name: "Muhammad Aqeel",
    role: "Founder & CEO",
    image: "/IMG_530.HEIC",
    social: { fb: "#", ig: "#", li: "#" }
  },
  {
    name: "Atif Shahzad",
    role: "Founder & CEO",
    image: "/CEO.jpeg",
    social: { fb: "#", ig: "#", li: "#" }
  },
  {
    name: "Abdullah Moufeeq",
    role: "UI/UX Designer",
    image: "/images/team3.jpg",
    social: { fb: "#", ig: "#", li: "#" }
  },
  {
    name: "Karina Kapor",
    role: "Marketing Head",
    image: "/karina.jpg",
    social: { fb: "#", ig: "#", li: "#" }
  }
]

const testimonials = [
  {
    name: "Ayesha Khan",
    city: "Lahore",
    stars: 5,
    image: "/R.jfif",
    text: "Amazing quality bedsheets! Fabric feels premium and delivery was fast.",
  },
  {
    name: "Usman Ali",
    city: "Karachi",
    stars: 4,
    image: "/images/reviews/user2.jpg",
    text: "Very elegant designs. My bedroom looks completely different now.",
  },
  {
    name: "Sara Ahmed",
    city: "Islamabad",
    stars: 5,
    image: "/images/reviews/user3.jpg",
    text: "Best home textile brand I've ordered from online.",
  },
]

const timeline = [
  { year: "2024", title: "Founded",          desc: "Diamond Collection launched with a vision to bring premium home textiles to Pakistani households online."        },
  { year: "2024", title: "First 100 Orders", desc: "Reached our first milestone of 100 orders within weeks, thanks to our loyal early customers."                   },
  { year: "2024", title: "6 Categories",     desc: "Expanded our product range to cover all major home textile categories — from bedsheets to décor sets."          },
  { year: "2025", title: "2,400+ Customers", desc: "Growing community of happy customers across Pakistan, with a 98% satisfaction rate and counting."               },
]

// ── Component ─────────────────────────────────────────────────────────────────

export default function AboutUs() {

  return (
    <div className="min-h-screen pt-12 sm:pt-14 md:pt-16 bg-gray-50 font-sans">

      {/* ═══════════════════════════════════════════════════
          HERO
      ═══════════════════════════════════════════════════ */}
      <section className="relative bg-[#F7F8FA] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-10 sm:py-14 md:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">

            {/* LEFT CONTENT */}
            <div className="order-2 md:order-1">

              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-600 text-xs font-semibold px-4 py-1.5 rounded-full mb-4 sm:mb-5">
                <HiSparkles className="w-4 h-4" />
                New Collection
              </div>

              {/* Heading */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-4 sm:mb-6 ">
                Discover Your <br />
                <span className="text-blue-600 font-serif">Perfect Home Style</span>
              </h1>

              {/* Description */}
              <p className="text-gray-600 text-base sm:text-lg leading-relaxed mb-6 sm:mb-8 max-w-xl">
                From Jhelum, Pakistan — we craft premium bedsheets, quilts,
                curtains, cushions and blankets designed to bring comfort,
                elegance and luxury into every home.
              </p>

              {/* Buttons */}
              <div className="flex flex-wrap gap-3 sm:gap-4 mb-8 sm:mb-10">
                <a
                  href="/collection"
                  className="bg-blue-600 text-white font-semibold px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg hover:bg-blue-600 transition text-sm sm:text-base"
                >
                  Shop Now
                </a>
                <a
                  href="/contact"
                  className="border border-gray-300 text-gray-700 font-semibold px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg hover:bg-gray-100 transition text-sm sm:text-base"
                >
                  Contact Us
                </a>
              </div>

              {/* Stats — wrap on xs, row from sm */}
              <div className="grid grid-cols-2 sm:flex sm:flex-row gap-4 sm:gap-8">
                {stats.map(({ num, label }) => (
                  <div key={label}>
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900">{num}</h3>
                    <p className="text-xs sm:text-sm text-gray-500">{label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT IMAGE CARD */}
            <div className="relative order-1 md:order-2">

              {/* Main Image */}
              <img
                src="/about.png"
                alt="Collection"
                className="rounded-2xl shadow-xl w-full object-cover max-h-[320px] sm:max-h-[400px] md:max-h-none"
              />

              {/* Floating Badge — repositioned so it doesn't clip on mobile */}
              <div className="absolute top-3 right-3 sm:-top-5 sm:-right-5 bg-blue-500 text-white font-bold text-xs sm:text-sm px-3 sm:px-4 py-2 sm:py-3 rounded-xl shadow-lg">
                30% OFF
              </div>

              {/* Floating Info Card — kept inside bounds on mobile */}
              <div className="absolute bottom-3 left-3 sm:-bottom-6 sm:left-6 bg-white shadow-lg rounded-xl px-3 sm:px-5 py-2 sm:py-3 flex items-center gap-2 sm:gap-3">
                <span className="text-green-500 text-base sm:text-xl">✔</span>
                <div>
                  <p className="text-xs sm:text-sm font-semibold text-gray-800">Free Shipping</p>
                  <p className="text-[10px] sm:text-xs text-gray-500">On orders over RS:4000</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          MISSION BAND
      ═══════════════════════════════════════════════════ */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-16 py-8 sm:py-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
            <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#EFF6FC] flex items-center justify-center">
              <MdVerified className="w-5 h-5 sm:w-6 sm:h-6 text-[#2559f7]" />
            </div>
            <div>
              <h2 className="text-sm  sm:text-base font-bold text-gray-900 mb-1">Our Mission</h2>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                At <span className="font-semibold text-blue-600">Diamond Collection</span>, we believe
                that a beautiful home begins with the right textiles. Our mission is to offer high-quality,
                affordable home fabrics that bring comfort, warmth, and elegance to Pakistani households —
                with the convenience of modern online shopping.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          BODY SECTIONS
      ═══════════════════════════════════════════════════ */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-10 py-10 sm:py-12 space-y-14 sm:space-y-16">

        {/* WHY CHOOSE US */}
        <section>
          <div className="text-center mb-6 sm:mb-8">
            <p className="text-xs sm:text-base font-bold tracking-widest uppercase text-blue-600 mb-2">Why Choose Us</p>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">Built on quality and trust</h2>
          </div>
          {/* 1 col on xs, 2 col on sm, 4 col on lg */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {pillars.map((p) => (
              <div
                key={p.title}
                className="bg-white border border-gray-100 rounded-2xl p-4 sm:p-5 hover:border-[#0078D4] hover:shadow-md transition-all duration-200 group"
              >
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#EFF6FC] flex items-center justify-center mb-3 sm:mb-4 text-[#2559f7] group-hover:bg-[#0078D4] group-hover:text-white transition-colors duration-200">
                  {p.icon}
                </div>
                <h3 className="text-sm font-bold text-gray-800 mb-1.5 sm:mb-2">{p.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{p.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* OUR JOURNEY TIMELINE */}
        <section>
          <div className="text-center mb-6 sm:mb-8">
            <p className="text-xs sm:text-base font-bold tracking-widest uppercase text-blue-600 mb-2">Our Journey</p>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">How we got here</h2>
          </div>
          <div className="relative">
            {/* Vertical line — only from sm up */}
            <div className="absolute left-5 top-0 bottom-0 w-px bg-gray-200 hidden sm:block" />
            <div className="space-y-4 sm:space-y-6">
              {timeline.map((item, i) => (
                <div key={i} className="flex items-start gap-3 sm:gap-5">
                  {/* Circle dot */}
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#0386ea] flex items-center justify-center z-10 shadow-md">
                    <span className="text-white text-[10px] font-bold">{item.year.slice(2)}</span>
                  </div>
                  {/* Card */}
                  <div className="bg-white border border-gray-100 rounded-2xl px-4 sm:px-5 py-3 sm:py-4 flex-1 hover:border-[#C7E0F4] transition-colors">
                    <div className="flex flex-wrap items-center gap-1 sm:gap-2 mb-1">
                      <span className="text-xs font-bold text-[#0078D4]">{item.year}</span>
                      <span className="text-gray-300 hidden sm:inline">·</span>
                      <span className="text-sm font-bold text-gray-800">{item.title}</span>
                    </div>
                    <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* OUR COLLECTION */}
        <section>
          <div className="text-center mb-6 sm:mb-8">
            <p className="text-xs sm:text-base font-bold tracking-widest uppercase text-blue-600 mb-2">Our Collection</p>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">Everything for your home</h2>
          </div>
          {/* 1 col xs, 2 col sm, 3 col md */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
            {categories.map((c) => (
              <div
                key={c.name}
                className="bg-white border border-gray-100 rounded-2xl p-4 sm:p-5 hover:border-[#0078D4] hover:shadow-md transition-all duration-200 group cursor-default"
              >
                <div className="text-2xl sm:text-3xl mb-2 sm:mb-3">{c.emoji}</div>
                <h3 className="text-sm font-bold text-gray-800 mb-1 sm:mb-1.5 group-hover:text-[#0078D4] transition-colors">{c.name}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* LEADERSHIP / TEAM */}
        <section>
          <div className="text-center mb-8 sm:mb-10">
            <p className="text-xs sm:text-base font-bold tracking-widest uppercase text-blue-600">Our Leadership</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-2">
              The Team Behind Diamond Collection
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-2 sm:mt-3 max-w-xl mx-auto">
              Passionate creators building premium home textile experiences.
            </p>
          </div>

          {/* 1 col xs, 2 col sm, 4 col lg */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-3">
            {team.map((member) => (
              <div
                key={member.name}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition duration-300"
              >
                {/* Image — taller on mobile for better portrait display */}
                <div className="h-[240px] sm:h-[200px] md:h-[220px] overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                  />
                </div>

                {/* Content */}
                <div className="p-4 text-center">
                  <h3 className="font-semibold text-gray-900 text-sm sm:text-base">{member.name}</h3>
                  <p className="text-xs text-gray-500 mb-3">{member.role}</p>
                  <div className="flex justify-center gap-4 sm:gap-5">
                    <a href={member.social.fb} aria-label="Facebook" className="text-gray-400 hover:text-[#0078D4] transition">
                      <FaFacebookF />
                    </a>
                    <a href={member.social.ig} aria-label="Instagram" className="text-gray-400 hover:text-[#0078D4] transition">
                      <FaInstagram />
                    </a>
                    <a href={member.social.li} aria-label="LinkedIn" className="text-gray-400 hover:text-[#0078D4] transition">
                      <FaLinkedinIn />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section>
          <div className="text-center mb-8 sm:mb-10">
            <p className="sm:text-base text-xs font-bold  tracking-widest uppercase text-blue-600  mb-2">Customer Love</p>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">What our customers say</h2>
          </div>

          {/* 1 col xs, 2 col sm, 3 col lg */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="bg-white border border-gray-100 rounded-2xl p-5 sm:p-6 hover:shadow-lg transition duration-300 flex flex-col"
              >
                <FaQuoteLeft className="text-[#0078D4] opacity-20 text-2xl sm:text-3xl mb-3 sm:mb-4" />

                {/* Review Text */}
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-5 sm:mb-6 flex-1">
                  "{t.text}"
                </p>

                {/* User Info */}
                <div className="flex items-center justify-between mt-auto">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <img
                      src={t.image}
                      alt={t.name}
                      className="w-9 h-9 sm:w-10 sm:h-10 rounded-full object-cover border flex-shrink-0"
                    />
                    <div>
                      <p className="text-xs sm:text-sm font-semibold text-gray-800">{t.name}</p>
                      <p className="text-[10px] sm:text-xs text-gray-400">{t.city}</p>
                    </div>
                  </div>

                  {/* Stars */}
                  <div className="flex gap-0.5 flex-shrink-0">
                    {[...Array(t.stars)].map((_, s) => (
                      <FaStar key={s} className="w-3 h-3 text-yellow-400" />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA BAND */}
        <section className="pb-4 sm:pb-0">
          <div className="bg-[#0078D4] rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 relative overflow-hidden">
            {/* Decorative circle */}
            <div className="absolute top-0 right-0 w-32 sm:w-40 h-32 sm:h-40 bg-white/5 rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none" />

            <div className="relative">
              <h3 className="text-white font-bold text-lg sm:text-xl mb-1">
                Ready to shop with Diamond Collection?
              </h3>
              <p className="text-[#C7E0F4] text-xs sm:text-sm">
                Browse our full range of premium home textiles today.
              </p>
            </div>

            <a
              href="/collection"
              className="relative flex-shrink-0 inline-flex items-center gap-2 bg-white text-[#0078D4] text-sm font-bold px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl hover:bg-[#EFF6FC] transition-colors w-full sm:w-auto justify-center sm:justify-start"
            >
              Shop Now <FiArrowRight />
            </a>
          </div>
        </section>

      </div>
    </div>
  )
}