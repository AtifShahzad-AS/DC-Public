// utils/sendContactEmail.js
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,   // your Gmail e.g. diamondcollection@gmail.com
    pass: process.env.EMAIL_PASS,   // Gmail App Password (16-char)
  },
});

export const sendContactEmail = async ({
  firstName,
  lastName,
  email,
  phone,
  subject,
  message,
}) => {
  const mailOptions = {
    from: `"Diamond Collection Website" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_USER,   // message lands in YOUR inbox
    replyTo: email,               // reply goes directly to the customer
    subject: `📩 New Contact Message: ${subject}`,
    html: `
      <div style="font-family: Segoe UI, sans-serif; max-width: 600px; margin: auto; border: 1px solid #EDEBE9; border-radius: 4px; overflow: hidden;">
        
        <!-- Header -->
        <div style="background: #0078D4; padding: 24px 28px;">
          <h2 style="color: #fff; margin: 0; font-size: 18px; font-weight: 600;">New Contact Message</h2>
          <p style="color: #C7E0F4; margin: 4px 0 0; font-size: 13px;">Diamond Collection — Customer Inquiry</p>
        </div>

        <!-- Body -->
        <div style="padding: 24px 28px; background: #fff;">
          <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
            <tr>
              <td style="padding: 8px 0; color: #605E5C; width: 130px; font-weight: 600; text-transform: uppercase; font-size: 11px; letter-spacing: 0.05em;">Name</td>
              <td style="padding: 8px 0; color: #201F1E;">${firstName} ${lastName}</td>
            </tr>
            <tr style="border-top: 1px solid #F3F2F1;">
              <td style="padding: 8px 0; color: #605E5C; font-weight: 600; text-transform: uppercase; font-size: 11px; letter-spacing: 0.05em;">Email</td>
              <td style="padding: 8px 0; color: #201F1E;">${email}</td>
            </tr>
            <tr style="border-top: 1px solid #F3F2F1;">
              <td style="padding: 8px 0; color: #605E5C; font-weight: 600; text-transform: uppercase; font-size: 11px; letter-spacing: 0.05em;">Phone</td>
              <td style="padding: 8px 0; color: #201F1E;">${phone || "Not provided"}</td>
            </tr>
            <tr style="border-top: 1px solid #F3F2F1;">
              <td style="padding: 8px 0; color: #605E5C; font-weight: 600; text-transform: uppercase; font-size: 11px; letter-spacing: 0.05em;">Subject</td>
              <td style="padding: 8px 0; color: #201F1E;">${subject}</td>
            </tr>
          </table>

          <div style="margin-top: 16px; border-top: 1px solid #EDEBE9; padding-top: 16px;">
            <p style="font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: #605E5C; margin: 0 0 8px;">Message</p>
            <div style="background: #F3F2F1; border-radius: 4px; padding: 14px 16px; font-size: 14px; color: #201F1E; line-height: 1.7;">
              ${message.replace(/\n/g, "<br/>")}
            </div>
          </div>

          <div style="margin-top: 20px;">
            <a href="mailto:${email}?subject=Re: ${subject}"
              style="display: inline-block; background: #0078D4; color: #fff; text-decoration: none;
                     font-size: 13px; font-weight: 600; padding: 9px 20px; border-radius: 2px;">
              Reply to ${firstName}
            </a>
          </div>
        </div>

        <!-- Footer -->
        <div style="background: #F3F2F1; padding: 14px 28px; font-size: 11px; color: #605E5C;">
          This email was sent from the Diamond Collection contact form.
        </div>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
};