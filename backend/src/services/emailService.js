// backend/src/services/emailService.js
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || "587"),
  secure: process.env.SMTP_PORT === "465",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const FROM = `"${process.env.SMTP_FROM_NAME || "The Watchtower"}" <${process.env.SMTP_FROM}>`;
const BASE = process.env.FRONTEND_URL || "http://localhost:5173";

// ── Shared email template ─────────────────────────────────────────────────
const layout = (body) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <style>
    body { margin:0; padding:0; background:#0a0a0a; font-family: Georgia, serif; color: #f0e0b8; }
    .wrap { max-width: 560px; margin: 0 auto; padding: 40px 24px; }
    .logo { font-size: 28px; font-weight: bold; color: #d4af37; letter-spacing: 0.12em; text-transform: uppercase; text-align: center; margin-bottom: 8px; }
    .tagline { font-size: 11px; letter-spacing: 0.25em; text-transform: uppercase; color: rgba(212,175,55,0.5); text-align: center; margin-bottom: 32px; }
    .rule { border: none; border-top: 1px solid rgba(212,175,55,0.2); margin: 24px 0; }
    .body { font-size: 16px; line-height: 1.8; color: rgba(240,224,184,0.85); }
    .cta { display: inline-block; margin: 24px 0; background: #d4af37; color: #0a0a0a; padding: 14px 32px; font-family: Arial, sans-serif; font-size: 13px; font-weight: bold; letter-spacing: 0.1em; text-transform: uppercase; text-decoration: none; border-radius: 2px; }
    .footer-text { font-size: 12px; color: rgba(212,175,55,0.35); text-align: center; font-family: Arial, sans-serif; margin-top: 32px; }
    a { color: #d4af37; }
  </style>
</head>
<body>
  <div class="wrap">
    <div class="logo">The Watchtower</div>
    <div class="tagline">Truth in Every Edition</div>
    <hr class="rule" />
    <div class="body">${body}</div>
    <p class="footer-text">© 2026 The Watchtower · Established 1892</p>
  </div>
</body>
</html>`;

// ── Send helpers ──────────────────────────────────────────────────────────
const send = (to, subject, html) =>
  transporter.sendMail({ from: FROM, to, subject, html });

// Email verification
const sendVerificationEmail = (to, token) =>
  send(
    to,
    "Verify your Watchtower account",
    layout(`
      <p>Welcome to The Watchtower. Please verify your email address to activate your account.</p>
      <a class="cta" href="${BASE}/verify-email?token=${token}">Verify Email</a>
      <p style="font-size:14px;color:rgba(240,224,184,0.5);">
        This link expires in 24 hours. If you didn't create an account, you can safely ignore this email.
      </p>
    `)
  );

// Password reset
const sendPasswordResetEmail = (to, token) =>
  send(
    to,
    "Reset your Watchtower password",
    layout(`
      <p>You requested a password reset. Click the button below to choose a new password.</p>
      <a class="cta" href="${BASE}/reset-password?token=${token}">Reset Password</a>
      <p style="font-size:14px;color:rgba(240,224,184,0.5);">
        This link expires in 1 hour. If you didn't request a reset, please ignore this email.
      </p>
    `)
  );

// Newsletter confirm
const sendNewsletterConfirmation = (to, token) =>
  send(
    to,
    "Confirm your Watchtower newsletter subscription",
    layout(`
      <p>Thank you for subscribing to The Watchtower newsletter. Please confirm your subscription below.</p>
      <a class="cta" href="${BASE}/api/newsletter/confirm/${token}">Confirm Subscription</a>
      <p style="font-size:14px;color:rgba(240,224,184,0.5);">
        If you didn't subscribe, you can safely ignore this email.
      </p>
    `)
  );

// Newsletter welcome (sent after confirmation)
const sendNewsletterWelcome = (to) =>
  send(
    to,
    "Welcome to The Watchtower newsletter",
    layout(`
      <p>Your subscription is confirmed. You'll receive our latest news and analysis directly in your inbox.</p>
      <p>In the meantime, catch up on today's top stories:</p>
      <a class="cta" href="${BASE}">Read Today's Edition</a>
    `)
  );

module.exports = {
  sendVerificationEmail,
  sendPasswordResetEmail,
  sendNewsletterConfirmation,
  sendNewsletterWelcome,
};
