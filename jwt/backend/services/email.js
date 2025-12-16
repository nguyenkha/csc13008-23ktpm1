import sgMail from '@sendgrid/mail'
import dotenv from 'dotenv'

dotenv.config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const EMAIL_FROM = process.env.EMAIL_FROM;

const service = {
  send: async function (to, subject, text) {
    const msg = {
      to: to,
      from: EMAIL_FROM,
      subject,
      text,
    };
    return sgMail.send(msg);
  },
};

export default service;