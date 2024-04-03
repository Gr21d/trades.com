import nodemailer from "nodemailer";

export async function sendVerificationEmail(email: string, verificationToken: string) {
  // Create a transporter using your email service provider's SMTP settings
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "eltanbdawyabdi@gmail.com",
      pass: "ksci dpvx rfgp dpmh",
    },
    tls: {
      rejectUnauthorized: false, // Disable certificate verification (not recommended for production)
    },
  });

  // Compose the email message
  const mailOptions = {
    from: '"Trades.com" <noreply@example.com>',
    to: email,
    subject: "Verify Your Email",
    html: `
      <p>Please click the following link to verify your email:</p>
      <a href="http://localhost:3000/account/sign_in/verify?token=${verificationToken}">Verify Email</a>
    `,
  };

  // Send the email
  await transporter.sendMail(mailOptions);
}