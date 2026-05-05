// // import React from 'react'
// // import Title from '../Components/Title'

// // const Contact = () => {
// //   return (
// //     <div>
// //       <div className='text-center text-2xl pt-20 border-t'>
// //         <Title text1={"Contact"} text2={"Us"}/>
// //       </div>
// //     </div>
// //   )
// // }

// // export default Contact
// import { useState } from "react";

// const contactInfo = [
//   {
//     label: "Email",
//     value: "support@diamondcollection.pk",
//     icon: (
//       <svg viewBox="0 0 24 24" fill="none" stroke="#0078D4" strokeWidth="1.5" className="w-4 h-4">
//         <path d="M3 8l9 6 9-6M5 5h14a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2z" />
//       </svg>
//     ),
//   },
//   {
//     label: "Phone",
//     value: "+92 300 1234567",
//     icon: (
//       <svg viewBox="0 0 24 24" fill="none" stroke="#0078D4" strokeWidth="1.5" className="w-4 h-4">
//         <path d="M6.6 10.8a15.05 15.05 0 006.6 6.6l2.2-2.2a1 1 0 011.1-.2 11.5 11.5 0 003.6 1.1 1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1 11.5 11.5 0 001.1 3.6 1 1 0 01-.2 1.1L6.6 10.8z" />
//       </svg>
//     ),
//   },
//   {
//     label: "Address",
//     value: "Jhelum, Punjab, Pakistan",
//     icon: (
//       <svg viewBox="0 0 24 24" fill="none" stroke="#0078D4" strokeWidth="1.5" className="w-4 h-4">
//         <path d="M12 21s-6-5.686-6-10A6 6 0 0118 11c0 4.314-6 10-6 10z" />
//         <circle cx="12" cy="11" r="2" />
//       </svg>
//     ),
//   },
// ];

// const hours = [
//   ["Mon – Fri", "9:00 AM – 6:00 PM", false],
//   ["Saturday", "10:00 AM – 4:00 PM", false],
//   ["Sunday", "Closed", true],
// ];

// const subjects = [
//   "Order Inquiry",
//   "Product Question",
//   "Return / Refund",
//   "Wholesale Inquiry",
//   "Other",
// ];

// const inputClass =
//   "w-full border border-gray-300 rounded-sm px-3 py-2 text-sm text-gray-800 bg-white focus:outline-none focus:border-[#0078D4] focus:ring-1 focus:ring-[#0078D4] transition-colors placeholder-gray-400";

// export default function ContactUs() {
//   const [form, setForm] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     phone: "",
//     subject: "Order Inquiry",
//     message: "",
//   });
//   const [sent, setSent] = useState(false);

//   const handle = (e) =>
//     setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setSent(true);
//   };

//   return (
//     <div className="min-h-screen pt-20 bg-gray-50 font-sans">

//       {/* ── Page Header ── */}
//       <div className="bg-[#0078D4] px-6 py-10 md:px-16">
//         <div className="max-w-5xl mx-auto">
//           <p className="text-xs font-semibold tracking-widest uppercase text-[#C7E0F4] mb-2">
//             Diamond Collection
//           </p>
//           <h1 className="text-3xl font-semibold text-white mb-2">Contact Us</h1>
//           <p className="text-sm text-[#C7E0F4]">
//             We're here to help. Reach out and we'll respond within 24 hours.
//           </p>
//         </div>
//       </div>

//       <div className="max-w-5xl mx-auto px-6 md:px-16 py-10">
//         <div className="grid grid-cols-1 md:grid-cols-5 gap-6">

//           {/* ── Left: Info panel ── */}
//           <div className="md:col-span-2 flex flex-col gap-4">

//             {/* Contact info cards */}
//             {contactInfo.map((item) => (
//               <div
//                 key={item.label}
//                 className="flex items-start gap-3 bg-white border border-gray-200 rounded p-4 hover:border-[#C7E0F4] transition-colors"
//               >
//                 <div className="w-8 h-8 bg-[#EFF6FC] rounded flex items-center justify-center flex-shrink-0">
//                   {item.icon}
//                 </div>
//                 <div>
//                   <div className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-0.5">
//                     {item.label}
//                   </div>
//                   <div className="text-sm text-gray-800">{item.value}</div>
//                 </div>
//               </div>
//             ))}

