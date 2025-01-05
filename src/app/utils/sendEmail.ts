import nodemailer from 'nodemailer';
import config from '../config';
export const sendEmail = async (to: string, html: string) => {
  console.log(to, html);
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: config.NODE_ENV === 'production', // true for port 465, false for other ports
    auth: {
      user: 'souravbsk01@gmail.com',
      pass: 'hqne lnat cvvk xuqc',
    },
  });
  await transporter.sendMail({
    from: 'souravbsk01@gmail.com', // sender address
    to, // list of receivers
    subject: 'Reset your password expire in 10 minutes', // Subject line
    text: '', // plain text body
    html, // html body
  });
};
