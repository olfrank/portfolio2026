import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { Resend } from 'resend';

const app = express();
app.use(cors());
app.use(express.json());

const resend = new Resend(process.env.RESEND_API_KEY);

app.post('/api/contact', async (req, res) => {
  const { email, message } = req.body;

  if (!email || !message) {
    return res.status(400).json({ success: false, error: 'Email and message are required.' });
  }

  try {
    await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: process.env.TO_EMAIL,
      replyTo: email,
      subject: `New message from ${email}`,
      html: `<p><strong>From:</strong> ${email}</p><p>${message.replace(/\n/g, '<br>')}</p>`,
    });

    res.json({ success: true, message: "Thank you for reaching out! I'll get back to you soon." });
  } catch (err) {
    console.error('Email error:', err);
    res.status(500).json({ success: false, error: 'Failed to send message. Please try again.' });
  }
});

const PORT = process.env.PORT || 8001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