//             {/* Business hours */}
//             <div className="bg-white border border-gray-200 rounded p-4">
//               <div className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3">
//                 Business Hours
//               </div>
//               <div className="space-y-0">
//                 {hours.map(([day, time, closed], i) => (
//                   <div
//                     key={day}
//                     className={`flex justify-between py-2 text-sm ${
//                       i < hours.length - 1 ? "border-b border-gray-100" : ""
//                     }`}
//                   >
//                     <span className="text-gray-500">{day}</span>
//                     <span
//                       className={
//                         closed ? "text-gray-300" : "font-semibold text-gray-800"
//                       }
//                     >
//                       {time}
//                     </span>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Social links */}
//             <div className="grid grid-cols-3 gap-2">
//               {["Facebook", "Instagram", "WhatsApp"].map((s) => (
//                 <button
//                   key={s}
//                   className="border border-gray-200 rounded bg-white text-xs text-gray-500 font-medium py-2 hover:border-[#0078D4] hover:text-[#0078D4] hover:bg-[#EFF6FC] transition-colors"
//                 >
//                   {s}
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* ── Right: Form ── */}
//           <div className="md:col-span-3 bg-white border border-gray-200 rounded p-6">
//             <h2 className="text-lg font-semibold text-gray-800 mb-5">
//               Send us a message
//             </h2>

//             {sent ? (
//               <div className="flex flex-col items-center justify-center py-12 text-center">
//                 <div className="w-14 h-14 bg-[#EFF6FC] rounded-full flex items-center justify-center mb-4">
//                   <svg viewBox="0 0 24 24" fill="none" stroke="#0078D4" strokeWidth="2" className="w-7 h-7">
//                     <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
//                   </svg>
//                 </div>
//                 <div className="text-base font-semibold text-[#0078D4] mb-2">
//                   Message sent successfully!
//                 </div>
//                 <div className="text-sm text-gray-500 mb-6">
//                   We'll get back to you within 24 hours.
//                 </div>
//                 <button
//                   onClick={() => { setSent(false); setForm({ firstName: "", lastName: "", email: "", phone: "", subject: "Order Inquiry", message: "" }); }}
//                   className="bg-[#0078D4] text-white text-sm font-semibold px-5 py-2 rounded-sm hover:bg-[#005A9E] transition-colors"
//                 >
//                   Send another message
//                 </button>
//               </div>
//             ) : (
//               <form onSubmit={handleSubmit} className="space-y-4">
//                 {/* Name row */}
//                 <div className="grid grid-cols-2 gap-3">
//                   <div>
//                     <label className="block text-xs font-semibold text-gray-700 mb-1">
//                       First name
//                     </label>
//                     <input
//                       name="firstName"
//                       value={form.firstName}
//                       onChange={handle}
//                       placeholder="Ali"
//                       required
//                       className={inputClass}
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-xs font-semibold text-gray-700 mb-1">
//                       Last name
//                     </label>
//                     <input
//                       name="lastName"
//                       value={form.lastName}
//                       onChange={handle}
//                       placeholder="Khan"
//                       required
//                       className={inputClass}
//                     />
//                   </div>
//                 </div>

//                 {/* Email */}
//                 <div>
//                   <label className="block text-xs font-semibold text-gray-700 mb-1">
//                     Email address
//                   </label>
//                   <input
//                     name="email"
//                     type="email"
//                     value={form.email}
//                     onChange={handle}
//                     placeholder="you@example.com"
//                     required
//                     className={inputClass}
//                   />
//                 </div>

//                 {/* Phone */}
//                 <div>
//                   <label className="block text-xs font-semibold text-gray-700 mb-1">
//                     Phone{" "}
//                     <span className="font-normal text-gray-400">(optional)</span>
//                   </label>
//                   <input
//                     name="phone"
//                     value={form.phone}
//                     onChange={handle}
//                     placeholder="+92 300 0000000"
//                     className={inputClass}
//                   />
//                 </div>

//                 {/* Subject */}
//                 <div>
//                   <label className="block text-xs font-semibold text-gray-700 mb-1">
//                     Subject
//                   </label>
//                   <select
//                     name="subject"
//                     value={form.subject}
//                     onChange={handle}
//                     className={inputClass}
//                   >
//                     {subjects.map((s) => (
//                       <option key={s}>{s}</option>
//                     ))}
//                   </select>
//                 </div>

