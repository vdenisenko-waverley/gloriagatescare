"use server";

import sgMail from "@sendgrid/mail";
sgMail.setApiKey(process.env.SENDGRID_API_KEY || "");

export async function sendEmail({
  subject,
  html,
}: {
  subject: string;
  html: string;
}) {
  const msg = {
    to: process.env.EMAIL_RECIPIENT || "",
    from: process.env.EMAIL_SENDER || "",
    subject,
    html,
  };
  return sgMail.send(msg);
}
