import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host:   process.env.SMTP_HOST,
  port:   Number(process.env.SMTP_PORT ?? 587),
  secure: process.env.SMTP_PORT === "465",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const FROM = `"Apex Veritas" <${process.env.SMTP_FROM ?? "noreply@apexveritas.com"}>`;
const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://apexveritas.com";

/* ─── Base HTML wrapper ──────────────────────────────────────────────── */
function baseTemplate(content: string) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Apex Veritas</title>
</head>
<body style="margin:0;padding:0;background:#F5F7FA;font-family:Inter,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#F5F7FA;padding:40px 16px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(27,42,74,0.08);">
        <!-- Header -->
        <tr>
          <td style="background:linear-gradient(135deg,#1B2A4A 0%,#2E7D32 100%);padding:32px 40px;text-align:center;">
            <h1 style="margin:0;color:#ffffff;font-size:24px;font-weight:700;letter-spacing:-0.5px;">
              Apex Veritas
            </h1>
            <p style="margin:4px 0 0;color:rgba(255,255,255,0.7);font-size:13px;">
              Virtual HSEQ Solutions
            </p>
          </td>
        </tr>
        <!-- Body -->
        <tr>
          <td style="padding:40px;">
            ${content}
          </td>
        </tr>
        <!-- Footer -->
        <tr>
          <td style="background:#F5F7FA;padding:24px 40px;text-align:center;border-top:1px solid #e5e7eb;">
            <p style="margin:0;font-size:12px;color:#6B7280;">
              © ${new Date().getFullYear()} Apex Veritas. All rights reserved.<br/>
              <a href="${APP_URL}" style="color:#2E7D32;text-decoration:none;">apexveritas.com</a>
            </p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

/* ─── Email functions ────────────────────────────────────────────────── */

export async function sendVerificationEmail(to: string, name: string, token: string) {
  const url = `${APP_URL}/verify-email?token=${token}`;
  await transporter.sendMail({
    from: FROM,
    to,
    subject: "Verify your Apex Veritas account",
    html: baseTemplate(`
      <h2 style="color:#1B2A4A;margin:0 0 16px;">Welcome, ${name}! 👋</h2>
      <p style="color:#1A1A2E;line-height:1.6;margin:0 0 24px;">
        Thank you for joining Apex Veritas. Please verify your email address to activate your account.
      </p>
      <div style="text-align:center;margin:32px 0;">
        <a href="${url}" style="display:inline-block;background:#2E7D32;color:#fff;text-decoration:none;padding:14px 32px;border-radius:8px;font-weight:600;font-size:15px;">
          Verify Email Address
        </a>
      </div>
      <p style="color:#6B7280;font-size:13px;margin:0;">
        This link expires in 24 hours. If you didn't create an account, please ignore this email.
      </p>
    `),
  });
}

export async function sendPasswordResetEmail(to: string, name: string, token: string) {
  const url = `${APP_URL}/reset-password?token=${token}`;
  await transporter.sendMail({
    from: FROM,
    to,
    subject: "Reset your Apex Veritas password",
    html: baseTemplate(`
      <h2 style="color:#1B2A4A;margin:0 0 16px;">Password Reset Request</h2>
      <p style="color:#1A1A2E;line-height:1.6;margin:0 0 24px;">
        Hi ${name}, we received a request to reset your password. Click the button below to set a new one.
      </p>
      <div style="text-align:center;margin:32px 0;">
        <a href="${url}" style="display:inline-block;background:#2E7D32;color:#fff;text-decoration:none;padding:14px 32px;border-radius:8px;font-weight:600;font-size:15px;">
          Reset Password
        </a>
      </div>
      <p style="color:#6B7280;font-size:13px;margin:0;">
        This link expires in 1 hour. If you didn't request a reset, you can safely ignore this email.
      </p>
    `),
  });
}

export async function sendWelcomeEmail(to: string, name: string, companyName: string) {
  await transporter.sendMail({
    from: FROM,
    to,
    subject: `Welcome to Apex Veritas, ${name}!`,
    html: baseTemplate(`
      <h2 style="color:#1B2A4A;margin:0 0 16px;">You're all set! 🎉</h2>
      <p style="color:#1A1A2E;line-height:1.6;margin:0 0 16px;">
        Hi ${name}, your workspace for <strong>${companyName}</strong> is ready.
        Start managing your HSEQ compliance with ease.
      </p>
      <div style="text-align:center;margin:32px 0;">
        <a href="${APP_URL}/portal" style="display:inline-block;background:#2E7D32;color:#fff;text-decoration:none;padding:14px 32px;border-radius:8px;font-weight:600;font-size:15px;">
          Go to Dashboard
        </a>
      </div>
      <p style="color:#6B7280;font-size:13px;margin:0;">
        Safety Without Borders — Apex Veritas
      </p>
    `),
  });
}

export async function sendComplianceAlertEmail(
  to: string,
  name: string,
  items: { title: string; dueDate: string; status: string }[]
) {
  const rows = items
    .map(
      (i) => `
      <tr>
        <td style="padding:10px 12px;border-bottom:1px solid #e5e7eb;color:#1A1A2E;">${i.title}</td>
        <td style="padding:10px 12px;border-bottom:1px solid #e5e7eb;color:#1A1A2E;">${i.dueDate}</td>
        <td style="padding:10px 12px;border-bottom:1px solid #e5e7eb;">
          <span style="background:${i.status === "overdue" ? "#FEE2E2" : "#FEF3C7"};color:${i.status === "overdue" ? "#DC2626" : "#92400E"};padding:2px 8px;border-radius:99px;font-size:12px;font-weight:600;">
            ${i.status}
          </span>
        </td>
      </tr>`
    )
    .join("");

  await transporter.sendMail({
    from: FROM,
    to,
    subject: "⚠️ Compliance items require your attention",
    html: baseTemplate(`
      <h2 style="color:#1B2A4A;margin:0 0 8px;">Compliance Alert</h2>
      <p style="color:#1A1A2E;margin:0 0 24px;">Hi ${name}, the following compliance items need your attention:</p>
      <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;border:1px solid #e5e7eb;border-radius:8px;overflow:hidden;">
        <thead>
          <tr style="background:#F5F7FA;">
            <th style="padding:10px 12px;text-align:left;color:#1B2A4A;font-size:13px;">Item</th>
            <th style="padding:10px 12px;text-align:left;color:#1B2A4A;font-size:13px;">Due Date</th>
            <th style="padding:10px 12px;text-align:left;color:#1B2A4A;font-size:13px;">Status</th>
          </tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
      <div style="text-align:center;margin:32px 0;">
        <a href="${APP_URL}/portal/compliance" style="display:inline-block;background:#2E7D32;color:#fff;text-decoration:none;padding:12px 28px;border-radius:8px;font-weight:600;">
          View Compliance Dashboard
        </a>
      </div>
    `),
  });
}

export { transporter };
