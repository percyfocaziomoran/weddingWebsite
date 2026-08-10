//Sends email via SMTP using nodemailer.
//Reads its settings from environment variables so no secrets live in the code.
//If SMTP isn't configured (e.g. local dev), it quietly skips instead of crashing.

const nodemailer = require("nodemailer");

//Build the transporter once, only if the required settings are present.
let transporter = null;
if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
  const port = Number(process.env.SMTP_PORT) || 587;
  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port,
    secure: port === 465, //465 uses TLS directly; 587 upgrades via STARTTLS
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

async function sendEmail({ to, subject, text, html }) {
  if (!transporter) {
    console.log(`[email] SMTP not configured — skipping email to ${to}`);
    return;
  }
  await transporter.sendMail({
    from: process.env.MAIL_FROM || process.env.SMTP_USER,
    to,
    subject,
    text,
    html,
  });
  console.log(`[email] sent "${subject}" to ${to}`);
}

module.exports = sendEmail;
