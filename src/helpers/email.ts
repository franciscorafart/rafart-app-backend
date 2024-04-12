import transporter from "../config/transporter";
import { logError } from "./logger";

export async function sendConfirmationEmail(
  userEmail: string,
  resetToken: string
) {
  const mailOptions = {
    from: process.env.EMAIL,
    to: userEmail,
    subject: "Confirm your email",
    text: `Click on the following link to confirm your email and set your password. Link expires in 24 hours.
    ${process.env.APP_URL}/reset-password?recovery=${resetToken}
`,
  };

  try {
    await transporter.sendMail(mailOptions);
    return true;
  } catch (err) {
    logError(`Error sending email: ${err}`);
    return false;
  }
}

export async function sendResetEmail(userEmail, resetToken) {
  const mailOptions = {
    from: process.env.EMAIL,
    to: userEmail,
    subject: "Reset / Set new password request - Rafart App",
    text: `Hi. Click on this link to set up or reset your password. The link expires in 24 hours.
    ${process.env.APP_URL}/reset-password?recovery=${resetToken}
    Don't share this link.`,
  };

  try {
    await transporter.sendMail(mailOptions);
    return true;
  } catch (err) {
    logError(`Error sending email: ${err}`);
    return false;
  }
}

export const sendTestEmail = () => {
  // Define email content
  const mailOptions = {
    from: process.env.EMAIL, // Replace with your verified SES sender email address
    to: "rafart@rafartmusic.com", // Replace with the recipient email address
    subject: "Hello from Rafart SES",
    text: "This is a test email sent from Amazon SES in the Rafart app.",
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
    } else {
      console.log("Email sent:", info.response);
    }
  });
};
