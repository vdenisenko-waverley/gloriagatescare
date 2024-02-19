"use server";

import { sendEmail } from "./services/emailApi";

export async function submitAnswers(data: { [x: string]: string }) {
  const html = Object.keys(data)
    .map((key) => `<strong>${key}<strong><br>${data[key]}`)
    .join("<br/><br>");

  sendEmail({
    subject: "Gloria Gates Care - New Form Submit",
    html,
  })
    .then(() => {
      console.log("Email sent");
    })
    .catch((error) => {
      console.error(error);
    });
}