//                 {/* Message */}
//                 <div>
//                   <label className="block text-xs font-semibold text-gray-700 mb-1">
//                     Message
//                   </label>
//                   <textarea
//                     name="message"
//                     value={form.message}
//                     onChange={handle}
//                     placeholder="Write your message here…"
//                     required
//                     rows={4}
//                     className={`${inputClass} resize-none`}
//                   />
//                 </div>

//                 <button
//                   type="submit"
//                   className="bg-[#0078D4] text-white text-sm font-semibold px-6 py-2.5 rounded-sm hover:bg-[#005A9E] transition-colors"
//                 >
//                   Send message
//                 </button>
//               </form>
//             )}
//           </div>
//         </div>

//         {/* ── Map placeholder ── */}
//         <div className="mt-6 border border-gray-200 rounded overflow-hidden h-28 bg-gray-100 relative flex items-center justify-center">
//           {/* Dot grid */}
//           <svg
//             className="absolute inset-0 w-full h-full opacity-30"
//             viewBox="0 0 700 112"
//             xmlns="http://www.w3.org/2000/svg"
//             preserveAspectRatio="xMidYMid slice"
//           >
//             <defs>
//               <pattern id="dotgrid" width="24" height="24" patternUnits="userSpaceOnUse">
//                 <circle cx="1" cy="1" r="1" fill="#0078D4" />
//               </pattern>
//             </defs>
//             <rect width="700" height="112" fill="url(#dotgrid)" />
//           </svg>
//           {/* Pin */}
//           <div className="relative text-center">
//             <div className="w-3 h-3 rounded-full bg-[#0078D4] mx-auto shadow-[0_0_0_6px_#C7E0F4]" />
//             <div className="text-xs font-semibold text-[#0078D4] mt-3">
//               Diamond Collection — Jhelum, Punjab, Pakistan
//             </div>
//           </div>
//         </div>

//       </div>
//     </div>
//   );
// }
import { useState } from "react";
import axios from "axios";

const contactInfo = [
  {
    label: "Email",
    value: "support@diamondcollection.pk",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#0078D4" strokeWidth="1.5" className="w-4 h-4">
        <path d="M3 8l9 6 9-6M5 5h14a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2z" />
      </svg>
    ),
  },
  {
    label: "Phone",
    value: "+92 300 1234567",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#0078D4" strokeWidth="1.5" className="w-4 h-4">
        <path d="M6.6 10.8a15.05 15.05 0 006.6 6.6l2.2-2.2a1 1 0 011.1-.2 11.5 11.5 0 003.6 1.1 1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1 11.5 11.5 0 001.1 3.6 1 1 0 01-.2 1.1L6.6 10.8z" />
      </svg>
    ),
  },
  {
    label: "Address",
    value: "Jhelum, Punjab, Pakistan",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#0078D4" strokeWidth="1.5" className="w-4 h-4">
        <path d="M12 21s-6-5.686-6-10A6 6 0 0118 11c0 4.314-6 10-6 10z" />
        <circle cx="12" cy="11" r="2" />
      </svg>
    ),
  },
];

const hours = [
  ["Mon – Fri", "9:00 AM – 6:00 PM", false],
  ["Saturday", "10:00 AM – 4:00 PM", false],
  ["Sunday", "Closed", true],
];

const subjects = [
  "Order Inquiry",
  "Product Question",
  "Return / Refund",
  "Wholesale Inquiry",
  "Other",
];

const inputClass =
  "w-full border border-gray-300 rounded-sm px-3 py-2 text-sm text-gray-800 bg-white focus:outline-none focus:border-[#0078D4] focus:ring-1 focus:ring-[#0078D4] transition-colors placeholder-gray-400";

const emptyForm = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  subject: "Order Inquiry",
  message: "",
};

