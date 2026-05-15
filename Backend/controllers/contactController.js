// controllers/contactController.js
import contactModel from "../models/contactModel.js"
import nodemailer from "nodemailer"

const createTransporter = () => {
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.ADMIN_EMAIL,
      pass: process.env.EMAIL_APP_PASSWORD,
    },
  })
}

// ── Submit contact form (customer) ──
const submitContact = async (req, res) => {
  try {
    const { firstName, lastName, email, phone, subject, message } = req.body

    // Validation
    if (!firstName || !lastName || !email || !subject || !message) {
      return res.json({ success: false, message: "Please fill all required fields" })
    }

    // 1. Save to MongoDB
    await contactModel.create({ firstName, lastName, email, phone, subject, message })

    // 2. Send email notification to admin
    try {
      const transporter = createTransporter()
      await transporter.sendMail({
        from:    `"Diamond Collection" <${process.env.ADMIN_EMAIL}>`,
        to:      process.env.ADMIN_EMAIL,
        replyTo: email,
        subject: `📩 New Contact Message: ${subject}`,
        html: `
          <div style="font-family:sans-serif;max-width:560px;margin:0 auto;border:1px solid #EDEBE9;border-radius:4px;overflow:hidden">
            <div style="background:#0078D4;padding:20px 24px">
              <h2 style="color:#fff;margin:0;font-size:17px;font-weight:600">New Contact Message</h2>
              <p style="color:#C7E0F4;margin:4px 0 0;font-size:12px">Diamond Collection — Customer Inquiry</p>
            </div>
            <div style="padding:24px;background:#fff">
              <table style="width:100%;border-collapse:collapse;font-size:14px">
                <tr>
                  <td style="padding:8px 0;color:#605E5C;width:120px;font-weight:600;font-size:11px;text-transform:uppercase;letter-spacing:0.05em">Name</td>
                  <td style="padding:8px 0;color:#201F1E">${firstName} ${lastName}</td>
                </tr>
                <tr style="border-top:1px solid #F3F2F1">
                  <td style="padding:8px 0;color:#605E5C;font-weight:600;font-size:11px;text-transform:uppercase;letter-spacing:0.05em">Email</td>
                  <td style="padding:8px 0;color:#201F1E">${email}</td>
                </tr>
                <tr style="border-top:1px solid #F3F2F1">
                  <td style="padding:8px 0;color:#605E5C;font-weight:600;font-size:11px;text-transform:uppercase;letter-spacing:0.05em">Phone</td>
                  <td style="padding:8px 0;color:#201F1E">${phone || "Not provided"}</td>
                </tr>
                <tr style="border-top:1px solid #F3F2F1">
                  <td style="padding:8px 0;color:#605E5C;font-weight:600;font-size:11px;text-transform:uppercase;letter-spacing:0.05em">Subject</td>
                  <td style="padding:8px 0;color:#201F1E">${subject}</td>
                </tr>
              </table>
              <div style="margin-top:16px;border-top:1px solid #EDEBE9;padding-top:16px">
                <p style="font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;color:#605E5C;margin:0 0 8px">Message</p>
                <div style="background:#F3F2F1;border-radius:4px;padding:14px;font-size:14px;color:#201F1E;line-height:1.7">
                  ${message.replace(/\n/g, "<br/>")}
                </div>
              </div>
              <div style="margin-top:20px">
                <a href="mailto:${email}?subject=Re: ${subject}"
                  style="display:inline-block;background:#0078D4;color:#fff;text-decoration:none;font-size:13px;font-weight:600;padding:9px 20px;border-radius:2px">
                  Reply to ${firstName}
                </a>
              </div>
            </div>
            <div style="background:#F3F2F1;padding:12px 24px;font-size:11px;color:#605E5C">
              Diamond Collection — Automated notification from contact form
            </div>
          </div>
        `,
      })
      console.log(`📧 Contact email received from: ${email}`)
    } catch (emailErr) {
      // Don't fail the request if email fails — message is already saved to DB
      console.log("Email send error:", emailErr.message)
    }

    res.json({ success: true, message: "Message sent successfully" })
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}

// ── Get all messages (admin) ──
const getContacts = async (req, res) => {
  try {
    const contacts = await contactModel.find({}).sort({ createdAt: -1 })
    res.json({ success: true, contacts })
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}

// ── Mark as read (admin) ──
const markAsRead = async (req, res) => {
  try {
    const { contactId } = req.body
    await contactModel.findByIdAndUpdate(contactId, { isRead: true })
    res.json({ success: true, message: "Marked as read" })
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}

// ── Delete message (admin) ──
const deleteContact = async (req, res) => {
  try {
    const { contactId } = req.body
    await contactModel.findByIdAndDelete(contactId)
    res.json({ success: true, message: "Message deleted" })
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}

export { submitContact, getContacts, markAsRead, deleteContact }