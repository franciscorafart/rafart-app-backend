import transporter from "../config/transporter";

export async function sendConfirmationEmail(
  userEmail: string,
  confirmationToken: string
) {
  const mailOptions = {
    from: process.env.EMAIL,
    to: userEmail,
    subject: "Confirm your email",
    text: `Click on the following link to confirm your email. Link expires in 24 hours.
    ${process.env.APP_URL}/confirm-user?confirmation=${confirmationToken}
`,
  };

  try {
    await transporter.sendMail(mailOptions);
    return true;
  } catch (err) {
    console.log("Email error", err);
    return false;
  }
}

export async function sendResetEmail(userEmail, resetToken) {
  const mailOptions = {
    from: process.env.EMAIL,
    to: userEmail,
    subject: "Reset password request - Rafart App",
    text: `Click on this link to reset your password. Link expires in 24 hours.
    ${process.env.APP_URL}/reset-password?recovery=${resetToken}
    Don't share this link.`,
  };

  try {
    await transporter.sendMail(mailOptions);
    return true;
  } catch (err) {
    console.log("Email error", err);
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
