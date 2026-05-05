// routes/contactRoute.js
import express from "express";
import Contact from "../models/contactModel.js";
import { sendContactEmail } from "../utils/sendContactEmail.js";

const router = express.Router();

// POST /api/contact
router.post("/", async (req, res) => {
  try {
    const { firstName, lastName, email, phone, subject, message } = req.body;

    // Basic validation
    if (!firstName || !lastName || !email || !subject || !message) {
      return res.status(400).json({ message: "Please fill all required fields." });
    }

    // 1. Save to MongoDB
    const contact = await Contact.create({
      firstName,
      lastName,
      email,
      phone,
      subject,
      message,
    });

    // 2. Send email notification to store owner
    await sendContactEmail({ firstName, lastName, email, phone, subject, message });

    res.status(201).json({ message: "Message sent successfully.", contact });
  } catch (error) {
    console.error("Contact form error:", error);
    res.status(500).json({ message: "Something went wrong. Please try again." });
  }
});

// GET /api/contact  (Admin only — add your verifyAdmin middleware)
router.get("/", async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch messages." });
  }
});

// PATCH /api/contact/:id/read  (mark as read)
router.patch("/:id/read", async (req, res) => {
  try {
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { isRead: true },
      { new: true }
    );
    res.json(contact);
  } catch (error) {
    res.status(500).json({ message: "Failed to update message." });
  }
});

// DELETE /api/contact/:id
router.delete("/:id", async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    res.json({ message: "Message deleted." });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete message." });
  }
});

export default router;