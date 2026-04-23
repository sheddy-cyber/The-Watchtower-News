// backend/src/controllers/newsletterController.js
const { v4: uuidv4 } = require("uuid");
const prisma = require("../config/db");
const {
  sendNewsletterConfirmation,
  sendNewsletterWelcome,
} = require("../services/emailService");

// POST /api/newsletter/subscribe
const subscribe = async (req, res, next) => {
  try {
    const { email } = req.body;

    const existing = await prisma.newsletterSubscriber.findUnique({ where: { email } });

    if (existing) {
      if (existing.confirmed) {
        return res.status(200).json({ message: "You are already subscribed." });
      }
      // Resend confirmation
      await sendNewsletterConfirmation(email, existing.confirmToken);
      return res.json({ message: "Confirmation email resent." });
    }

    const confirmToken = uuidv4();
    await prisma.newsletterSubscriber.create({
      data: { email, confirmToken },
    });
    await sendNewsletterConfirmation(email, confirmToken);

    res.status(201).json({
      message: "Thanks! Please check your email to confirm your subscription.",
    });
  } catch (err) {
    next(err);
  }
};

// GET /api/newsletter/confirm/:token
const confirm = async (req, res, next) => {
  try {
    const { token } = req.params;
    const sub = await prisma.newsletterSubscriber.findUnique({
      where: { confirmToken: token },
    });

    if (!sub) {
      return res.status(400).json({ error: "Invalid or expired confirmation link." });
    }

    await prisma.newsletterSubscriber.update({
      where: { id: sub.id },
      data: { confirmed: true, confirmToken: null },
    });

    await sendNewsletterWelcome(sub.email);

    // Redirect to the frontend with a success flag
    res.redirect(`${process.env.FRONTEND_URL}/?newsletter=confirmed`);
  } catch (err) {
    next(err);
  }
};

// POST /api/newsletter/unsubscribe  { token: unsubToken }
const unsubscribe = async (req, res, next) => {
  try {
    const { token } = req.body;
    const sub = await prisma.newsletterSubscriber.findUnique({
      where: { unsubToken: token },
    });

    if (!sub) return res.status(400).json({ error: "Invalid unsubscribe token." });

    await prisma.newsletterSubscriber.delete({ where: { id: sub.id } });
    res.json({ message: "You have been unsubscribed." });
  } catch (err) {
    next(err);
  }
};

module.exports = { subscribe, confirm, unsubscribe };
