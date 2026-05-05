import { useState } from "react";

const categories = [
  {
    name: "Bedsheets & Quilts",
    desc: "Breathable, soft-touch fabrics available in single, double and king sizes.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#0078D4" strokeWidth="1.5" className="w-6 h-6">
        <rect x="3" y="8" width="18" height="10" rx="1.5" />
        <path d="M7 8V6a2 2 0 014 0v2M13 8V6a2 2 0 014 0v2" />
      </svg>
    ),
  },
  {
    name: "Curtains",
    desc: "Stylish window treatments that add warmth, privacy and elegance to any room.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#0078D4" strokeWidth="1.5" className="w-6 h-6">
        <path d="M4 3h16v18H4zM4 9h16M4 15h16" />
      </svg>
    ),
  },
  {
    name: "Cushions",
    desc: "Decorative cushion covers that complete your bedroom or living space.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#0078D4" strokeWidth="1.5" className="w-6 h-6">
        <ellipse cx="12" cy="14" rx="8" ry="5" />
        <path d="M4 14s0-5 8-5 8 5 8 5" />
      </svg>
    ),
  },
  {
    name: "Pillow Covers",
    desc: "Mix-and-match covers with premium stitching and vibrant prints.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#0078D4" strokeWidth="1.5" className="w-6 h-6">
        <rect x="4" y="7" width="16" height="10" rx="2" />
        <path d="M8 7V5M16 7V5" />
      </svg>
    ),
  },
  {
    name: "Blankets",
    desc: "Cozy, warm blankets for cold nights in multiple weights and sizes.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#0078D4" strokeWidth="1.5" className="w-6 h-6">
        <path d="M3 10c0-1 1-2 2-2h14c1 0 2 1 2 2v7H3v-7z" />
        <path d="M3 17h18M7 8V6M17 8V6" />
      </svg>
    ),
  },
  {
    name: "Home Décor Sets",
    desc: "Curated matching sets to give your bedroom a cohesive finished look.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#0078D4" strokeWidth="1.5" className="w-6 h-6">
        <path d="M12 3L4 9v12h16V9l-8-6zM9 21v-8h6v8" />
      </svg>
    ),
  },
];

const pillars = [
  {
    title: "Premium Quality",
    text: "Carefully sourced fabrics that are soft, durable, and long-lasting.",
  },
  {
    title: "Nationwide Delivery",
    text: "Fast and reliable shipping across Pakistan with full order tracking.",
  },
  {
    title: "Secure Payments",
    text: "Pay online via Stripe or choose Cash on Delivery — your choice.",
  },
  {
    title: "Easy Returns",
    text: "Hassle-free return policy. Your satisfaction is our priority.",
  },
];

const stats = [
  ["2,400+", "Happy Customers"],
  ["6", "Categories"],
  ["120+", "Products"],
  ["98%", "Satisfaction Rate"],
];

export default function AboutUs() {
  return (
    <div className="min-h-screen pt-20 bg-gray-50 font-sans">
      {/* ── Hero ── */}
      <div className="bg-[#0078D4] px-6 py-12 md:px-16">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase text-[#C7E0F4] mb-3">
              Diamond Collection — Est. 2024
            </p>
            <h1 className="text-3xl md:text-4xl font-semibold text-white leading-tight mb-4">
              Luxury home textiles,<br />crafted for every home
            </h1>
            <p className="text-sm text-[#C7E0F4] leading-relaxed">
              From Jhelum, Pakistan — we bring you premium bedsheets, quilts, curtains,
              cushions, pillow covers and blankets, designed to transform your living
              spaces with comfort and elegance.
            </p>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-2 gap-px bg-white/20 rounded overflow-hidden">
            {stats.map(([num, label]) => (
              <div
                key={label}
                className="bg-white/10 py-5 text-center"
              >
                <div className="text-2xl font-bold text-white">{num}</div>
                <div className="text-xs text-[#C7E0F4] mt-1">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 md:px-16 py-10 space-y-10">

        {/* ── Mission ── */}
        <div className="border-l-4 border-[#0078D4] bg-[#EFF6FC] rounded-r pl-5 pr-6 py-4">
          <p className="text-sm text-gray-800 leading-relaxed">
            At{" "}
            <span className="font-semibold text-[#0078D4]">Diamond Collection</span>,
            we believe that a beautiful home begins with the right textiles. Our mission
            is to offer high-quality, affordable home fabrics that bring comfort, warmth,
            and elegance to Pakistani households — with the convenience of modern online
            shopping.
          </p>
        </div>

        {/* ── Why Choose Us ── */}
        <div>
          <p className="text-xs font-semibold tracking-widest uppercase text-[#0078D4] mb-3">
            Why choose us
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-gray-200 border border-gray-200 rounded overflow-hidden">
            {pillars.map((p) => (
              <div key={p.title} className="bg-white p-4">
                <div className="w-2 h-2 rounded-full bg-[#0078D4] mb-3" />
                <div className="text-sm font-semibold text-gray-800 mb-1">{p.title}</div>
                <div className="text-xs text-gray-500 leading-relaxed">{p.text}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Our Collection ── */}
        <div>
          <p className="text-xs font-semibold tracking-widest uppercase text-[#0078D4] mb-3">
            Our collection
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {categories.map((c) => (
              <div
                key={c.name}
                className="border border-gray-200 rounded bg-white p-5 hover:border-[#C7E0F4] transition-colors cursor-default"
              >
                <div className="w-9 h-9 bg-[#EFF6FC] rounded flex items-center justify-center mb-3">
                  {c.icon}
                </div>
                <div className="text-sm font-semibold text-gray-800 mb-1">{c.name}</div>
                <div className="text-xs text-gray-500 leading-relaxed">{c.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Bottom CTA band ── */}
        <div className="bg-[#0078D4] rounded p-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <div className="text-white font-semibold text-base mb-1">
              Ready to shop with Diamond Collection?
            </div>
            <div className="text-[#C7E0F4] text-sm">
              Browse our full range of premium home textiles today.
            </div>
          </div>
          <a
            href="/collection"
            className="bg-white text-[#0078D4] text-sm font-semibold px-6 py-2 rounded hover:bg-[#EFF6FC] transition-colors whitespace-nowrap"
          >
            Shop Now
          </a>
        </div>

      </div>
    </div>
  );
}