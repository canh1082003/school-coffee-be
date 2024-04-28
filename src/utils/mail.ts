import nodemailer from "nodemailer";
export type emailOptions = {
  email: string;
  subject: string;
  message: string;
};
export const sendEmail = (option: emailOptions) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    port: 25,
    logger: true,
    debug: true,
    auth: {
      user: "anhnbk113@gmail.com",
      pass: "ktvz euex cgsy mcyo",
    },
  });
  const mailOptions = {
    from: "info@mailtrap.club",
    to: option.email,
    subject: option.subject,
    text: option.message,
  };
  transporter.sendMail(mailOptions);
};