export default function ContactUs() {
  const [form, setForm]       = useState(emptyForm);
  const [sent, setSent]       = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState("");

  const handle = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await axios.post("/api/contact", form);
      setSent(true);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-20 bg-gray-50 font-sans">
      <div className="bg-[#0078D4] px-6 py-10 md:px-16">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs font-semibold tracking-widest uppercase text-[#C7E0F4] mb-2">Diamond Collection</p>
          <h1 className="text-3xl font-semibold text-white mb-2">Contact Us</h1>
          <p className="text-sm text-[#C7E0F4]">We're here to help. Reach out and we'll respond within 24 hours.</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 md:px-16 py-10">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          <div className="md:col-span-2 flex flex-col gap-4">
            {contactInfo.map((item) => (
              <div key={item.label} className="flex items-start gap-3 bg-white border border-gray-200 rounded p-4 hover:border-[#C7E0F4] transition-colors">
                <div className="w-8 h-8 bg-[#EFF6FC] rounded flex items-center justify-center flex-shrink-0">{item.icon}</div>
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-0.5">{item.label}</div>
                  <div className="text-sm text-gray-800">{item.value}</div>
                </div>
              </div>
            ))}

            <div className="bg-white border border-gray-200 rounded p-4">
              <div className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3">Business Hours</div>
              {hours.map(([day, time, closed], i) => (
                <div key={day} className={`flex justify-between py-2 text-sm ${i < hours.length - 1 ? "border-b border-gray-100" : ""}`}>
                  <span className="text-gray-500">{day}</span>
                  <span className={closed ? "text-gray-300" : "font-semibold text-gray-800"}>{time}</span>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-3 gap-2">
              {["Facebook", "Instagram", "WhatsApp"].map((s) => (
                <button key={s} className="border border-gray-200 rounded bg-white text-xs text-gray-500 font-medium py-2 hover:border-[#0078D4] hover:text-[#0078D4] hover:bg-[#EFF6FC] transition-colors">{s}</button>
              ))}
            </div>
          </div>

          <div className="md:col-span-3 bg-white border border-gray-200 rounded p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-5">Send us a message</h2>

            {sent ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-14 h-14 bg-[#EFF6FC] rounded-full flex items-center justify-center mb-4">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#0078D4" strokeWidth="2" className="w-7 h-7">
                    <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div className="text-base font-semibold text-[#0078D4] mb-2">Message sent successfully!</div>
                <div className="text-sm text-gray-500 mb-6">We'll get back to you within 24 hours.</div>
                <button onClick={() => { setSent(false); setForm(emptyForm); }} className="bg-[#0078D4] text-white text-sm font-semibold px-5 py-2 rounded-sm hover:bg-[#005A9E] transition-colors">
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded px-4 py-3">{error}</div>
                )}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">First name</label>
                    <input name="firstName" value={form.firstName} onChange={handle} placeholder="Ali" required className={inputClass} />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Last name</label>
                    <input name="lastName" value={form.lastName} onChange={handle} placeholder="Khan" required className={inputClass} />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Email address</label>
                  <input name="email" type="email" value={form.email} onChange={handle} placeholder="you@example.com" required className={inputClass} />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Phone <span className="font-normal text-gray-400">(optional)</span></label>
                  <input name="phone" value={form.phone} onChange={handle} placeholder="+92 300 0000000" className={inputClass} />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Subject</label>
                  <select name="subject" value={form.subject} onChange={handle} className={inputClass}>
                    {subjects.map((s) => <option key={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Message</label>
                  <textarea name="message" value={form.message} onChange={handle} placeholder="Write your message here…" required rows={4} className={`${inputClass} resize-none`} />
                </div>
                <button type="submit" disabled={loading} className="bg-[#0078D4] text-white text-sm font-semibold px-6 py-2.5 rounded-sm hover:bg-[#005A9E] transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-2">
                  {loading && (
                    <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                    </svg>
                  )}
                  {loading ? "Sending…" : "Send message"}
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="mt-6 border border-gray-200 rounded overflow-hidden h-28 bg-gray-100 relative flex items-center justify-center">
          <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 700 112" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
            <defs>
              <pattern id="dotgrid" width="24" height="24" patternUnits="userSpaceOnUse">
                <circle cx="1" cy="1" r="1" fill="#0078D4" />
              </pattern>
            </defs>
            <rect width="700" height="112" fill="url(#dotgrid)" />
          </svg>
          <div className="relative text-center">
            <div className="w-3 h-3 rounded-full bg-[#0078D4] mx-auto shadow-[0_0_0_6px_#C7E0F4]" />
            <div className="text-xs font-semibold text-[#0078D4] mt-3">Diamond Collection — Jhelum, Punjab, Pakistan</div>
          </div>
        </div>
      </div>
    </div>
  );
}